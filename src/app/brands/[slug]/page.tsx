import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrands, getBrand, getCategory, getProductsByBrand } from "@/lib/data";
import { buildMetadata, breadcrumbLd, brandLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandCard from "@/components/BrandCard";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          brandLd(brand),
          itemListLd(products.map((p) => ({ name: p.name, href: `/products/${p.slug}` }))),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">{brand.name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{brand.tagline}</p>
      <p className="mt-4 max-w-3xl">{brand.description}</p>
      {brand.website && (
        <a href={brand.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block underline">
          Visit {brand.name} website
        </a>
      )}

      {categories.length > 0 && (
        <Section title={`${brand.name} categories`}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </Section>
      )}

      {products.length > 0 && (
        <Section title={`${brand.name} products`}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Other brands">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {others.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </Section>
    </div>
  );
}
