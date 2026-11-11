import { ClipboardList, Store, FileText, Truck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Share your requirement", text: "Tell us the materials, brands and quantities you need, or just describe the project." },
  { icon: Store, title: "Visit store & pick samples", text: "See shade cards and sample sheets in person and choose your finishes." },
  { icon: FileText, title: "Get a quote", text: "Receive a clear quote for your material list, for homes, contractors or projects." },
  { icon: Truck, title: "Delivery to site", text: "Confirmed materials are delivered to your site so work keeps moving." },
];

export default function HowItWorks() {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(({ icon: Icon, title, text }, i) => (
        <li
          key={title}
          style={{ "--i": i } as React.CSSProperties}
          className="reveal relative rounded-xl border border-white/15 bg-white/5 p-6 transition-transform duration-200 hover:-translate-y-1"
        >
          <span className="font-heading text-5xl font-semibold text-accent/90" aria-hidden="true">
            {i + 1}
          </span>
          <Icon className="mt-4 size-6 text-accent" aria-hidden="true" />
          <h3 className="font-heading mt-3 text-lg font-semibold text-white">
            <span className="sr-only">{`Step ${i + 1}: `}</span>
            {title}
          </h3>
          <p className="mt-2 text-sm text-white/80">{text}</p>
        </li>
      ))}
    </ol>
  );
}
