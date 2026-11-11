import { getCategories } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryCard from "@/components/CategoryCard";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Interior Material Categories",
  description: "Browse plywood and blockboard, laminates and mica, veneers and panels, and louvers from leading brands, with quotes and delivery.",
  path: "/categories",
});

export default function CategoriesPage() {
  const categories = getCategories();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Categories", href: "/categories" }];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(categories.map((c) => ({ name: c.name, href: `/categories/${c.slug}` })))]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">Interior Material Categories</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Find the right material for every interior job.</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
