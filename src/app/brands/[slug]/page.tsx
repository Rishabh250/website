import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getBrands, getBrand, getCategory, getProductsByBrand } from "@/lib/data";
import { buildMetadata, breadcrumbLd, brandLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandCard from "@/components/BrandCard";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

// Unknown slugs return a hard 404 (not a streamed 200 soft-404).
export const dynamicParams = false;

export function generateStaticParams() {
  return getBrands().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return buildMetadata({
    title: brand.seo?.title ?? `${brand.name} Dealer`,
    description: (brand.seo?.description ?? `${brand.tagline} Get ${brand.name} products and quotes from our store.`).slice(0, 160),
    path: `/brands/${brand.slug}`,
    image: brand.logo,
  });
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  const products = getProductsByBrand(slug);
  const categories = brand.categories.map((c) => getCategory(c)).filter((c) => !!c);
  const others = getBrands().filter((b) => b.slug !== slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${brand.slug}` },
  ];
  return (
    <div>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          brandLd(brand),
          itemListLd(products.map((p) => ({ name: p.name, href: `/products/${p.slug}` }))),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-2xl bg-ink bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.30),transparent_60%)] px-6 py-10 text-white sm:px-10 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div
              aria-hidden="true"
              className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-amber-700 font-heading text-5xl font-semibold text-black shadow-lg md:size-32 md:text-6xl"
            >
              {brand.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{brand.name}</h1>
              <p className="mt-2 text-lg text-amber-300">{brand.tagline}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-stone-200">{brand.description}</p>
              {categories.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${brand.name} categories`}>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/categories/${c.slug}`}
                        className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline underline-offset-4"
                >
                  Visit {brand.name} website <ExternalLink className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          </div>
        </header>
      </div>

      {products.length > 0 && (
        <Section title={`${brand.name} products`} intro={`${products.length} ${products.length === 1 ? "product" : "products"} available to enquire about.`}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {categories.length > 0 && (
        <div className="bg-muted">
          <Section title={`Categories we carry from ${brand.name}`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </Section>
        </div>
      )}

      <Section title="Other brands">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {others.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
