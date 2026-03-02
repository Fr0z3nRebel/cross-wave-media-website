import Link from "next/link";
import { WaveDivider } from "./WaveDivider";

const footerLinks = [
  { href: "/ledger", label: "The Ledger" },
  { href: "/library", label: "Resource Library" },
  { href: "/community", label: "Stories & Prayers" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-muted-border bg-muted/30"
      role="contentinfo"
    >
      <WaveDivider />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} Cross Wave Media. All rights reserved.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
