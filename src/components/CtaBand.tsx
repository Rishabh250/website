import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/data";
import { telUrl, whatsappUrl } from "@/lib/seo";

export default function CtaBand({
  title = "Planning a project? Get a quote",
  text = `Tell us what you are building and visit our ${site.address.city} store, or send a message for plywood, laminate, veneer and louver options with honest advice.`,
  className = "",
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <section
      aria-label="Get in touch"
      className={`wood-grain relative overflow-hidden bg-ink bg-gradient-to-br from-ink via-stone-900 to-stone-800 py-16 text-white md:py-20 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-white md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-stone-300">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={telUrl()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-amber-500"
          >
            <Phone className="size-4" aria-hidden="true" /> Call {site.phone}
          </a>
          <a
            href={whatsappUrl(`Hi ${site.name}, I would like a quote.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-6 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-stone-200"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
