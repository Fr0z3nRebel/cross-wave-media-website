"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PrayerRequest } from "@/types";
import { cn } from "@/lib/utils";

interface PrayerCardProps {
  request: PrayerRequest;
}

export function PrayerCard({ request }: PrayerCardProps) {
  const [supportCount, setSupportCount] = useState(request.supportCount);
  const [isPulsing, setIsPulsing] = useState(false);

  const authorLabel = useMemo(() => {
    if (request.isAnonymized) {
      return "Anonymous";
    }

    return request.authorName;
  }, [request.authorName, request.isAnonymized]);

  const createdLabel = useMemo(() => {
    if (!request.createdAt) return "";

    const date = new Date(request.createdAt);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [request.createdAt]);

  function handlePrayedClick() {
    setSupportCount((prev) => prev + 1);
    setIsPulsing(true);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-3xl border border-muted-border bg-card/95 p-5 shadow-lg backdrop-blur-xl",
        "dark:border-brand-gold/20 dark:bg-brand-navy/60 dark:shadow-[0_20px_50px_rgba(15,23,42,0.7)]",
        // Teal glow in light mode, gold glow in dark mode
        "before:pointer-events-none before:absolute before:inset-px before:-z-10 before:rounded-[1.7rem] before:bg-gradient-to-br before:from-accent-teal/0 before:via-accent-teal/12 before:to-accent-teal/0 before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500",
        "dark:before:from-brand-gold/0 dark:before:via-brand-gold/25 dark:before:to-brand-gold/5",
        "hover:before:opacity-100 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_18px_45px_rgba(15,23,42,0.35)] dark:hover:shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_20px_50px_rgba(15,23,42,0.7)]",
      )}
      aria-label={`Prayer request from ${authorLabel}`}
    >
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/40 bg-accent-teal/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-accent-teal dark:border-brand-gold/30 dark:bg-brand-navy/80 dark:text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-teal shadow-[0_0_0_4px_rgba(45,212,191,0.35)] dark:bg-brand-gold dark:shadow-[0_0_0_4px_rgba(250,204,21,0.35)]" />
              Prayer Request
            </div>
            {createdLabel && (
              <p className="text-[0.68rem] text-muted-foreground">
                {createdLabel}
              </p>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {request.content}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col gap-0.5">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Requested by
            </p>
            <p className="text-sm font-medium text-foreground">
              {authorLabel}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={supportCount}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground"
              >
                Heard &amp; Prayed ·{" "}
                <span className="font-semibold text-foreground">
                  {supportCount}
                </span>
              </motion.span>
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={handlePrayedClick}
              whileTap={{ scale: 0.94 }}
              animate={
                isPulsing
                  ? { scale: [1, 1.06, 1], boxShadow: ["0 0 0 0 rgba(250,204,21,0.5)", "0 0 0 12px rgba(250,204,21,0)", "0 0 0 0 rgba(250,204,21,0)"] }
                  : {}
              }
              transition={{ duration: 0.45, ease: "easeOut" }}
              onAnimationComplete={() => setIsPulsing(false)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-4 py-1.5 text-xs font-medium text-accent-teal shadow-[0_0_0_1px_rgba(15,23,42,0.3)] backdrop-blur-md transition-all duration-300 hover:bg-accent-teal/10 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-paper dark:shadow-[0_0_0_1px_rgba(250,204,21,0.3)] dark:hover:bg-brand-gold/20 dark:hover:shadow-[0_0_0_1px_rgba(250,204,21,0.5)] dark:focus-visible:ring-brand-gold dark:focus-visible:ring-offset-brand-navy"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-teal dark:bg-brand-gold" />
              I Prayed for This
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

