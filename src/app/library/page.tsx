import type { Metadata } from "next";
import { ResourceLibraryContainer } from "@/components/features/resources/ResourceLibraryContainer";

export const metadata: Metadata = {
  title: "Resource Library — Cross Wave Media",
  description:
    "Filterable library of books, worksheets, and guides for deeper study and small group discipleship.",
};

export default function LibraryPage() {
  return (
    <main className="bg-background">
      <section
        className="border-b border-muted-border py-12 dark:border-muted-border"
        aria-labelledby="library-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-teal dark:text-brand-gold">
            The Vault
          </p>
          <h1
            id="library-heading"
            className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Resource Library
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Curated books, worksheets, and guides designed to move you from
            informed to formed. Download ready-to-print PDFs for your small
            group, classroom, or family table.
          </p>
        </div>
      </section>

      <section
        className="py-12"
        aria-label="Filterable resource library"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ResourceLibraryContainer />
        </div>
      </section>
    </main>
  );
}

