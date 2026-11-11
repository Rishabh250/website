import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export const faqs = [
  {
    q: "What is the difference between BWP and MR plywood?",
    a: "MR (moisture resistant) plywood is bonded with urea-formaldehyde resin and suits dry interior areas such as bedroom wardrobes and living room furniture. BWP (boiling water proof) plywood uses phenolic resin and resists moisture and humidity far better, so it is the usual choice for kitchens, bathrooms and other damp areas. Neither is meant to be left permanently submerged or exposed to weather.",
  },
  {
    q: "How do I choose the right laminate thickness?",
    a: "Thickness depends on where the laminate goes. Thin laminates of about 0.8 mm are commonly used on vertical surfaces such as wardrobe shutters and wall panels. Thicker laminates of about 1 mm or more are commonly used on surfaces that take more wear, such as tabletops and kitchen counters. Ask us and we can help you match thickness and finish to your project.",
  },
  {
    q: "Should I choose veneer or laminate?",
    a: "Veneer is a thin slice of real wood that gives natural grain and can be polished or stained, but it needs more care. Laminate is a manufactured surface that offers a wide range of colours and textures and is generally easier to maintain and more resistant to scratches and stains. Your choice depends on the look you want, your budget and how much upkeep suits you.",
  },
  {
    q: "Do you supply to contractors and for bulk orders?",
    a: "Yes, we quote for homeowners, interior designers, contractors and larger project requirements. Contact us with your material list and quantities, and we will share a quote. Contact us for pricing on bulk orders.",
  },
  {
    q: "Do you deliver materials to site?",
    a: "We arrange delivery to site. Charges, timelines and coverage depend on your location and order size, so contact us with your site address for details.",
  },
  {
    q: "How can I get a quote?",
    a: "Call us, message us on WhatsApp or use the contact page. Share the materials, brands, thickness and quantities you need, and we will get back to you with a quote. You can also visit the store to see shade cards and samples first.",
  },
];

export default function Faq() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-semibold text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:px-6">
              {f.q}
              <ChevronDown className="size-5 shrink-0 text-primary-strong transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-muted-foreground sm:px-6">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
