import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section
        className="bg-background py-24"
        aria-label="Featured content"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Coming Soon
          </h2>
          <p className="mt-2 text-muted-foreground">
            The Ledger preview and feature grid will appear here.
          </p>
        </div>
      </section>
    </>
  );
}
