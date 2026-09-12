import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border border-border bg-surface px-2.5 py-1 type-meta text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
