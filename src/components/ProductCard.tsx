import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getBrand, getCategory } from "@/lib/data";
import { formatPrice } from "@/lib/seo";

export default function ProductCard({ product }: { product: Product }) {
  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const spec =
    product.specs.find((s) => /thickness|finish/i.test(s.label)) ?? product.specs[0];
  const sizes = product.sizes.slice(0, 2);
  const extra = product.sizes.length - sizes.length;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.images[0] && (
          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src={product.images[0]}
              alt=""
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        {category && (
          <span className="absolute bottom-3 left-3 rounded-full bg-card px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
            {category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {brand && <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-strong">{brand.name}</p>}
        <h3 className="text-base font-semibold leading-snug text-foreground">{product.name}</h3>
        {spec && (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{spec.label}:</span> {spec.value}
          </p>
        )}
        {sizes.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Sizes">
            {sizes.map((s) => (
              <li key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">{s}</li>
            ))}
            {extra > 0 && <li className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{extra} more</li>}
          </ul>
        )}
        {product.priceFrom ? (
          <p className="mt-auto pt-2 text-base font-semibold text-foreground">
            From {formatPrice(product.priceFrom)}
            {product.priceUnit && <span className="text-sm font-normal text-muted-foreground"> / {product.priceUnit}</span>}
          </p>
        ) : (
          <p className="mt-auto pt-2 text-sm font-semibold text-primary-strong">Ask for a quote</p>
        )}
      </div>
    </Link>
  );
}
