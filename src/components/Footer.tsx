import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site, getBrands } from "@/lib/data";
import { telUrl } from "@/lib/seo";
import { navLinks } from "./Header";

const linkCls = "inline-flex min-h-11 items-center text-stone-300 transition-colors duration-200 hover:text-white";

export default function Footer() {
  const a = site.address;
  const social = Object.entries(site.socials).filter(([, url]) => url) as [string, string][];
  return (
    <footer className="mt-16 bg-ink text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="font-heading text-2xl text-white">{site.name}</p>
          <div className="flex gap-2">
            <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
            <address className="not-italic">{a.street}, {a.city}, {a.region} {a.postalCode}</address>
          </div>
          <a href={telUrl()} className={linkCls}><Phone className="mr-2 size-4" aria-hidden="true" />{site.phone}</a>
          <a href={`mailto:${site.email}`} className={linkCls}><Mail className="mr-2 size-4" aria-hidden="true" />{site.email}</a>
        </div>
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-base text-white"><Clock className="size-4" aria-hidden="true" />Opening hours</h2>
          <ul className="space-y-1">
            {site.hours.map((h) => <li key={h.days}>{h.days}: {h.opens} - {h.closes}</li>)}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-base text-white">Explore</h2>
          <ul>{navLinks.map((n) => <li key={n.href}><Link href={n.href} className={linkCls}>{n.name}</Link></li>)}</ul>
        </nav>
        <div>
          <h2 className="mb-3 text-base text-white">Brands</h2>
          <ul>{getBrands().map((b) => <li key={b.slug}><Link href={`/brands/${b.slug}`} className={linkCls}>{b.name}</Link></li>)}</ul>
          {social.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-4">
              {social.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer" className={`${linkCls} capitalize`}>{name}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-stone-700 py-6 text-center text-sm text-stone-400">
        &copy; {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
