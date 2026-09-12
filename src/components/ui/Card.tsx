import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius)] border border-border bg-surface p-6 shadow-soft md:p-7",
        className,
      )}
    >
      {children}
    </article>
  );
}
