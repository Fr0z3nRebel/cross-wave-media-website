import Link from "next/link";
import { Hero } from "@/components/hero";

const LEDGER_PREVIEW_CARDS = [
  {
    title: "Market Hits Record Highs",
    description:
      "Exploring Jesus' warning about storing up treasure on earth and what true wealth looks like in the kingdom of God.",
    scripture: "Matthew 6:19-21",
  },
  {
    title: "AI Regulation Debated",
    description:
      "Reflecting on trusting the Lord's wisdom in an age of rapid technological change and complex ethical decisions.",
    scripture: "Proverbs 3:5-6",
  },
  {
    title: "Global Tensions Rise",
    description:
      "Anchoring our anxieties in the peace of Christ while praying for nations in conflict.",
    scripture: "Philippians 4:6-7",
  },
] as const;

export default function Home() {
  return (
    <>
      <Hero />
      <section
        className="bg-background py-16"
        aria-label="Inside The Ledger"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Inside The Ledger
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Get a glimpse of how Cross Wave Media pairs real-world events with
            Scripture, reflection, and prayer.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {LEDGER_PREVIEW_CARDS.map((card) => (
              <li key={card.scripture}>
                <article className="flex h-full flex-col rounded-2xl border border-muted-border bg-card/80 p-5 shadow-sm dark:border-brand-gold/25 dark:bg-brand-navy/60">
                  <h3 className="font-heading text-lg font-semibold leading-tight text-card-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                  <p className="mt-4 text-sm font-medium italic text-accent-teal dark:text-brand-gold">
                    {card.scripture}
                  </p>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/ledger"
              className="inline-flex items-center gap-2 rounded-md border border-muted-border bg-muted/40 px-4 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:border-brand-gold/30 dark:bg-brand-navy/40 dark:hover:bg-brand-navy/60 dark:focus-visible:ring-brand-gold"
            >
              Read more in The Ledger
            </Link>
          </p>
        </div>
      </section>
      <section
        className="bg-background py-8"
        aria-label="Resource Library and Stories & Prayers preview"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                From the Resource Library
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Deepen your study with curated guides, reading plans, and tools
                for individuals and groups.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Study Guide: Sermon on the Mount</li>
                <li>Reading Plan: Navigating Cultural Conflict</li>
                <li>Leader Toolkit: Small Group Discussion Starters</li>
              </ul>
              <Link
                href="/library"
                className="mt-4 inline-flex items-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold"
              >
                Browse the Resource Library →
              </Link>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                Stories & Prayers
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Share and carry one another&apos;s burdens through testimonies
                and intercession.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Testimony: Finding peace after job loss</li>
                <li>Prayer Thread: For churches in transition</li>
                <li>Story: Hope in chronic illness</li>
              </ul>
              <Link
                href="/community"
                className="mt-4 inline-flex items-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold"
              >
                Visit Stories & Prayers →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
