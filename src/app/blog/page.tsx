import Link from "next/link";
import { getPosts } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Interior Materials Blog",
  description: "Buying guides and tips on plywood, laminates, veneers and other interior materials.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

export default function BlogPage() {
  const posts = getPosts();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(posts.map((p) => ({ name: p.title, href: `/blog/${p.slug}` })))]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">Blog</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-lg border border-border bg-card p-5 hover:border-foreground">
            <time dateTime={p.date} className="text-xs text-muted-foreground">
              {dateFmt.format(new Date(p.date))}
            </time>
            <h2 className="font-heading mt-2 text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
