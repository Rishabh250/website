import { getProducts } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "All Interior Material Products",
  description: "Browse our range of plywood, blockboard, laminates, veneers and louvers from leading brands. Ask us for a quote.",
  path: "/products",
});

export default function ProductsPage() {
  const products = getProducts();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Products", href: "/products" }];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })))]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">All Products</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
