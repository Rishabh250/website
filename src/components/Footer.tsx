import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site, getBrands, getCategories } from "@/lib/data";
import { telUrl } from "@/lib/seo";
import { navLinks } from "./Header";

const linkCls = "inline-flex min-h-11 items-center text-stone-300 transition-colors duration-200 hover:text-white";
const h2 = "mb-3 flex items-center gap-2 font-heading text-base uppercase tracking-wider text-white";

export default function Footer() {
  const a = site.address;
  const social = Object.entries(site.socials).filter(([, url]) => url) as [string, string][];
  return (
    <footer className="bg-ink text-stone-300">
      <div className="h-1 bg-gradient-to-r from-accent via-amber-500 to-accent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="space-y-3 lg:col-span-4">
          <p className="font-heading text-2xl text-white">{site.name}</p>
          <p className="max-w-sm">{site.tagline}.</p>
          <div className="flex gap-2">
            <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
            <address className="not-italic">{a.street}, {a.city}, {a.region} {a.postalCode}</address>
          </div>
          <a href={telUrl()} className={linkCls}><Phone className="mr-2 size-4 text-accent" aria-hidden="true" />{site.phone}</a>
          <a href={`mailto:${site.email}`} className={`${linkCls} break-all`}><Mail className="mr-2 size-4 shrink-0 text-accent" aria-hidden="true" />{site.email}</a>
          <h2 className={`${h2} pt-2`}><Clock className="size-4 text-accent" aria-hidden="true" />Opening hours</h2>
          <ul className="space-y-1">
            {site.hours.map((h) => <li key={h.days}>{h.days}: {h.opens} - {h.closes}</li>)}
          </ul>
        </div>
        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className={h2}>Explore</h2>
          <ul>{navLinks.map((n) => <li key={n.href}><Link href={n.href} className={linkCls}>{n.name}</Link></li>)}</ul>
        </nav>
        <div className="lg:col-span-3">
          <h2 className={h2}>Categories</h2>
          <ul>{getCategories().map((c) => <li key={c.slug}><Link href={`/categories/${c.slug}`} className={linkCls}>{c.name}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className={h2}>Brands</h2>
          <ul>{getBrands().map((b) => <li key={b.slug}><Link href={`/brands/${b.slug}`} className={linkCls}>{b.name}</Link></li>)}</ul>
          {social.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4">
              {social.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer" className={`${linkCls} capitalize`}>{name}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-stone-700 py-6 pb-24 text-center text-sm text-stone-400 md:pb-6">
        &copy; {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
