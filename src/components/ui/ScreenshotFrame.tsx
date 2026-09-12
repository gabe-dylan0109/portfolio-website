import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ScreenshotFrameProps = {
  children?: ReactNode;
  caption?: string;
  metadata?: string;
  className?: string;
};

export function ScreenshotFrame({
  children,
  caption,
  metadata,
  className,
}: ScreenshotFrameProps) {
  return (
    <figure className={cn("max-w-3xl", className)}>
      <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-soft">
        <div className="aspect-video bg-[color-mix(in_srgb,var(--foreground)_4%,var(--surface))]">
          {children}
        </div>
      </div>
      {caption || metadata ? (
        <figcaption className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          {caption ? <p className="type-small text-foreground">{caption}</p> : null}
          {metadata ? <p className="type-meta">{metadata}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
