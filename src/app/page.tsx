import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Palette, Truck, Phone, MessageCircle, ArrowRight } from "lucide-react";
import {
  site,
  getBrands,
  getCategories,
  getProducts,
  getFeaturedProducts,
  getPosts,
} from "@/lib/data";
import { buildMetadata, telUrl, whatsappUrl } from "@/lib/seo";
import BrandCard from "@/components/BrandCard";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import HowItWorks from "@/components/home/HowItWorks";
import Faq from "@/components/home/Faq";

export const metadata = buildMetadata({
  title: `${site.name} | Plywood, Laminates & Veneers Dealer`,
  description: `Plywood, blockboard, laminates, veneers and louvers from leading brands at ${site.name}. Genuine stock, contractor pricing and delivery to site.`,
  path: "/",
});

const ticks = [
  { icon: BadgeCheck, label: "Brand-authorised stock" },
  { icon: Palette, label: "Shade cards in store" },
  { icon: Truck, label: "Site delivery" },
];

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" });
const btn = "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold transition-colors duration-200";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Home() {
  const brands = getBrands();
  const categories = getCategories();
  const productCount = getProducts().length;
  const featured = getFeaturedProducts(8);
  const posts = getPosts().slice(0, 3);
  const stats = [
    { n: brands.length, label: "brands" },
    { n: productCount, label: "products" },
    { n: categories.length, label: "categories" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(217,119,6,0.18),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-28">
          <div>
            <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{site.name}</p>
            <h1 className="reveal font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl" style={{ "--i": 1 } as React.CSSProperties}>
              Plywood, laminates &amp; veneers for every home interior
            </h1>
            <p className="reveal mt-5 max-w-xl text-base text-white/85 sm:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
              {site.name} stocks plywood, blockboard, laminates, veneers and louvers
              from leading brands, with quotes for homes, contractors and projects.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <Link href="/contact" className={`${btn} ${focus} bg-accent text-black hover:bg-amber-500`}>
                Get a quote <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a href={telUrl()} className={`${btn} ${focus} border border-white/60 text-white hover:bg-white/10`}>
                <Phone className="size-5" aria-hidden="true" /> Call
              </a>
              <a
                href={whatsappUrl("Hi, I'd like a quote for plywood, laminates and other interior materials.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us (opens in new tab)"
                className={`${btn} ${focus} border border-white/60 text-white hover:bg-white/10`}
              >
                <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <div className="reveal mt-10 border-t border-white/15 pt-6" style={{ "--i": 4 } as React.CSSProperties}>
              <p className="text-sm font-semibold text-white">
                {stats.map((s) => `${s.n} ${s.label}`).join(" · ")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {ticks.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-sm text-white/85">
                    <Icon className="size-4 text-accent" aria-hidden="true" /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Image
            src="/img/hero.svg"
            alt="Stacked plywood sheets, laminate swatches, wood veneer and louver panels"
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-xl shadow-2xl shadow-black/40 ring-1 ring-white/10"
          />
        </div>
      </section>

      <Section id="brands" eyebrow="Our brands" title="Brands we carry" intro="Leading plywood, laminate and veneer brands, all available from one dealer.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((b, i) => (
            <div key={b.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <BrandCard brand={b} />
            </div>
          ))}
        </div>
        <p className="mt-8">
          <Link href="/brands" className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-primary-strong underline-offset-4 hover:underline">
            View all brands <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </Section>

      <Section id="categories" eyebrow="Shop by material" title="Material categories" className="bg-muted">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <div key={c.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <CategoryCard category={c} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="featured" eyebrow="Handpicked" title="Featured products">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <div key={p.slug} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <p className="mt-8">
          <Link href="/products" className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-primary-strong underline-offset-4 hover:underline">
            View all {productCount} products <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </Section>

      <section id="process" className="bg-ink py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 max-w-2xl md:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">How it works</p>
            <h2 className="text-3xl text-white md:text-4xl">Plan your project in four steps</h2>
          </header>
          <HowItWorks />
        </div>
      </section>

      <Section id="faq" eyebrow="FAQ" title="Common questions about interior materials" className="bg-muted">
        <Faq />
      </Section>

      {posts.length > 0 && (
        <Section id="journal" eyebrow="Journal" title="Latest from the blog">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{ "--i": i } as React.CSSProperties}
                className="reveal group block cursor-pointer rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <time dateTime={p.date} className="text-xs text-muted-foreground">
                  {dateFmt.format(new Date(p.date))}
                </time>
                <h3 className="font-heading mt-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">
                  Read more <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
