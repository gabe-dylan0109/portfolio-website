import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {eyebrow ? <p className="type-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="type-h2">{title}</h2>
      {description ? (
        <div className="type-body-lg mt-4 text-muted">{description}</div>
      ) : null}
    </header>
  );
}
