"use client";

import Link from "next/link";

export interface MarqueeItem {
  headline: string;
  reference: string;
}

export interface ScriptureToWorldMarqueeProps {
  items?: MarqueeItem[];
}

const DEFAULT_ITEMS: MarqueeItem[] = [
  { headline: "Market Hits Record Highs", reference: "Matthew 6:19-21" },
  { headline: "AI Regulation Debated", reference: "Proverbs 3:5-6" },
  { headline: "Global Tensions Rise", reference: "Philippians 4:6-7" },
  { headline: "Climate Summit Concludes", reference: "Genesis 1:26-28" },
  { headline: "Tech Giants Face Scrutiny", reference: "1 Timothy 6:9-10" },
  { headline: "Healthcare Reform Advances", reference: "James 5:14-15" },
  { headline: "Local Church Grows", reference: "Acts 2:42-47" },
  { headline: "Social Media Debate", reference: "Psalm 141:3" },
  { headline: "Election Season Heats Up", reference: "Romans 13:1-2" },
  { headline: "Natural Disaster Response", reference: "Psalm 46:1" },
  { headline: "Education Policy Shifts", reference: "Proverbs 22:6" },
  { headline: "Housing Affordability Crisis", reference: "Isaiah 65:21-22" },
];

export function ScriptureToWorldMarquee({
  items = DEFAULT_ITEMS,
}: ScriptureToWorldMarqueeProps) {
  const displayItems = [...items, ...items];

  return (
    <div
      className="group border-y border-muted-border bg-muted/70 py-2 dark:border-brand-navy/40 dark:bg-brand-navy"
      role="marquee"
      aria-live="polite"
      aria-label="Scripture-to-world headlines"
    >
      <p className="mb-1.5 m-0 text-left text-sm font-semibold tracking-wide text-muted-foreground">
        From Today&apos;s Ledger
      </p>
      <div className="marquee-container flex overflow-hidden">
        <div className="marquee-track flex shrink-0 animate-marquee gap-12 pr-12 [animation-play-state:running] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {displayItems.map((item, i) => (
            <Link
              key={`${item.reference}-${i}`}
              href="/ledger"
              className="whitespace-nowrap text-sm text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold"
            >
              <span className="font-medium text-foreground">
                {item.headline}
              </span>
              <span className="mx-2">—</span>
              <span className="italic text-accent-teal dark:text-brand-gold">
                {item.reference}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
