import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getProduct, getBrand, getCategory, getProductsByCategory } from "@/lib/data";
import { buildMetadata, breadcrumbLd, productLd, formatPrice } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryButtons from "@/components/EnquiryButtons";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";

// Unknown slugs return a hard 404 (not a streamed 200 soft-404).
export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const brand = getBrand(product.brand);
  return buildMetadata({
    title: product.seo?.title ?? `${product.name}${brand ? ` by ${brand.name}` : ""}`,
    description: (product.seo?.description ?? product.description).slice(0, 160),
    path: `/products/${product.slug}`,
    image: product.images[0],
  });
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <h2 className="font-heading text-lg font-semibold">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.slug !== slug).slice(0, 4);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), productLd(product)]} />
      <Breadcrumbs items={crumbs} />
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card">
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {brand && (
              <Link href={`/brands/${brand.slug}`} className="underline">
                {brand.name}
              </Link>
            )}
            {brand && category && " · "}
            {category && (
              <Link href={`/categories/${category.slug}`} className="underline">
                {category.name}
              </Link>
            )}
          </p>
          {product.priceFrom != null && (
            <p className="mt-4 text-2xl font-semibold">
              From {formatPrice(product.priceFrom)}
              {product.priceUnit ? <span className="text-base font-normal text-muted-foreground"> / {product.priceUnit}</span> : null}
            </p>
          )}
          <p className="mt-4">{product.description}</p>
          <div className="mt-6 grid gap-6 empty:hidden sm:grid-cols-2">
            <List title="Available sizes / thickness" items={product.sizes} />
            <List title="Features" items={product.features} />
          </div>
          {product.specs.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <h2 className="font-heading text-lg font-semibold">Specifications</h2>
              <table className="mt-2 w-full border-collapse text-left text-sm">
                <caption className="sr-only">{`Specifications for ${product.name}`}</caption>
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="border-b border-border">
                      <th scope="row" className="w-2/5 py-2 pr-4 align-top font-medium">
                        {s.label}
                      </th>
                      <td className="py-2 text-muted-foreground">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-8">
            <EnquiryButtons productName={product.name} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <Section title="Related products">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
