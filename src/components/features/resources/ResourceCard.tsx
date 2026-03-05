 "use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/data/mockResources";

interface ResourceCardProps {
  resource: Resource;
}

function formatTypeLabel(type: Resource["type"]) {
  switch (type) {
    case "Book":
      return "Book";
    case "Guide":
      return "Guide";
    case "PDF":
      return "Worksheet PDF";
    default:
      return type;
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <motion.article
      layout
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-2xl border border-muted-border bg-card/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300",
        "dark:border-brand-gold/20 dark:bg-brand-navy/60 dark:shadow-[0_18px_45px_rgba(15,23,42,0.7)]",
        "before:pointer-events-none before:absolute before:inset-px before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-accent-teal/0 before:via-accent-teal/8 before:to-accent-teal/0 before:opacity-0 before:blur-xl before:transition-opacity before:duration-300",
        "dark:before:from-brand-gold/0 dark:before:via-brand-gold/12 dark:before:to-brand-gold/0",
        "hover:before:opacity-100 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_18px_45px_rgba(15,23,42,0.4)] dark:hover:shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_18px_45px_rgba(15,23,42,0.7)]",
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/library/${resource.id}`}
            className="block flex-1 min-w-0 focus-visible:outline-none"
          >
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center rounded-full border border-accent-teal/40 bg-accent-teal/10 px-2 py-0.5 font-medium text-accent-teal dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-gold">
                  {formatTypeLabel(resource.type)}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold leading-snug text-card-foreground">
                {resource.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                {resource.description}
              </p>
            </div>
          </Link>

          <motion.a
            href={resource.downloadUrl}
            aria-label={`Download ${resource.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-background/40 text-accent-teal shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur-md opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(45,212,191,0.5)] dark:text-brand-gold dark:group-hover:shadow-[0_0_0_1px_rgba(250,204,21,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download className="h-4 w-4" aria-hidden />
          </motion.a>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Downloadable</span>
          <span className="text-accent-teal dark:text-brand-gold/80">
            The Vault
          </span>
        </div>
      </div>
    </motion.article>
  );
}



