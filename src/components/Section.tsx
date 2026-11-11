import type { ElementType, ReactNode } from "react";

const tones = {
  default: { wrap: "", eyebrow: "text-primary-strong", title: "text-foreground", intro: "text-muted-foreground" },
  muted: { wrap: "bg-muted", eyebrow: "text-primary-strong", title: "text-foreground", intro: "text-muted-foreground" },
  dark: { wrap: "bg-ink", eyebrow: "text-amber-400", title: "text-white", intro: "text-stone-300" },
};

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  as: Tag = "section",
  tone = "default",
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  tone?: "default" | "muted" | "dark";
  align?: "left" | "center";
}) {
  const t = tones[tone];
  const center = align === "center";
  return (
    <Tag id={id} className={`py-16 md:py-24 ${t.wrap} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className={`mb-10 max-w-2xl md:mb-14 ${center ? "mx-auto text-center" : ""}`}>
          {eyebrow && (
            <p className={`mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] ${t.eyebrow} ${center ? "justify-center" : ""}`}>
              <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 className={`text-3xl md:text-4xl ${t.title}`}>{title}</h2>
          {intro && <p className={`mt-4 text-lg ${t.intro}`}>{intro}</p>}
        </header>
        {children}
      </div>
    </Tag>
  );
}
