import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/brands", label: "Brands" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-heading text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">We could not find that page. Try one of these instead.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="rounded-md border border-border bg-card px-4 py-2 hover:border-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
