"use client";

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
];

export function ScriptureToWorldMarquee({
  items = DEFAULT_ITEMS,
}: ScriptureToWorldMarqueeProps) {
  const displayItems = [...items, ...items];

  return (
    <div
      className="group border-y border-muted-border bg-muted/70 py-4 dark:border-brand-navy/40 dark:bg-brand-navy"
      role="marquee"
      aria-live="polite"
      aria-label="Scripture-to-world headlines"
    >
      <div className="marquee-container flex overflow-hidden">
        <div className="marquee-track flex shrink-0 animate-marquee gap-12 pr-12 [animation-play-state:running] group-hover:[animation-play-state:paused]">
          {displayItems.map((item, i) => (
            <span
              key={`${item.reference}-${i}`}
              className="whitespace-nowrap text-sm text-muted-foreground"
            >
              <span className="font-medium text-accent-teal dark:text-foreground">
                {item.headline}
              </span>
              <span className="mx-2">—</span>
              <span className="italic text-accent-teal dark:text-brand-gold">
                {item.reference}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
