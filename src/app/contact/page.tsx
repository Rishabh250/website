import { site } from "@/lib/data";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryButtons from "@/components/EnquiryButtons";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Contact and Store Location",
  description: `Visit ${site.name} or get in touch. Find our address, opening hours, phone number and email.`,
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([site.address.street, site.address.city, site.address.region, site.address.postalCode].join(", "))}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">Contact Us</h1>
      <dl className="mt-6 space-y-5 rounded-lg border border-border bg-card p-6">
        <div>
          <dt className="font-heading font-semibold">Address</dt>
          <dd className="text-muted-foreground">{[site.address.street, site.address.city, site.address.region, site.address.postalCode].join(", ")}</dd>
        </div>
        <div>
          <dt className="font-heading font-semibold">Opening hours</dt>
          <dd className="text-muted-foreground">{site.hours.map((h) => <div key={h.days}>{`${h.days}: ${h.opens} - ${h.closes}`}</div>)}</dd>
        </div>
        <div>
          <dt className="font-heading font-semibold">Phone</dt>
          <dd><a href={`tel:${site.phone}`} className="underline">{site.phone}</a></dd>
        </div>
        <div>
          <dt className="font-heading font-semibold">Email</dt>
          <dd><a href={`mailto:${site.email}`} className="underline">{site.email}</a></dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <EnquiryButtons />
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="underline">
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
