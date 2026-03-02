"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/types";
import { mockArticles } from "@/lib/data";
import { ScriptureSidebar } from "./ScriptureSidebar";
import { LedgerFilterBar } from "./FilterBar";
import { LedgerFeed } from "./LedgerFeed";
import { ReadingProgressBar } from "./ReadingProgressBar";

type LedgerFilterValue = "all" | "news" | "analysis" | "devotional";

interface LedgerLayoutProps {
  articles?: Article[];
}

const CATEGORY_FROM_FILTER: Record<Exclude<LedgerFilterValue, "all">, Article["category"]> =
  {
    news: "News",
    analysis: "Analysis",
    devotional: "Devotional",
  };

export function LedgerLayout({
  articles: initialArticles = mockArticles,
}: LedgerLayoutProps) {
  const [filter, setFilter] = useState<LedgerFilterValue>("all");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles = initialArticles;

  const filteredArticles = useMemo(() => {
    if (filter === "all") return articles;

    const category = CATEGORY_FROM_FILTER[filter];
    return articles.filter((article) => article.category === category);
  }, [articles, filter]);

  return (
    <>
      <ReadingProgressBar />
      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-label="The Ledger — Scripture-linked articles"
      >
        <header className="mb-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            The Ledger
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            <span className="text-accent-teal dark:text-brand-gold">
              Scripture-linked
            </span>{" "}
            analysis for a complex world
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Explore world events, theological commentary, and daily devotionals
            curated to help you see the currents of culture through the steady
            clarity of Scripture.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)] lg:items-start">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <LedgerFilterBar value={filter} onChange={setFilter} />
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredArticles.length}
                </span>{" "}
                article{filteredArticles.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="mt-6">
              <LedgerFeed
                articles={filteredArticles}
                onArticleInView={setActiveArticle}
              />
            </div>
          </div>

          <div className="lg:pl-4">
            <ScriptureSidebar activeArticle={activeArticle} />
          </div>
        </div>
      </section>
    </>
  );
}

