import { getCategories, getProducts } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryCard from "@/components/CategoryCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Interior Material Categories",
  description: "Browse plywood and blockboard, laminates and mica, veneers and panels, and louvers from leading brands, with quotes and delivery.",
  path: "/categories",
});

export default function CategoriesPage() {
  const categories = getCategories();
  const productCount = getProducts().length;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Categories", href: "/categories" }];
  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(categories.map((c) => ({ name: c.name, href: `/categories/${c.slug}` })))]} />
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-16 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong">Shop by material</p>
          <h1 className="font-heading mt-3 text-4xl text-foreground md:text-5xl">Interior Material Categories</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Find the right material for every interior job, from structural boards to decorative surfaces and feature-wall panels.
          </p>
          <p className="mt-6 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground">
            {categories.length} categories &middot; {productCount} products
          </p>
        </div>
      </section>
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <li key={c.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                <CategoryCard category={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
