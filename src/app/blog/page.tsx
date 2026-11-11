import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getPosts } from "@/lib/data";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Interior Materials Blog",
  description: "Buying guides and tips on plywood, laminates, veneers and other interior materials.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

function readMins(content: { type: string; text?: string; items?: string[] }[]) {
  const words = content.map((b) => (b.text ?? b.items?.join(" ") ?? "")).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPage() {
  const posts = getPosts();
  const [featured, ...rest] = posts;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }];
  return (
    <div>
      <JsonLd data={[breadcrumbLd(crumbs), itemListLd(posts.map((p) => ({ name: p.title, href: `/blog/${p.slug}` })))]} />
      <Breadcrumbs items={crumbs} />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-8">
        <h1 className="text-4xl font-semibold sm:text-5xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Buying guides and practical tips for choosing plywood, laminates, veneers and more.
        </p>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-10 grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-2"
          >
            <div className="relative aspect-[16/9] bg-muted md:aspect-auto md:min-h-72">
              <Image src={featured.cover} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong">Latest</p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={featured.date}>{dateFmt.format(new Date(featured.date))}</time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-4" aria-hidden="true" /> {readMins(featured.content)} min read
                </span>
              </p>
              <span className="mt-5 inline-flex items-center gap-1 font-semibold text-primary-strong">
                Read article <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{ "--i": i } as React.CSSProperties}
                className="reveal group overflow-hidden rounded-xl border border-border bg-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] bg-muted">
                  <Image src={p.cover} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={p.date}>{dateFmt.format(new Date(p.date))}</time>
                    <span>{readMins(p.content)} min read</span>
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <CtaBand />
    </div>
  );
}
