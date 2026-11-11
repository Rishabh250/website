import { Phone, MessageCircle, Mail } from "lucide-react";
import { site } from "@/lib/data";
import { telUrl, whatsappUrl } from "@/lib/seo";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";

export default function EnquiryButtons({
  productName,
  className = "",
  tone = "light",
}: {
  productName?: string;
  className?: string;
  /** "dark" adjusts the outline button for use on bg-ink bands. */
  tone?: "light" | "dark";
}) {
  const text = productName
    ? `Hi, I'd like a quote for ${productName}. Please share price and availability.`
    : "Hi, I'd like a quote for plywood, laminates and other interior materials.";
  const subject = encodeURIComponent(productName ? `Enquiry: ${productName}` : "Enquiry");
  const mail = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
  const label = productName ? ` about ${productName}` : "";
  const mailCls =
    tone === "dark"
      ? "border border-white/40 bg-transparent text-white hover:bg-white/10"
      : "border border-stone-400 bg-card text-foreground hover:bg-muted";
  const waCls =
    tone === "dark" ? "bg-white text-ink hover:bg-stone-200" : "bg-ink text-white hover:bg-stone-700";
  return (
    <div className={`grid grid-cols-2 gap-3 sm:flex sm:flex-wrap ${className}`}>
      <a href={telUrl()} aria-label={`Call us${label}`} className={`${base} bg-accent text-black hover:bg-amber-500`}>
        <Phone className="size-5" aria-hidden="true" /> Call
      </a>
      <a
        href={whatsappUrl(text)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp us${label} (opens in new tab)`}
        className={`${base} ${waCls}`}
      >
        <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp
      </a>
      <a href={mail} aria-label={`Email us${label}`} className={`${base} col-span-2 ${mailCls} sm:col-auto`}>
        <Mail className="size-5" aria-hidden="true" /> Email
      </a>
    </div>
  );
}
