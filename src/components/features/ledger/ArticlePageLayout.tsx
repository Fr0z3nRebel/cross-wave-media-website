import Image from "next/image";
import type { Article } from "@/types";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { ArticleBody } from "./ArticleBody";
import { ArticleSocialBar } from "./ArticleSocialBar";
import { TheologicalContextCallout } from "./TheologicalContextCallout";

interface ArticlePageLayoutProps {
  article: Article;
}

export function ArticlePageLayout({ article }: ArticlePageLayoutProps) {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-3xl bg-card shadow-md">
        {article.imageUrl && (
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="relative z-10 space-y-3 px-6 pb-8 pt-6 sm:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center rounded-md border border-accent-teal/30 bg-accent-teal/10 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-teal dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-gold">
              {article.category}
            </span>
            <span>{article.readingTime} min read</span>
          </div>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-7 w-7 rounded-full bg-accent-teal/20 dark:bg-brand-gold/25" aria-hidden />
            <span className="font-medium text-foreground">
              {article.author.name}
            </span>
          </div>
        </div>

        <WaveDivider placement="bottom" />
      </header>

      <section className="relative z-10 mt-10 space-y-10">
        <ArticleSocialBar article={article} />
        <div className="w-full rounded-3xl border-2 border-accent-teal/40 bg-card px-6 py-5 shadow-md dark:border-brand-gold/40">
          <ArticleBody article={article} />
        </div>
        <TheologicalContextCallout article={article} />
      </section>
    </article>
  );
}

