import type { Article } from "@/types";

interface TheologicalContextCalloutProps {
  article: Article;
}

export function TheologicalContextCallout({
  article,
}: TheologicalContextCalloutProps) {
  const fallback =
    "This piece invites you to consider how this theme fits within the wider story of Scripture and the character of God.";

  return (
    <section className="mx-auto mt-12 max-w-3xl rounded-2xl border-2 border-accent-teal/60 bg-brand-paper/50 px-6 py-5 text-sm leading-relaxed text-foreground shadow-sm dark:border-brand-gold/70 dark:bg-slate-900/60">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Theological Context
      </p>
      <h2 className="mt-1 font-heading text-lg font-semibold text-foreground">
        Reading this through a doctrinal lens
      </h2>
      <p className="mt-3">
        {fallback} In particular, it touches on the lived implications of{" "}
        <span className="font-semibold lowercase">
          {article.category.toLowerCase()}
        </span>{" "}
        for everyday discipleship.
      </p>
    </section>
  );
}

