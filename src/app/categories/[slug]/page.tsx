import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategory, getProductsByCategory, getBrandsForCategory } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandCard from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug);
  const brands = getBrandsForCategory(slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: category.name, href: `/categories/${category.slug}` },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })))]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">{category.name}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{category.description}</p>

      <Section title={`${category.name} products`}>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Products coming soon. Contact us for availability.</p>
        )}
      </Section>

      {brands.length > 0 && (
        <Section title={`Brands for ${category.name.toLowerCase()}`}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
