import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { getProductsByCategory } from "@/lib/data";

export default function CategoryCard({ category }: { category: Category }) {
  const count = getProductsByCategory(category.slug).length;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative isolate flex aspect-[4/5] cursor-pointer flex-col justify-end overflow-hidden rounded-xl bg-ink transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:aspect-[3/4]"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/30" />
      </div>
      <div className="p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-300">
          {count} {count === 1 ? "product" : "products"}
        </p>
        <h3 className="font-heading mt-2 flex items-start justify-between gap-3 text-xl leading-snug text-white">
          {category.name}
          <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        {category.description && <p className="mt-2 line-clamp-3 text-sm text-stone-200">{category.description}</p>}
      </div>
    </Link>
  );
}
