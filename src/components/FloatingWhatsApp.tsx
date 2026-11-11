import { MessageCircle } from "lucide-react";
import { site } from "@/lib/data";
import { whatsappUrl } from "@/lib/seo";

// Pages with a fixed mobile bottom bar: put data-sticky-bar on it; globals.css lifts this button above it.
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(`Hi ${site.name}, I have an enquiry.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="floating-wa fixed right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#0a7a4f] text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#086a44] hover:shadow-xl"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
