"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/cn";

type DesktopNavProps = {
  items: readonly NavItem[];
};

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-7">
      {items.map((item) => {
        const current = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "type-small py-1 transition-colors duration-200",
                current ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
