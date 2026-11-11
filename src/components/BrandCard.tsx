import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/types";
import { getCategory, getProductsByBrand } from "@/lib/data";

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}

export default function BrandCard({ brand }: { brand: Brand }) {
  const count = getProductsByBrand(brand.slug).length;
  const cats = brand.categories.map((s) => getCategory(s)?.name).filter(Boolean) as string[];
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group flex h-full cursor-pointer flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-4">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt=""
            width={120}
            height={56}
            className="h-14 w-auto max-w-[8rem] object-contain"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-heading flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg tracking-wide text-white ring-2 ring-accent/60 ring-offset-2 ring-offset-card"
          >
            {initials(brand.name)}
          </span>
        )}
        <h3 className="font-heading text-xl leading-tight text-foreground">{brand.name}</h3>
      </div>
      {brand.tagline && <p className="text-sm text-muted-foreground">{brand.tagline}</p>}
      {cats.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Categories">
          {cats.map((c) => (
            <li key={c} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
              {c}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary-strong">
        {count} {count === 1 ? "product" : "products"}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
      </span>
    </Link>
  );
}
