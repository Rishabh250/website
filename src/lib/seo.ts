import type { Metadata } from "next";
import { site } from "./data";
import type { Brand, Post, Product } from "./types";

export function absoluteUrl(p = "/"): string {
  if (/^https?:\/\//.test(p)) return p;
  return `${site.siteUrl.replace(/\/$/, "")}${p.startsWith("/") ? p : `/${p}`}`;
}

export function buildMetadata(o: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(o.path);
  // Social crawlers don't render SVG; fall back to the generated /opengraph-image (PNG).
  const raster = o.image && !o.image.toLowerCase().endsWith(".svg") ? o.image : "/opengraph-image";
  const images = [{ url: absoluteUrl(raster) }];
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      siteName: site.name,
      type: o.type ?? "website",
      locale: "en_IN",
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })
    .format(n)
    .replace(/\s/g, "");
}

const digits = (s: string) => s.replace(/\D/g, "");

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${digits(site.whatsapp)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telUrl(): string {
  const d = digits(site.phone);
  return `tel:+${d.length === 10 ? `91${d}` : d}`;
}

type Ld = Record<string, unknown>;

const DAY_MAP: Record<string, string> = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday",
};
const ALL_DAYS = Object.values(DAY_MAP);

function parseDays(s: string): string[] {
  const parts = s.toLowerCase().split(/\s*(?:-|–|—|to)\s*/);
  const idx = (x: string) => ALL_DAYS.findIndex((d) => d.toLowerCase().startsWith(x.trim().slice(0, 3)));
  if (parts.length === 2) {
    const a = idx(parts[0]);
    const b = idx(parts[1]);
    if (a >= 0 && b >= 0) {
      const out: string[] = [];
      for (let i = a; ; i = (i + 1) % 7) {
        out.push(ALL_DAYS[i]);
        if (i === b) break;
      }
      return out;
    }
  }
  const list = s.split(/[,&]/).map((x) => idx(x)).filter((i) => i >= 0).map((i) => ALL_DAYS[i]);
  return list.length ? list : ALL_DAYS;
}

export function localBusinessLd(): Ld {
  const sameAs = Object.values(site.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${absoluteUrl("/")}#business`,
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    telephone: site.phone,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: parseDays(h.days),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs,
  };
}

export function websiteLd(): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    inLanguage: "en-IN",
  };
}

export function breadcrumbLd(items: { name: string; href: string }[]): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  };
}

export function productLd(product: Product, brand?: Brand): Ld {
  const url = absoluteUrl(`/products/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url,
    image: product.images.map(absoluteUrl),
    category: product.category,
    ...(product.specs.length > 0 && {
      additionalProperty: product.specs.map((s) => ({
        "@type": "PropertyValue",
        name: s.label,
        value: s.value,
      })),
    }),
    brand: { "@type": "Brand", name: brand?.name ?? product.brand },
    ...(product.priceFrom != null && {
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: product.priceFrom,
        ...(product.priceUnit && {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "INR",
            price: product.priceFrom,
            unitText: product.priceUnit,
          },
        }),
        url,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: site.name },
      },
    }),
  };
}

export function brandLd(brand: Brand): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.description,
    slogan: brand.tagline,
    url: absoluteUrl(`/brands/${brand.slug}`),
    ...(brand.logo && { logo: absoluteUrl(brand.logo) }),
    ...(brand.website && { sameAs: [brand.website] }),
  };
}

export function articleLd(post: Post): Ld {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.cover)],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    mainEntityOfPage: url,
    url,
  };
}

export function itemListLd(items: { name: string; href: string }[]): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.href),
    })),
  };
}
