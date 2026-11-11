import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/lib/data";
import { buildMetadata, breadcrumbLd, articleLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

// Unknown slugs return a hard 404 (not a streamed 200 soft-404).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: (post.seo?.description ?? post.excerpt).slice(0, 160),
    path: `/blog/${post.slug}`,
    image: post.cover,
    type: "article",
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getPosts().filter((p) => p.slug !== slug).slice(0, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={[breadcrumbLd(crumbs), articleLd(post)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time> · {post.author}
      </p>
      <div className="mt-8 space-y-4 leading-relaxed">
        {post.content.map((b, i) => {
          if (b.type === "h2")
            return (
              <h2 key={i} className="font-heading pt-4 text-2xl font-semibold">
                {b.text}
              </h2>
            );
          if (b.type === "ul")
            return (
              <ul key={i} className="list-disc space-y-1 pl-6">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          return <p key={i}>{b.text}</p>;
        })}
      </div>
      {related.length > 0 && (
        <aside className="mt-12 border-t border-border pt-6">
          <h2 className="font-heading text-xl font-semibold">Keep reading</h2>
          <ul className="mt-3 space-y-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
