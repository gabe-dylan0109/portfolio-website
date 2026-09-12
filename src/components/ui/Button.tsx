import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent",
  ghost: "text-foreground hover:bg-surface",
} as const;

const sizes = {
  sm: "min-h-10 px-3.5 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClassName(
  variant: Variant,
  size: Size,
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: ButtonProps) {
  const classes = buttonClassName(variant, size, className);

  if (href) {
    const linkProps = props as Omit<
      ButtonAsLink,
      "href" | "children" | "className" | "variant" | "size"
    >;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as Omit<
    ButtonAsButton,
    "href" | "children" | "className" | "variant" | "size"
  >;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
