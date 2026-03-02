"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ResourceSkeletonProps {
  /**
   * Approximate number of placeholder cards to render.
   */
  count?: number;
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function ResourceSkeleton({ count = 6 }: ResourceSkeletonProps) {
  return (
    <motion.div
      layout
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
      )}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div key={index} variants={itemVariants}>
          <div className="flex h-full flex-col justify-between rounded-2xl border border-muted-border bg-card/80 p-5 shadow-sm backdrop-blur-sm dark:border-brand-gold/20 dark:bg-brand-navy/60">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

