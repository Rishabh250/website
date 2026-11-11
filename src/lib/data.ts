import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import siteJson from "@/data/site.json";
import brandsJson from "@/data/brands.json";
import categoriesJson from "@/data/categories.json";
import productsJson from "@/data/products.json";
import { brandSchema, categorySchema, parseOrThrow, postSchema, productSchema, siteSchema } from "./schema";
import type { Brand, Category, Post, Product, Site } from "./types";

function parseList<T extends { slug: string }>(schema: z.ZodType<T>, raw: unknown, file: string): T[] {
  if (!Array.isArray(raw)) throw new Error(`[data] ${file} must be an array`);
  const seen = new Set<string>();
  return raw.map((item, i) => {
    const slug = (item as { slug?: string })?.slug;
    const v = parseOrThrow(schema, item, file, slug ?? `#${i}`);
    if (seen.has(v.slug)) throw new Error(`[data] Duplicate slug "${v.slug}" in ${file}`);
    seen.add(v.slug);
    return v;
  });
}

export const site: Site = parseOrThrow(siteSchema, siteJson, "src/data/site.json");
const brands: Brand[] = parseList(brandSchema, brandsJson, "src/data/brands.json");
const categories: Category[] = parseList(categorySchema, categoriesJson, "src/data/categories.json");
const rawProducts = parseList(productSchema, productsJson, "src/data/products.json");

const brandSlugs = new Set(brands.map((b) => b.slug));
const categorySlugs = new Set(categories.map((c) => c.slug));

for (const b of brands) {
  for (const c of b.categories) {
    if (!categorySlugs.has(c)) {
      throw new Error(`[data] brands.json: brand "${b.slug}" references unknown category "${c}"`);
    }
  }
}

const products: Product[] = rawProducts.map((p) => {
  if (!brandSlugs.has(p.brand)) {
    throw new Error(`[data] products.json: product "${p.slug}" references unknown brand "${p.brand}"`);
  }
  if (!categorySlugs.has(p.category)) {
    throw new Error(`[data] products.json: product "${p.slug}" references unknown category "${p.category}"`);
  }
  const cat = categories.find((c) => c.slug === p.category)!;
  return {
    ...p,
    images: p.images && p.images.length ? p.images : [cat.image],
    sizes: p.sizes ?? [],
    features: p.features ?? [],
  };
});

function loadPosts(): Post[] {
  const dir = path.join(process.cwd(), "src/data/blog");
  if (!fs.existsSync(dir)) return [];
  const seen = new Set<string>();
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const file = `src/data/blog/${f}`;
      let raw: unknown;
      try {
        raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      } catch (e) {
        throw new Error(`[data] Cannot read/parse ${file}: ${(e as Error).message}`);
      }
      const post = parseOrThrow(postSchema, raw, file, (raw as { slug?: string })?.slug);
      if (seen.has(post.slug)) throw new Error(`[data] Duplicate post slug "${post.slug}" in ${file}`);
      seen.add(post.slug);
      return post;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

const posts = loadPosts();

export const getBrands = () => brands;
export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
export const getCategories = () => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProducts = () => products;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByBrand = (slug: string) => products.filter((p) => p.brand === slug);
export const getProductsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const getBrandsForCategory = (slug: string) => {
  const viaProducts = new Set(products.filter((p) => p.category === slug).map((p) => p.brand));
  return brands.filter((b) => b.categories.includes(slug) || viaProducts.has(b.slug));
};
export const getFeaturedBrands = () => brands.filter((b) => b.featured);
export const getFeaturedProducts = (n = 6) => {
  const featured = new Set(getFeaturedBrands().map((b) => b.slug));
  const pick = products.filter((p) => featured.has(p.brand));
  return [...pick, ...products.filter((p) => !featured.has(p.brand))].slice(0, n);
};
export const getPosts = () => posts;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
