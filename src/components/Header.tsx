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
  "inline-flex min-h-11 items-center px-3 text-base text-foreground transition-colors duration-200 hover:text-accent";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center font-heading text-xl tracking-wide text-foreground">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {navLinks.map((n) => (
            <Link key={n.href} href={n.href} className={link}>{n.name}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={telUrl()}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 font-semibold text-black transition-colors duration-200 hover:bg-amber-500"
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
              className="absolute right-0 top-full mt-2 flex w-56 flex-col rounded-lg border border-border bg-card p-2 shadow-lg"
            >
              {navLinks.map((n) => (
                <Link key={n.href} href={n.href} className={`${link} rounded hover:bg-muted`}>{n.name}</Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
