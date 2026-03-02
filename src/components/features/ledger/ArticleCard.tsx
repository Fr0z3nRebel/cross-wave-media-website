"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { Article } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ArticleCardVariant = "featured" | "compact";

interface ArticleCardProps {
  article: Article;
  variant?: ArticleCardVariant;
  className?: string;
  index?: number;
}

export const ArticleCard = forwardRef<HTMLElement, ArticleCardProps>(
  ({ article, variant = "compact", className, index }, ref) => {
    const primaryScripture = article.linkedScripture[0];
    const isFeatured = variant === "featured";
    const delay = typeof index === "number" ? index * 0.06 : 0;

    const Container = motion.article;

    return (
      <Container
        ref={ref as any}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-muted-border/70 bg-white/95 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-brand-gold/25 dark:bg-slate-950/70 dark:shadow-[0_18px_60px_rgba(15,23,42,0.85)] dark:backdrop-blur-xl",
          isFeatured && "md:flex-row",
          className,
        )}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{
          duration: 0.45,
          delay,
          ease: [0.22, 0.61, 0.36, 1],
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        {/* Scripture highlight — teal in light, gold in dark */}
        {primaryScripture && (
          <div className="border-b border-muted-border/70 bg-gradient-to-r from-accent-teal/10 via-transparent to-transparent px-5 py-3 md:border-b-0 md:border-r md:px-4 md:py-4 dark:from-brand-gold/10">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-accent-teal dark:text-brand-gold">
              Linked Scripture
            </p>
            <div className="mt-2 inline-flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded-full border border-accent-teal/40 bg-accent-teal/10 px-3 py-1 text-xs font-semibold text-accent-teal shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 group-hover:bg-accent-teal/15 group-hover:shadow-[0_0_18px_rgba(45,212,191,0.45)] dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-gold dark:group-hover:bg-brand-gold/15 dark:group-hover:shadow-[0_0_18px_rgba(234,179,8,0.45)]"
              >
                {primaryScripture.reference}
              </span>
              {article.linkedScripture.length > 1 && (
                <span className="text-[0.7rem] font-medium text-accent-teal dark:text-brand-gold/80">
                  +{article.linkedScripture.length - 1} more
                </span>
              )}
            </div>
            {primaryScripture.text && (
              <p className="mt-2 line-clamp-2 text-xs italic text-muted-foreground font-serif">
                &ldquo;{primaryScripture.text}&rdquo;
              </p>
            )}
          </div>
        )}

        <div className={cn("flex flex-1 flex-col p-5", isFeatured && "md:p-6")}>
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

          {article.imageUrl && (
            <div
              className={cn(
                "relative mt-3 overflow-hidden rounded-xl border border-muted-border/60 bg-muted/40",
                "aspect-[16/9]",
              )}
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes={isFeatured ? "(min-width: 768px) 640px, 100vw" : "320px"}
                priority={isFeatured}
              />
            </div>
          )}

          <h2
            className={cn(
              "font-heading font-semibold leading-tight text-card-foreground",
              isFeatured ? "text-xl sm:text-2xl" : "text-lg",
            )}
          >
            {article.title}
          </h2>
          <p
            className={cn(
              "mt-2 text-sm text-muted-foreground",
              isFeatured ? "line-clamp-4" : "line-clamp-2 flex-1",
            )}
          >
            {article.excerpt}
          </p>

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
      </Container>
    );
  },
);

ArticleCard.displayName = "ArticleCard";

