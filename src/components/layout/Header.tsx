import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";

const navItems = [
  { href: "/ledger", label: "The Ledger" },
  { href: "/library", label: "Resource Library" },
  { href: "/community", label: "Stories & Prayers" },
] as const;

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-muted-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          aria-label="Cross Wave Media — Home"
        >
          Cross Wave Media
        </Link>
        <div className="flex flex-1 items-center justify-end gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
