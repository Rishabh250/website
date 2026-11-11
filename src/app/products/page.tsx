import { getCategories, getProducts, getProductsByCategory } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "All Interior Material Products",
  description: "Browse our range of plywood, blockboard, laminates, veneers and louvers from leading brands. Ask us for a quote.",
  path: "/products",
});

export default function ProductsPage() {
  const products = getProducts();
  const groups = getCategories()
    .map((c) => ({ category: c, items: getProductsByCategory(c.slug) }))
    .filter((g) => g.items.length > 0);
  const crumbs = [{ name: "Home", href: "/" }, { name: "Products", href: "/products" }];
  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })))]} />
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong">The full range</p>
          <h1 className="font-heading mt-3 text-4xl text-foreground md:text-5xl">All Products</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Plywood, laminates, veneers and louvers from the brands we stock. Prices shown are starting prices; ask us for a quote on your quantity.
          </p>
          <p className="mt-6 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground">
            {products.length} products &middot; {groups.length} categories
          </p>
        </div>
      </section>
      <nav aria-label="Product categories" className="z-20 border-b md:sticky md:top-[60px] border-border bg-background/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {groups.map((g) => (
            <li key={g.category.slug} className="shrink-0">
              <a
                href={`#${g.category.slug}`}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {g.category.name} ({g.items.length})
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {groups.map((g, gi) => (
        <section
          key={g.category.slug}
          id={g.category.slug}
          aria-labelledby={`${g.category.slug}-h`}
          className={`scroll-mt-32 py-12 md:py-16 ${gi % 2 ? "bg-muted" : "bg-background"}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id={`${g.category.slug}-h`} className="font-heading text-2xl text-foreground md:text-3xl">{g.category.name}</h2>
            {g.category.description && <p className="mt-2 max-w-2xl text-muted-foreground">{g.category.description}</p>}
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {g.items.map((p, i) => (
                <li key={p.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
