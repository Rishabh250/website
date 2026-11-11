import Link from "next/link";
import { site, getBrands } from "@/lib/data";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: `About ${site.name}`,
  description: `Learn about ${site.name}, a multi-brand dealer of plywood, laminates, veneers and other interior materials for homes, contractors and projects.`,
  path: "/about",
});

export default function AboutPage() {
  const brands = getBrands();
  const crumbs = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="font-heading mt-4 text-3xl font-semibold sm:text-4xl">About {site.name}</h1>
      <div className="mt-6 space-y-4">
        <p>
          {site.name} is a multi-brand dealer of home interior materials. Compare plywood, blockboard,
          laminates, veneers and louvers from {brands.length} leading brands in one place.
        </p>
        <p>
          Our team helps homeowners, contractors and designers choose the right material, grade and finish for the job,
          with sample sheets and shade cards in store, contractor and bulk pricing, and delivery to site.
        </p>
        <p>
          Visit us at {[site.address.street, site.address.city, site.address.region, site.address.postalCode].join(", ")}, or <Link href="/contact" className="underline">get in touch</Link> for a quote.
        </p>
      </div>
      <Link href="/brands" className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-medium text-black">
        Explore our brands
      </Link>
    </div>
  );
}
