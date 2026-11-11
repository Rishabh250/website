import { Phone } from "lucide-react";
import { site } from "@/lib/data";
import { telUrl } from "@/lib/seo";

export default function AnnouncementBar() {
  const h = site.hours[0];
  return (
    <div className="bg-ink text-sm text-stone-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <p className="py-2">
          {site.address.city} showroom
          {h && <span className="hidden sm:inline"> &middot; {h.days} {h.opens} - {h.closes}</span>}
        </p>
        <a
          href={telUrl()}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-white transition-colors duration-200 hover:text-accent"
        >
          <Phone className="size-3.5" aria-hidden="true" /> {site.phone}
        </a>
      </div>
    </div>
  );
}
