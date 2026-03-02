"use client";

import Link from "next/link";
import type { Article } from "@/types";
import { getMockArticles } from "@/lib/data";

interface ScriptureMarqueeProps {
  articles?: Article[];
}

export function ScriptureMarquee({ articles }: ScriptureMarqueeProps) {
  const source = articles ?? getMockArticles();

  const items = source
    .filter((article) => article.slug && article.linkedScripture.length > 0)
    .map((article) => ({
      slug: article.slug as string,
      headline: article.title,
      reference: article.linkedScripture[0].reference,
    }));

  if (items.length === 0) {
    return null;
  }

  const displayItems = [...items, ...items];

  return (
    <div
      className="group border-y border-muted-border bg-muted/70 py-3 dark:border-brand-navy/40 dark:bg-brand-navy"
      role="marquee"
      aria-live="polite"
      aria-label="Scripture-linked Ledger headlines"
    >
      <div className="marquee-container flex overflow-hidden">
        <div className="marquee-track flex shrink-0 animate-marquee gap-10 pr-10 [animation-play-state:running] group-hover:[animation-play-state:paused]">
          {displayItems.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              href={`/ledger/${item.slug}`}
              className="flex items-baseline gap-2 whitespace-nowrap text-xs sm:text-sm"
            >
              <span className="font-medium text-accent-teal">
                {item.headline}
              </span>
              <span className="text-brand-gold">
                {item.reference}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

