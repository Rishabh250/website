import { Clock, Mail, MapPin, Phone, CheckCircle2, ExternalLink } from "lucide-react";
import { site } from "@/lib/data";
import { buildMetadata, breadcrumbLd, telUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryButtons from "@/components/EnquiryButtons";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Contact and Store Location",
  description: `Visit ${site.name} or get in touch. Find our address, opening hours, phone number and email.`,
  path: "/contact",
});

const card = "rounded-xl border border-border bg-card p-6 shadow-sm";
const link =
  "inline-flex min-h-11 items-center font-semibold text-primary-strong underline underline-offset-4 hover:text-foreground";

export default function ContactPage() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];
  const address = [site.address.street, site.address.city, site.address.region, site.address.postalCode].join(", ");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const checklist = [
    "Product or category you are interested in",
    "Thickness, size or finish, if you know it",
    "Approximate quantity",
    "Delivery location",
    "Photos or a drawing of the job, if available",
  ];
  return (
    <div>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-8">
        <h1 className="text-4xl font-semibold sm:text-5xl">Contact Us</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Call, message or visit the store. We will help you choose materials and share a quote.
        </p>

        <div className="mt-8 rounded-2xl bg-ink bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.30),transparent_60%)] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Get a quote fast</h2>
          <p className="mt-2 text-stone-200">Call or WhatsApp us, or send an email.</p>
          <EnquiryButtons tone="dark" className="mt-5" />
        </div>

        <dl className="mt-8 grid gap-4 md:grid-cols-2">
          <div className={card}>
            <dt className="flex items-center gap-2 font-heading text-lg font-semibold">
              <Phone className="size-5 text-accent" aria-hidden="true" /> Phone
            </dt>
            <dd className="mt-2">
              <a href={telUrl()} className={link}>{site.phone}</a>
            </dd>
          </div>
          <div className={card}>
            <dt className="flex items-center gap-2 font-heading text-lg font-semibold">
              <Mail className="size-5 text-accent" aria-hidden="true" /> Email
            </dt>
            <dd className="mt-2 break-all">
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
            </dd>
          </div>
          <div className={card}>
            <dt className="flex items-center gap-2 font-heading text-lg font-semibold">
              <MapPin className="size-5 text-accent" aria-hidden="true" /> Address
            </dt>
            <dd className="mt-2 text-muted-foreground">
              <address className="not-italic">{address}</address>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={`${link} mt-2 gap-2`}>
                Open in Google Maps <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </dd>
          </div>
          <div className={card}>
            <dt className="flex items-center gap-2 font-heading text-lg font-semibold">
              <Clock className="size-5 text-accent" aria-hidden="true" /> Opening hours
            </dt>
            <dd className="mt-2">
              <table className="w-full text-left">
                <caption className="sr-only">Store opening hours</caption>
                <thead className="sr-only">
                  <tr><th scope="col">Days</th><th scope="col">Hours</th></tr>
                </thead>
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.days}>
                      <th scope="row" className="py-1 pr-4 font-medium">{h.days}</th>
                      <td className="py-1 text-muted-foreground">{`${h.opens} - ${h.closes}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </dd>
          </div>
        </dl>

        <section aria-labelledby="share-heading" className="mt-12 max-w-2xl">
          <h2 id="share-heading" className="text-2xl font-semibold">What to share for a quick quote</h2>
          <ul className="mt-4 space-y-3">
            {checklist.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
