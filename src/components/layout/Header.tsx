"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

function BrandIcon() {
  return (
    <svg
      viewBox="0 0 119.31305 84.416116"
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(-46.302086,-64.029171)">
        <path
          d="m 69.783856,148.28247 c -0.109141,-0.1122 -0.198438,-11.3165 -0.198438,-24.89844 V 98.689586 H 57.943752 46.302086 V 93.265628 87.841669 H 57.943752 69.585418 V 75.93542 64.029171 h 5.423958 5.423958 V 75.93542 87.841669 h 11.641667 11.641669 v 5.423959 5.423958 H 92.075001 80.433334 v 20.239854 20.23985 l 2.589261,-1.34387 c 1.424094,-0.73913 3.656516,-2.13111 4.960938,-3.09329 3.417988,-2.5212 9.92629,-9.17843 14.801757,-15.14046 8.1982,-10.02528 11.80357,-13.80927 16.41972,-17.23318 4.62346,-3.429335 9.00781,-5.378144 14.20486,-6.313954 6.87714,-1.238338 13.5328,-0.193655 18.83511,2.95639 3.22962,1.918674 7.37323,6.487674 8.29588,9.147514 0.33133,0.95519 0.11901,1.08121 -0.80798,0.47955 -1.276,-0.82818 -4.48823,-1.4874 -7.24945,-1.48773 -3.12245,-3.9e-4 -4.63054,0.30801 -6.81248,1.39311 -3.44552,1.71349 -5.29252,3.55747 -6.90478,6.89346 -1.02567,2.12226 -1.59647,5.52587 -1.33527,7.96199 0.49994,4.66275 3.17211,8.86889 7.56076,11.90104 1.67169,1.15498 5.3051,2.66977 7.80521,3.25403 3.44757,0.80568 10.05839,0.64603 12.36927,-0.29871 0.74708,-0.30542 0.54419,0.30512 -0.47702,1.43548 -1.47666,1.63448 -4.26737,3.37527 -6.86516,4.28233 -2.00888,0.70144 -2.88724,0.85243 -5.61689,0.96558 -3.60443,0.1494 -5.36399,-0.10401 -8.67997,-1.25008 -7.73191,-2.6723 -13.19531,-8.31024 -15.26478,-15.75245 -0.66691,-2.39835 -0.91819,-7.47437 -0.48095,-9.71547 0.75556,-3.87266 2.97361,-8.12137 5.76057,-11.03448 0.91308,-0.95441 1.66014,-1.75473 1.66014,-1.77849 0,-0.0238 -0.68461,0.13258 -1.52135,0.34742 -2.28526,0.58674 -6.5174,2.71439 -9.18121,4.61571 -3.15982,2.25534 -9.17058,8.25371 -14.28749,14.25802 -12.797346,15.01675 -20.136158,20.65202 -30.043279,23.06938 -2.335682,0.56991 -9.98293,1.00757 -10.384895,0.59434 z"
          className="fill-[var(--accent-teal)] dark:fill-[var(--accent-gold)]"
        />
      </g>
    </svg>
  );
}

const navItems = [
  { href: "/ledger", label: "The Ledger" },
  { href: "/library", label: "Resource Library" },
  { href: "/community", label: "Stories & Prayers" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, supabase, loading } = useAuth();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    fetch("/api/me")
      .then((res) => res.json())
      .then((data: { profile?: { role?: string } }) => {
        setIsAdmin(data.profile?.role === "admin");
      })
      .catch(() => setIsAdmin(false));
  }, [user]);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-muted-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          aria-label="Cross Wave Media — Home"
        >
          <BrandIcon />
          <span>Cross Wave Media</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav
            aria-label="Main navigation"
            className="hidden md:block"
          >
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
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-accent-teal transition-colors hover:text-accent-teal/80 dark:text-brand-gold dark:hover:text-brand-gold/80"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ModeToggle />
            {!loading && !user && <AuthDialog />}
            {!loading && user && (
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-medium text-muted-foreground max-w-[10rem]">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full border border-muted-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-accent-teal/60 hover:bg-accent-teal/5 hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
                    "dark:hover:border-brand-gold/60 dark:hover:bg-brand-gold/10 dark:hover:text-brand-gold",
                  )}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            {!loading && !user && <AuthDialog />}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted-border bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:border-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Menu className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-muted-border bg-background md:hidden">
          <nav aria-label="Mobile main navigation">
            <ul className="flex flex-col gap-1 px-4 py-3">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="block rounded-md px-2 py-2 text-sm font-medium text-accent-teal transition-colors hover:bg-accent-teal/10 dark:text-brand-gold dark:hover:bg-brand-gold/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
