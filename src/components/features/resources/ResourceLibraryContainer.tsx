"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/data/mockResources";
import { getResources } from "@/lib/data/mockResources";
import { ResourceCard } from "./ResourceCard";
import { ResourceSkeleton } from "./ResourceSkeleton";
import { ResourceEmptyState } from "./ResourceEmptyState";

type ResourceCategoryFilter = "all" | "books" | "worksheets" | "guides";

const CATEGORY_TO_TYPE: Record<Exclude<ResourceCategoryFilter, "all">, Resource["type"]> =
  {
    books: "Book",
    guides: "Guide",
    worksheets: "PDF",
  };

export function ResourceLibraryContainer() {
  const [activeCategory, setActiveCategory] =
    useState<ResourceCategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resources = useMemo(() => getResources(), []);

  const filteredResources = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all"
          ? true
          : resource.type === CATEGORY_TO_TYPE[activeCategory];

      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      const inTitle = resource.title.toLowerCase().includes(normalizedQuery);
      const inDescription = resource.description
        .toLowerCase()
        .includes(normalizedQuery);

      return inTitle || inDescription;
    });
  }, [resources, activeCategory, searchQuery]);

  const showEmptyState = filteredResources.length === 0;

  return (
    <section className="space-y-6" aria-label="Filterable resource library">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs
          value={activeCategory}
          onValueChange={(value) =>
            setActiveCategory(value as ResourceCategoryFilter)
          }
        >
          <TabsList aria-label="Filter resources by category">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-full max-w-xs md:max-w-sm">
          <label className="block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Search resources
          </label>
          <div className="mt-2 relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground/70">
              <Search className="h-4 w-4" aria-hidden />
            </span>
            <Input
              placeholder="Search titles and descriptions..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-9"
              aria-label="Search resources"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {filteredResources.length}
        </span>{" "}
        resource{filteredResources.length === 1 ? "" : "s"}
      </p>

      {/* Empty state when filters/search yield no results */}
      {showEmptyState ? (
        <ResourceEmptyState
          onClearFilters={() => {
            setActiveCategory("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <LayoutGroup>
          <motion.div
            layout
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className={cn(
              "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            <AnimatePresence>
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -8 },
                  }}
                >
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      )}
    </section>
  );
}

