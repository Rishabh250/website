import type { ElementType, ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  as: Tag = "section",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-2xl md:mb-14">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-strong">{eyebrow}</p>
          )}
          <h2 className="text-3xl text-foreground md:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
        </header>
        {children}
      </div>
    </Tag>
  );
}
