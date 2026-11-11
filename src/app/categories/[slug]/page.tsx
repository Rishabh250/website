import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import { getCategories, getCategory, getProductsByCategory, getBrandsForCategory, getPosts } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandCard from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

// Unknown slugs return a hard 404 (not a streamed 200 soft-404).
export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.seo?.title ?? category.name,
    description: (category.seo?.description ?? category.description).slice(0, 160),
    path: `/categories/${category.slug}`,
    image: category.image,
  });
}

// Simple stem keywords from the category slug (e.g. "veneers-panels" -> "veneer", "panel").
function keywords(slug: string) {
  return slug
    .split("-")
    .filter((w) => w.length > 3)
    .map((w) => w.replace(/s$/, ""));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug);
  const brands = getBrandsForCategory(slug);
  const posts = getPosts();
  const kws = keywords(slug);
  const matched = posts.filter((p) => kws.some((k) => `${p.title} ${p.excerpt}`.toLowerCase().includes(k)));
  const guides = (matched.length ? matched : posts).slice(0, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: category.name, href: `/categories/${category.slug}` },
  ];
  return (
    <div>
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })))]} />
      <Breadcrumbs items={crumbs} />

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <header className="grid overflow-hidden rounded-2xl bg-ink bg-[radial-gradient(ellipse_at_top_left,rgba(217,119,6,0.28),transparent_60%)] text-white md:grid-cols-2">
          <div className="px-6 py-10 sm:px-10 md:py-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Category</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{category.name}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-200">{category.description}</p>
            <p className="mt-5 text-sm text-stone-300">
              {products.length} {products.length === 1 ? "product" : "products"} from {brands.length}{" "}
              {brands.length === 1 ? "brand" : "brands"}
            </p>
          </div>
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-72">
            <Image
              src={category.image}
              alt={category.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </header>
      </div>

      <Section title={`${category.name} products`}>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Products coming soon. Contact us for availability.</p>
        )}
      </Section>

      {guides.length > 0 && (
        <div className="bg-muted">
          <Section eyebrow="Buying guide" title={`Choosing ${category.name.toLowerCase()}`} intro="Read these before you decide.">
            <ul className="grid gap-4 md:grid-cols-3">
              {guides.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <BookOpen className="size-6 text-accent" aria-hidden="true" />
                    <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">
                      Read guide <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      )}

      {brands.length > 0 && (
        <Section title={`Brands for ${category.name.toLowerCase()}`}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </div>
  );
}
