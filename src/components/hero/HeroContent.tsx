import Link from "next/link";

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center px-4 py-0 lg:px-8">
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Digital Sanctuary
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        A premium Christian media platform bridging biblical truth and modern
        cultural discourse. Thoughtful analysis, resources, and community for
        intellectual and spiritual growth.
      </p>
      <p className="mt-3 max-w-xl text-base font-normal text-muted-foreground">
        For believers who crave thoughtful, biblically rooted commentary on
        today&apos;s headlines.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-normal text-muted-foreground">
        <li>Daily, biblically grounded reflections on current events</li>
        <li>Curated study resources for individuals and groups</li>
        <li>Prayerful community responses to cultural and personal burdens</li>
      </ul>
      <div className="mt-10 flex flex-wrap items-center gap-8">
        <Link
          href="/ledger"
          className="inline-flex items-center justify-center rounded-md bg-accent-teal px-6 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:bg-brand-gold dark:text-brand-navy dark:focus-visible:ring-brand-gold"
        >
          Explore The Ledger
        </Link>
        <Link
          href="/library"
          className="inline-flex items-center justify-center rounded-md border border-muted-border bg-background/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:border-brand-gold/40 dark:hover:bg-brand-gold/10 dark:focus-visible:ring-brand-gold"
        >
          Browse Resources
        </Link>
      </div>
    </div>
  );
}
