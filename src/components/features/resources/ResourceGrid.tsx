"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type ResourceCategory = "book" | "worksheet" | "guide";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationLabel?: string;
  scriptureFocus?: string;
  pdfUrl?: string;
}

const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: "book-cross-formed",
    title: "Cross-Formed Citizenship",
    description:
      "A six-session study on living as a faithful presence in polarized public life.",
    category: "book",
    level: "Intermediate",
    durationLabel: "6-week cohort",
    scriptureFocus: "Jeremiah 29, Matthew 5",
  },
  {
    id: "worksheet-news-examen",
    title: "News Examen Worksheet",
    description:
      "Guided reflection for processing the headlines with Scripture, prayer, and community.",
    category: "worksheet",
    level: "Beginner",
    durationLabel: "15–20 minutes",
    scriptureFocus: "Philippians 4",
  },
  {
    id: "guide-small-group",
    title: "Small Group Facilitation Guide",
    description:
      "A facilitator’s playbook for leading conversations that are honest, hopeful, and grounded in the Word.",
    category: "guide",
    level: "Advanced",
    durationLabel: "Leader resource",
  },
  {
    id: "book-public-theology",
    title: "Blueprints for Public Theology",
    description:
      "A deep dive into the biblical architecture behind Cross Wave’s editorial framework.",
    category: "book",
    level: "Advanced",
    durationLabel: "8-chapter reader",
    scriptureFocus: "Romans 12, Micah 6",
  },
  {
    id: "worksheet-prayer-mapping",
    title: "Prayer Mapping Worksheet",
    description:
      "Map global headlines to intercession themes for your church or small group.",
    category: "worksheet",
    level: "Intermediate",
    durationLabel: "30 minutes",
  },
  {
    id: "guide-family-table",
    title: "The Family Table Guide",
    description:
      "Practical rhythms for talking about culture, news, and faith around the dinner table.",
    category: "guide",
    level: "Beginner",
    durationLabel: "Family edition",
  },
];

type FilterValue = "all" | ResourceCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "book", label: "Books" },
  { value: "worksheet", label: "Worksheets" },
  { value: "guide", label: "Guides" },
];

function categoryDisplay(category: ResourceCategory) {
  switch (category) {
    case "book":
      return "Book";
    case "worksheet":
      return "Worksheet";
    case "guide":
      return "Guide";
  }
}

interface ResourceGridProps {
  resources?: ResourceItem[];
}

export function ResourceGrid({ resources = MOCK_RESOURCES }: ResourceGridProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredResources = useMemo(
    () =>
      filter === "all"
        ? resources
        : resources.filter((item) => item.category === filter),
    [filter, resources],
  );

  return (
    <section className="space-y-6">
      {/* Category filter — shadcn-style pill buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Resources
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Filter the vault by format to find the right study aid.
          </p>
        </div>

        <div
          className="inline-flex items-center rounded-full border border-muted-border bg-card/80 p-1 text-xs shadow-sm"
          role="tablist"
          aria-label="Filter resources by format"
        >
          {FILTERS.map((item) => {
            const isActive = item.value === filter;

            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold",
                  isActive
                    ? "bg-accent-teal text-background dark:bg-brand-gold dark:text-brand-navy"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured grid with framer-motion layout animations */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredResources.map((resource) => (
            <motion.article
              key={resource.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={cn(
                "group relative flex h-full flex-col justify-between rounded-2xl border border-muted-border bg-card/80 p-5 shadow-sm backdrop-blur-md transition-all duration-300",
                "dark:border-brand-gold/20 dark:bg-brand-navy/60 dark:shadow-[0_18px_45px_rgba(15,23,42,0.7)]",
                "before:pointer-events-none before:absolute before:inset-px before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-accent-teal/0 before:via-accent-teal/10 before:to-accent-teal/0 before:opacity-0 before:blur-xl before:transition-opacity before:duration-300",
                "dark:before:from-brand-gold/0 dark:before:via-brand-gold/12 dark:before:to-brand-gold/0",
                "hover:before:opacity-100",
                "hover:shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_18px_45px_rgba(15,23,42,0.45)] dark:hover:shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_18px_45px_rgba(15,23,42,0.7)]",
              )}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center rounded-full border border-accent-teal/40 bg-accent-teal/10 px-2 py-0.5 font-medium text-accent-teal dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-gold">
                        {categoryDisplay(resource.category)}
                      </span>
                      {resource.level && (
                        <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                          {resource.level}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold leading-snug text-card-foreground">
                      {resource.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>

                  {/* Glassmorphic hover download affordance */}
                  <motion.button
                    type="button"
                    aria-label={`Download PDF for ${resource.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-background/40 text-accent-teal shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur-md opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(45,212,191,0.5)] dark:text-brand-gold dark:group-hover:shadow-[0_0_0_1px_rgba(250,204,21,0.5)]"
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Download className="h-4 w-4" aria-hidden />
                  </motion.button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                  <div className="flex flex-col gap-0.5">
                    {resource.durationLabel && (
                      <span className="font-medium text-card-foreground">
                        {resource.durationLabel}
                      </span>
                    )}
                    {resource.scriptureFocus && (
                      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-accent-teal dark:text-brand-gold">
                        {resource.scriptureFocus}
                      </span>
                    )}
                  </div>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Downloadable PDF
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

