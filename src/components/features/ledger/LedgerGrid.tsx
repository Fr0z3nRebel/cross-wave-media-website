"use client";

import { motion } from "framer-motion";
import type { Article } from "@/types";
import { mockArticles } from "@/lib/data";

function LedgerCard({ article }: { article: Article }) {
  const primaryScripture = article.linkedScripture[0];

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-lg border border-muted-border bg-card shadow-sm transition-shadow hover:shadow-md dark:border-brand-gold/25"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
    >
      {/* Scripture highlight — teal in light, gold in dark */}
      {primaryScripture && (
        <div className="border-b border-muted-border bg-accent-teal/5 px-5 py-3 dark:bg-brand-gold/5">
          <p className="text-xs font-medium uppercase tracking-wider text-accent-teal dark:text-brand-gold">
            Linked Scripture
          </p>
          <p className="font-heading text-lg font-semibold text-accent-teal dark:text-brand-gold">
            {primaryScripture.reference}
          </p>
          {primaryScripture.text && (
            <p className="mt-1 line-clamp-2 text-sm italic text-muted-foreground">
              &ldquo;{primaryScripture.text}&rdquo;
            </p>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {/* Category + reading time — teal in light, gold in dark */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-md border border-accent-teal/30 bg-accent-teal/10 px-2.5 py-0.5 text-xs font-medium text-accent-teal transition-[filter] duration-300 group-hover:saturate-150 dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-gold"
            aria-label={`Category: ${article.category}`}
          >
            {article.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {article.readingTime} min read
          </span>
        </div>

        <h2 className="font-heading text-xl font-semibold leading-tight text-card-foreground">
          {article.title}
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {article.excerpt}
        </p>

        {/* Additional scripture refs if any */}
        {article.linkedScripture.length > 1 && (
          <p className="mt-3 text-xs text-accent-teal dark:text-brand-gold">
            +{article.linkedScripture.length - 1} more reference
            {article.linkedScripture.length > 2 ? "s" : ""}
          </p>
        )}

        {/* Author */}
        <footer className="mt-4 flex items-center gap-2 border-t border-muted-border pt-4">
          <div
            className="h-8 w-8 rounded-full bg-accent-teal/20 transition-[filter] duration-300 group-hover:saturate-150 dark:bg-brand-gold/25"
            aria-hidden
          />
          <span className="text-sm font-medium text-card-foreground">
            {article.author.name}
          </span>
        </footer>
      </div>
    </motion.article>
  );
}

export function LedgerGrid({ articles = mockArticles }: { articles?: Article[] }) {
  return (
    <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
      {articles.map((article) => (
        <div key={article.id} className="break-inside-avoid">
          <LedgerCard article={article} />
        </div>
      ))}
    </div>
  );
}
