import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getBrand } from "@/lib/data";
import { formatPrice } from "@/lib/seo";

export default function ProductCard({ product }: { product: Product }) {
  const brand = getBrand(product.brand);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={`${product.name}${brand ? ` by ${brand.name}` : ""}`}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="space-y-1 p-5">
        {brand && (
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-strong">{brand.name}</p>
        )}
        <h3 className="text-base text-foreground">{product.name}</h3>
        {product.priceFrom ? (
          <p className="pt-1 text-muted-foreground">From {formatPrice(product.priceFrom)}{product.priceUnit ? ` / ${product.priceUnit}` : ""}</p>
        ) : null}
      </div>
    </Link>
  );
}
