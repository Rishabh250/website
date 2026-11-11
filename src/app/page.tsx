import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Palette, Truck, Percent } from "lucide-react";
import {
  site,
  getBrands,
  getCategories,
  getFeaturedProducts,
  getPosts,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import BrandCard from "@/components/BrandCard";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";

export const metadata = buildMetadata({
  title: `${site.name} | Plywood, Laminates & Veneers Dealer`,
  description: `Plywood, blockboard, laminates, veneers and louvers from leading brands at ${site.name}. Genuine stock, contractor pricing and delivery to site.`,
  path: "/",
});

const why = [
  { icon: BadgeCheck, title: "Genuine brand stock", text: "Brand-authorised plywood, laminates and veneers, sourced from the manufacturers you trust." },
  { icon: Palette, title: "Shades and samples in store", text: "Browse shade cards and sample sheets in person before you choose a finish." },
  { icon: Percent, title: "Contractor and bulk pricing", text: "Competitive rates for contractors, designers and bulk project orders." },
  { icon: Truck, title: "Delivery to site", text: "Materials delivered to your site, so work keeps moving." },
];

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" });

export default function Home() {
  const brands = getBrands();
  const categories = getCategories();
  const featured = getFeaturedProducts(8);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:px-8 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Plywood, laminates &amp; veneers for every home interior
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              {site.name} stocks plywood, blockboard, laminates, veneers and louvers
              from leading brands, with quotes for homes, contractors and projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/brands" className="inline-flex min-h-11 cursor-pointer items-center rounded-md bg-accent px-6 py-3 font-medium text-black transition-colors duration-200 hover:bg-amber-500">
                Browse brands
              </Link>
              <Link href="/contact" className="inline-flex min-h-11 cursor-pointer items-center rounded-md border border-white/60 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-white/10">
                Get a quote
              </Link>
            </div>
          </div>
          <Image
            src="/img/hero.svg"
            alt="Stacked plywood sheets, laminate swatches, wood veneer and louver panels"
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-lg"
          />
        </div>
      </section>

      <Section id="brands" eyebrow="Our brands" title="Brands we carry" intro="Leading plywood, laminate and veneer brands, all available from one dealer.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </Section>

      <Section id="categories" eyebrow="Shop by material" title="Material categories">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </Section>

      <Section id="featured" eyebrow="Handpicked" title="Featured products">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <Section id="why-us" eyebrow="Why us" title={`Why choose ${site.name}`}>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-lg border border-border bg-card p-5">
              <Icon className="h-6 w-6" aria-hidden />
              <h3 className="font-heading mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {posts.length > 0 && (
        <Section id="journal" eyebrow="Journal" title="Latest from the blog">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-lg border border-border bg-card p-5 hover:border-foreground">
                <time dateTime={p.date} className="text-xs text-muted-foreground">
                  {dateFmt.format(new Date(p.date))}
                </time>
                <h3 className="font-heading mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section id="visit" eyebrow="Visit us" title="Visit our store and see the samples">
        <div className="rounded-lg border border-border bg-card p-6">
          <p>{[site.address.street, site.address.city, site.address.region, site.address.postalCode].join(", ")}</p>
          <ul className="mt-2 text-muted-foreground">{site.hours.map((h) => <li key={h.days}>{`${h.days}: ${h.opens} - ${h.closes}`}</li>)}</ul>
          <Link href="/contact" className="mt-5 inline-block rounded-md bg-accent px-6 py-3 font-medium text-black">
            Get directions
          </Link>
        </div>
      </Section>
    </>
  );
}
