import Link from "next/link";
import { primaryNav, siteName } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark border-t border-border bg-background">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
        <div>
          <p className="font-serif text-2xl text-foreground">{siteName}</p>
        </div>
        <nav aria-label="Footer">
          <p className="type-eyebrow mb-4">Navigation</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-small text-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-border">
        <Container className="py-5">
          <p className="type-meta">
            © {year} {siteName}
          </p>
        </Container>
      </div>
    </footer>
  );
}
