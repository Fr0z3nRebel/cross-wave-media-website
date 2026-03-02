"use client";

import type { Article } from "@/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface ScriptureSidebarProps {
  activeArticle: Article | null;
  className?: string;
}

export function ScriptureSidebar({
  activeArticle,
  className,
}: ScriptureSidebarProps) {
  const hasScripture = !!activeArticle && activeArticle.linkedScripture.length > 0;

  const handleCopyVerse = async (reference: { reference: string; text?: string }) => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    const text = reference.text
      ? `${reference.reference} — ${reference.text}`
      : reference.reference;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Swallow errors silently; copying is a progressive enhancement.
    }
  };

  return (
    <aside
      className={cn(
        "rounded-2xl border border-muted-border bg-card/95 p-5 shadow-lg lg:sticky lg:top-24",
        "dark:border-brand-gold/25 dark:bg-brand-navy/80 dark:shadow-[0_18px_45px_rgba(15,23,42,0.9)] dark:backdrop-blur-xl",
        className,
      )}
      aria-label="Key verses for the current article"
    >
      <h2 className="font-heading text-lg font-semibold text-card-foreground">
        Key Verses
      </h2>

      <div
        className="mt-3 space-y-4 text-sm text-muted-foreground"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {!hasScripture && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <p>
                Hover or focus an article in{" "}
                <span className="font-semibold text-accent-teal dark:text-brand-gold">
                  The Ledger
                </span>{" "}
                to see its linked passages here.
              </p>
            </motion.div>
          )}

          {hasScripture && activeArticle && (
            <motion.div
              key={activeArticle.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {activeArticle.category} · {activeArticle.readingTime} min read
              </p>
              <p className="mt-1 font-heading text-base font-semibold text-card-foreground">
                {activeArticle.title}
              </p>

              <ul className="mt-3 space-y-3">
                {activeArticle.linkedScripture.map((ref) => (
                  <li
                    key={ref.reference}
                    className="rounded-lg border border-muted-border/70 bg-white/70 p-3 shadow-sm dark:bg-slate-950/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-heading text-sm font-semibold text-brand-gold">
                          {ref.reference}
                        </p>
                        {ref.text && (
                          <p className="mt-1 text-sm italic leading-relaxed text-muted-foreground font-serif">
                            &ldquo;{ref.text}&rdquo;
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVerse(ref)}
                        className="inline-flex items-center rounded-full border border-muted-border/70 bg-background/70 px-2.5 py-1 text-[0.65rem] font-medium text-muted-foreground transition-colors hover:border-accent-teal hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

