import { cn } from "@/lib/utils";

type LedgerFilterValue = "all" | "news" | "analysis" | "devotional";

interface LedgerFilterBarProps {
  value: LedgerFilterValue;
  onChange: (value: LedgerFilterValue) => void;
  className?: string;
}

const FILTERS: { value: LedgerFilterValue; label: string }[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "news",
    label: "World News",
  },
  {
    value: "analysis",
    label: "Theological Analysis",
  },
  {
    value: "devotional",
    label: "Daily Devotionals",
  },
];

export function LedgerFilterBar({
  value,
  onChange,
  className,
}: LedgerFilterBarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-muted-border bg-card/80 p-1 text-xs shadow-sm dark:border-brand-gold/25 dark:bg-brand-navy/60",
        className,
      )}
      role="tablist"
      aria-label="Filter Ledger articles by type"
    >
      {FILTERS.map((filter) => {
        const isActive = filter.value === value;

        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold",
              isActive
                ? "bg-accent-teal text-background dark:bg-brand-gold dark:text-brand-navy"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}


