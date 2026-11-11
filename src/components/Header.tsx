import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/data";
import { telUrl } from "@/lib/seo";

export const navLinks = [
  { name: "Brands", href: "/brands" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const link =
  "relative inline-flex min-h-11 items-center px-3 text-base font-medium text-foreground transition-colors duration-200 hover:text-accent after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center font-heading text-lg tracking-wide text-foreground sm:text-xl">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {navLinks.map((n) => (
            <Link key={n.href} href={n.href} className={link}>{n.name}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-md border border-ink px-4 font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-white md:inline-flex"
          >
            Get a quote
          </Link>
          <a
            href={telUrl()}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 font-semibold text-black shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-amber-500"
          >
            <Phone className="size-4" aria-hidden="true" /> Call
          </a>
          <details className="group relative lg:hidden">
            <summary
              aria-label="Menu"
              className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card"
            >
              <Menu className="size-5 group-open:hidden" aria-hidden="true" />
              <X className="hidden size-5 group-open:block" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-full mt-2 flex w-72 max-w-[calc(100vw-2rem)] flex-col rounded-xl border border-border bg-card p-2 shadow-xl"
            >
              {navLinks.map((n) => (
                <Link key={n.href} href={n.href} className="inline-flex min-h-12 items-center rounded-lg px-4 text-lg text-foreground transition-colors duration-200 hover:bg-muted">
                  {n.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-4 font-semibold text-white transition-colors duration-200 hover:bg-stone-800"
              >
                Get a quote
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
