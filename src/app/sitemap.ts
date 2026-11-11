import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getBrands, getCategories, getPosts, getProducts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  // Deterministic: newest post date, else a fixed fallback (avoids request-time Date under cacheComponents)
  const latest = posts[0] ? new Date(posts[0].date) : new Date("2025-01-01");
  const e = (path: string, priority: number, changeFrequency: "weekly" | "monthly", lastModified = latest) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    e("/", 1, "weekly"),
    e("/brands", 0.9, "weekly"),
    e("/categories", 0.9, "weekly"),
    e("/products", 0.9, "weekly"),
    e("/blog", 0.7, "weekly"),
    e("/about", 0.5, "monthly"),
    e("/contact", 0.6, "monthly"),
    ...getBrands().map((b) => e(`/brands/${b.slug}`, 0.8, "monthly")),
    ...getCategories().map((c) => e(`/categories/${c.slug}`, 0.8, "monthly")),
    ...getProducts().map((p) => e(`/products/${p.slug}`, 0.7, "monthly")),
    ...posts.map((p) => e(`/blog/${p.slug}`, 0.6, "monthly", new Date(p.date))),
  ];
}
