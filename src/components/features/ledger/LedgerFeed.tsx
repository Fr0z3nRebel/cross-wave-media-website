"use client";

import type { Article } from "@/types";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArticleCard } from "./ArticleCard";

interface LedgerFeedProps {
  articles: Article[];
  featuredCount?: number;
  onArticleInView?: (article: Article | null) => void;
}

function LedgerFeedItem({
  article,
  variant,
  onArticleInView,
  index,
}: {
  article: Article;
  variant: "featured" | "compact";
  onArticleInView?: (article: Article) => void;
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    // Prefer the article that is roughly centered in the viewport.
    margin: "-40% 0px -55% 0px",
    amount: 0.5,
  });

  useEffect(() => {
    if (!inView || !onArticleInView) return;
    onArticleInView(article);
  }, [article, inView, onArticleInView]);

  return (
    <ArticleCard
      ref={ref as any}
      article={article}
      variant={variant}
      index={index}
    />
  );
}

export function LedgerFeed({
  articles,
  featuredCount = 1,
  onArticleInView,
}: LedgerFeedProps) {
  const featured = articles.slice(0, featuredCount);
  const rest = articles.slice(featuredCount);

  return (
    <div className="space-y-8">
      {/* Featured articles — full width */}
      <div className="space-y-6">
        {featured.map((article, index) => (
          <LedgerFeedItem
            key={article.id}
            article={article}
            variant="compact"
            onArticleInView={onArticleInView ?? undefined}
            index={index}
          />
        ))}
      </div>

      {/* Remaining articles — two-column grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((article, idx) => (
            <LedgerFeedItem
              key={article.id}
              article={article}
              variant="compact"
              onArticleInView={onArticleInView ?? undefined}
              index={featured.length + idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}

