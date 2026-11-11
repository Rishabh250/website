import { getBrands } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import BrandCard from "@/components/BrandCard";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Plywood, Laminate & Veneer Brands",
  description: "Browse the plywood, laminate, veneer and louver brands we stock, from leading manufacturers, with quotes and delivery to site.",
  path: "/brands",
});

export default function BrandsPage() {
  const brands = getBrands();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Brands", href: "/brands" }];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(brands.map((b) => ({ name: b.name, href: `/brands/${b.slug}` })))]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">Our Brands</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Every brand we stock, with genuine materials and samples available in store.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
    </div>
  );
}
