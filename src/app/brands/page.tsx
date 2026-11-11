import { getBrands, getProducts } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandCard from "@/components/BrandCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Plywood, Laminate & Veneer Brands",
  description: "Browse the plywood, laminate, veneer and louver brands we stock, from leading manufacturers, with quotes and delivery to site.",
  path: "/brands",
});

export default function BrandsPage() {
  const brands = getBrands();
  const productCount = getProducts().length;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Brands", href: "/brands" }];
  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(brands.map((b) => ({ name: b.name, href: `/brands/${b.slug}` })))]} />
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-16 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong">Brands we stock</p>
          <h1 className="font-heading mt-3 text-4xl text-foreground md:text-5xl">Our Brands</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every brand we stock, with genuine materials and samples available in store. Compare ranges side by side and ask us for a quote.
          </p>
          <p className="mt-6 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground">
            {brands.length} brands &middot; {productCount} products
          </p>
        </div>
      </section>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brands.map((b, i) => (
              <li key={b.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                <BrandCard brand={b} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
