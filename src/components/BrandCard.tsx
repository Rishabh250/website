import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    >
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={160}
          height={80}
          className="h-20 w-auto max-w-full object-contain"
        />
      ) : (
        <>
          <span className="font-heading text-2xl tracking-wide text-foreground">{brand.name}</span>
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          {brand.tagline && <span className="text-sm text-muted-foreground">{brand.tagline}</span>}
        </>
      )}
      {brand.logo && <span className="sr-only">{brand.name}</span>}
    </Link>
  );
}
