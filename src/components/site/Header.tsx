import Link from "next/link";
import { primaryNav, siteName } from "@/lib/navigation";
import { MobileNav } from "@/components/site/MobileNav";
import { DesktopNav } from "@/components/site/DesktopNav";

export function Header() {
  return (
    <header className="theme-dark sticky top-0 z-50 border-b border-border bg-background">
      <div className="relative mx-auto flex h-16 w-full max-w-[var(--container)] items-center justify-between px-[var(--gutter)] md:h-[4.25rem]">
        <Link href="/" className="font-serif text-xl tracking-tight text-foreground">
          {siteName}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <DesktopNav items={primaryNav} />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
