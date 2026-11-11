import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone, ShieldCheck, Truck, Ruler } from "lucide-react";
import { getProducts, getProduct, getBrand, getCategory, getProductsByCategory, getProductsByBrand, site } from "@/lib/data";
import { buildMetadata, breadcrumbLd, productLd, formatPrice, telUrl, whatsappUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryButtons from "@/components/EnquiryButtons";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
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

const chip =
  "inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-primary-strong transition-[background-color,box-shadow] duration-200 hover:bg-muted hover:shadow-sm";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.slug !== slug).slice(0, 4);
  const relatedSlugs = new Set(related.map((p) => p.slug));
  const moreFromBrand = getProductsByBrand(product.brand)
    .filter((p) => p.slug !== slug && !relatedSlugs.has(p.slug))
    .slice(0, 4);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ];
  const waText = `Hi, I'd like a quote for ${product.name}. Please share price and availability.`;
  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={[breadcrumbLd(crumbs), productLd(product)]} />
      <Breadcrumbs items={crumbs} />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-14">
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-accent/50 via-border to-primary/40 p-1.5 shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-card">
                {product.images[0] && (
                  <Image
                    src={product.images[0]}
                    alt={`${product.name}${brand ? ` by ${brand.name}` : ""}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Brand and category">
              {brand && (
                <li>
                  <Link href={`/brands/${brand.slug}`} className={chip}>
                    {brand.name}
                  </Link>
                </li>
              )}
              {category && (
                <li>
                  <Link href={`/categories/${category.slug}`} className={chip}>
                    {category.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            {brand && (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong">{brand.name}</p>
            )}
            <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
              {product.priceFrom != null ? (
                <>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-strong">Starting price</p>
                  <p className="mt-1 font-heading text-3xl font-semibold text-foreground">
                    From {formatPrice(product.priceFrom)}
                    {product.priceUnit ? (
                      <span className="font-sans text-base font-normal text-muted-foreground"> / {product.priceUnit}</span>
                    ) : null}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Prices vary by thickness and stock. Contact us for a quote.
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">Contact us for current pricing and availability.</p>
              )}
              <EnquiryButtons productName={product.name} className="mt-5" />
            </div>

            {product.sizes.length > 0 && (
              <div className="mt-8">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Ruler className="size-5 text-accent" aria-hidden="true" /> Available sizes / thickness
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <li key={s} className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Features</h2>
                <ul className="mt-3 space-y-2.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-amber-800">
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {product.specs.length > 0 && (
          <div className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-semibold">Specifications</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full border-collapse text-left text-sm sm:text-base">
                <caption className="sr-only">{`Specifications for ${product.name}`}</caption>
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="even:bg-muted">
                      <th scope="row" className="w-2/5 px-4 py-3 align-top font-semibold">
                        {s.label}
                      </th>
                      <td className="px-4 py-3 text-muted-foreground">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { Icon: ShieldCheck, t: "Warranty and stock", d: "Ask us about brand warranty terms and current stock." },
            { Icon: Ruler, t: "Help choosing", d: "Not sure about thickness or grade? Our team will guide you." },
            { Icon: Truck, t: "Delivery to site", d: "Ask us about delivery and bulk or contractor pricing." },
          ].map(({ Icon, t, d }) => (
            <li key={t} className="rounded-xl border border-border bg-card p-5">
              <Icon className="size-6 text-accent" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold">{t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </div>

      {related.length > 0 && (
        <div className="bg-muted">
          <Section title="Related products" intro={category ? `More from ${category.name}.` : undefined}>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Section>
        </div>
      )}

      {brand && moreFromBrand.length > 0 && (
        <Section title={`More from ${brand.name}`}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {moreFromBrand.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <p className="mt-6">
            <Link href={`/brands/${brand.slug}`} className="inline-flex min-h-11 items-center font-semibold text-primary-strong underline underline-offset-4">
              View all {brand.name} products
            </Link>
          </p>
        </Section>
      )}

      <CtaBand />

      {/* Mobile-only sticky enquiry bar (server-rendered anchors, 64px tall). */}
      <div
        data-sticky-bar
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-2 gap-3 border-t border-border bg-card px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden"
        role="region"
        aria-label="Quick enquiry"
      >
        <a
          href={telUrl()}
          aria-label={`Call ${site.name} about ${product.name}`}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-accent text-base font-semibold text-black"
        >
          <Phone className="size-5" aria-hidden="true" /> Call
        </a>
        <a
          href={whatsappUrl(waText)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp us about ${product.name} (opens in new tab)`}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-ink text-base font-semibold text-white"
        >
          <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
