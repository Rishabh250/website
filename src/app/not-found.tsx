import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { getBrands, getCategories } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const pill =
  "inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-semibold transition-[background-color,box-shadow] duration-200 hover:bg-muted hover:shadow-sm";

export default function NotFound() {
  const categories = getCategories();
  const brands = getBrands();
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24">
      <Compass className="mx-auto size-12 text-accent" aria-hidden="true" />
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
        We could not find that page. Browse a category or brand below, or head back to the main sections.
      </p>

      <section aria-labelledby="nf-cat" className="mt-10">
        <h2 id="nf-cat" className="text-xl font-semibold">Browse categories</h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/categories/${c.slug}`} className={pill}>{c.name}</Link></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="nf-brand" className="mt-8">
        <h2 id="nf-brand" className="text-xl font-semibold">Browse brands</h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          {brands.map((b) => (
            <li key={b.slug}><Link href={`/brands/${b.slug}`} className={pill}>{b.name}</Link></li>
          ))}
        </ul>
      </section>

      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex min-h-11 items-center gap-1 rounded-md bg-ink px-5 font-semibold text-white transition-colors duration-200 hover:bg-stone-700"
            >
              {l.label} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
