import Link from "next/link";
import { Boxes, ClipboardCheck, Truck, Users, Layers, PhoneCall, Ruler, Store } from "lucide-react";
import { site, getBrands, getCategories, getProducts } from "@/lib/data";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: `About ${site.name}`,
  description: `Learn about ${site.name}, a multi-brand dealer of plywood, laminates, veneers and other interior materials for homes, contractors and projects.`,
  path: "/about",
});

const card =
  "rounded-xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md";

export default function AboutPage() {
  const brands = getBrands();
  const categories = getCategories();
  const products = getProducts();
  const crumbs = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];
  const address = [site.address.street, site.address.city, site.address.region, site.address.postalCode].join(", ");
  const stats = [
    { n: brands.length, l: "brands" },
    { n: categories.length, l: "categories" },
    { n: products.length, l: "products listed" },
  ];
  const services = [
    { Icon: Boxes, t: "Multi-brand range", d: `Compare ${brands.map((b) => b.name).slice(0, 3).join(", ")} and more side by side.` },
    { Icon: Layers, t: "Samples and shade cards", d: "See and feel finishes in store before you decide." },
    { Icon: Users, t: "Contractor and bulk pricing", d: "Ask about pricing for larger orders and projects." },
    { Icon: Truck, t: "Delivery to site", d: "Talk to us about delivery for your location." },
  ];
  const steps = [
    { Icon: PhoneCall, t: "Tell us your need", d: "Share the rooms, budget and finish you have in mind." },
    { Icon: Ruler, t: "Pick grade and finish", d: "We help match material, thickness and brand to the job." },
    { Icon: ClipboardCheck, t: "Get a quote", d: "Receive pricing and availability, then confirm your order." },
  ];
  return (
    <div>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl bg-ink bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.30),transparent_60%)] px-6 py-12 text-white sm:px-10 md:py-16">
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">About {site.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-200">
            {site.name} is a multi-brand dealer of home interior materials. Compare plywood, blockboard, laminates,
            veneers and louvers from {brands.length} brands in one place.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <li key={s.l}>
                <span className="font-heading text-4xl font-semibold text-amber-300">{s.n}</span>
                <span className="ml-2 text-stone-200">{s.l}</span>
              </li>
            ))}
          </ul>
        </header>
      </div>

      <Section title="What we do" intro="Our team helps homeowners, contractors and designers choose the right material, grade and finish for the job.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ Icon, t, d }, i) => (
            <li key={t} className={`${card} reveal`} style={{ "--i": i } as React.CSSProperties}>
              <Icon className="size-7 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="bg-muted">
        <Section eyebrow="How it works" title="From enquiry to delivery">
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map(({ Icon, t, d }, i) => (
              <li key={t} className={`${card} bg-card`}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink font-heading font-semibold text-white">{i + 1}</span>
                  <Icon className="size-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section title="Visit the store">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <Store className="mt-1 size-7 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-lg">{address}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex min-h-11 items-center rounded-md bg-accent px-6 py-3 font-semibold text-black transition-colors duration-200 hover:bg-amber-500">
              Contact and hours
            </Link>
            <Link href="/brands" className="inline-flex min-h-11 items-center rounded-md border border-stone-400 px-6 py-3 font-semibold transition-colors duration-200 hover:bg-muted">
              Explore our brands
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
