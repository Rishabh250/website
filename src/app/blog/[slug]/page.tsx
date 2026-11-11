import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ListOrdered } from "lucide-react";
import { getPosts, getPost, getCategories, getProductsByCategory } from "@/lib/data";
import { buildMetadata, breadcrumbLd, articleLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
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

const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

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

  // Unique heading ids (suffix duplicates) shared by the TOC and rendered h2s.
  const used = new Map<string, number>();
  const ids = post.content.map((b) => {
    if (b.type !== "h2") return "";
    const base = slugify(b.text) || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  });
  const toc = post.content.flatMap((b, i) => (b.type === "h2" ? [{ id: ids[i], text: b.text }] : []));

  const text = post.content.map((b) => (b.type === "ul" ? b.items.join(" ") : b.text)).join(" ");
  const minutes = Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));

  // Related products: first category whose keywords appear in the post text.
  const hay = `${post.title} ${post.excerpt} ${text}`.toLowerCase();
  const cat = getCategories().find((c) =>
    c.slug
      .split("-")
      .filter((w) => w.length > 3)
      .some((w) => hay.includes(w.replace(/s$/, ""))),
  );
  const products = cat ? getProductsByCategory(cat.slug).slice(0, 4) : [];

  return (
    <article>
      <JsonLd data={[breadcrumbLd(crumbs), articleLd(post)]} />
      <Breadcrumbs items={crumbs} />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" /> {minutes} min read
            </span>
          </p>
        </header>
        <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-2xl bg-muted">
          <Image src={post.cover} alt="" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="max-w-prose text-lg leading-8">
            {post.content.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2 key={i} id={ids[i]} className="mb-4 mt-12 text-2xl font-semibold leading-snug first:mt-0 sm:text-3xl">
                    {b.text}
                  </h2>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="my-5 list-disc space-y-2 pl-6 marker:text-accent">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="my-5">
                  {b.text}
                </p>
              );
            })}
          </div>

          {toc.length > 1 && (
            <aside className="order-first lg:order-none">
              <nav aria-label="Table of contents" className="rounded-xl border border-border bg-card p-5 lg:sticky lg:top-24">
                <h2 className="flex items-center gap-2 text-base font-semibold">
                  <ListOrdered className="size-5 text-accent" aria-hidden="true" /> In this article
                </h2>
                <ol className="mt-3 space-y-1 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="flex min-h-11 items-center text-primary-strong underline-offset-4 hover:text-foreground hover:underline">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </div>

      {products.length > 0 && cat && (
        <div className="bg-muted">
          <Section title={`Shop ${cat.name.toLowerCase()}`} intro="Products related to this guide.">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Section>
        </div>
      )}

      {related.length > 0 && (
        <Section title="Keep reading">
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-lg font-semibold">{p.title}</span>
                  <span className="mt-2 text-sm text-muted-foreground">{p.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand />
    </article>
  );
}
