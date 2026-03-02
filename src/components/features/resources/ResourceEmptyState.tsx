"use client";

import { cn } from "@/lib/utils";

interface ResourceEmptyStateProps {
  onClearFilters: () => void;
}

export function ResourceEmptyState({
  onClearFilters,
}: ResourceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-border bg-card/60 px-6 py-12 text-center dark:border-brand-gold/25 dark:bg-brand-navy/40">
      <p className="text-sm font-semibold text-accent-teal dark:text-brand-gold">
        No resources match your current filters.
      </p>
      <p className="mt-2 max-w-md text-xs text-muted-foreground">
        Try widening your search terms, switching categories, or clearing
        filters to see the full vault again.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className={cn(
          "mt-6 inline-flex items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-1.5 text-xs font-semibold text-accent-teal shadow-sm transition-colors",
          "hover:bg-accent-teal hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
          "dark:border-brand-gold/60 dark:bg-brand-gold/10 dark:text-brand-paper dark:hover:bg-brand-gold dark:focus-visible:ring-brand-gold",
        )}
      >
        Clear filters
      </button>
    </div>
  );
}

