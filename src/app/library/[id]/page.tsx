import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Resource } from "@/lib/data/mockResources";
import { getResources } from "@/lib/data/mockResources";
import { getResourceById } from "@/lib/resources";
import { MarkdownBody } from "@/components/markdown/MarkdownBody";
import { cn } from "@/lib/utils";

interface ResourcePageProps {
  params: Promise<{ id: string }>;
}

type MarkdownContent = {
  format: "markdown";
  markdown: string;
};

async function resolveResource(id: string): Promise<Resource | null> {
  const dbResource = await getResourceById(id);
  if (dbResource) return dbResource;

  const mock = getResources().find((r) => r.id === id);
  return mock ?? null;
}

function getMarkdown(resource: Resource): string | null {
  const content = resource.content as unknown;
  if (
    content &&
    typeof content === "object" &&
    (content as MarkdownContent).format === "markdown" &&
    typeof (content as MarkdownContent).markdown === "string"
  ) {
    return (content as MarkdownContent).markdown;
  }
  return null;
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { id } = await params;
  const resource = await resolveResource(id);

  if (!resource) {
    return {
      title: "Resource not found — Resource Library",
    };
  }

  const title = `${resource.title} — Resource Library`;
  const description = resource.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;
  const resource = await resolveResource(id);

  if (!resource) {
    notFound();
  }

  const markdown = getMarkdown(resource);

  return (
    <main className="bg-background">
      <section className="border-b border-muted-border py-10 dark:border-muted-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-teal dark:text-brand-gold">
            The Vault
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {resource.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            {resource.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center rounded-full border border-accent-teal/40 bg-accent-teal/10 px-3 py-1 font-medium text-accent-teal dark:border-brand-gold/40 dark:bg-brand-gold/10 dark:text-brand-gold">
              {resource.type}
            </span>
            <a
              href={resource.downloadUrl}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-3.5 py-1.5 text-xs font-medium text-accent-teal shadow-sm transition-colors hover:bg-accent-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
                "dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:hover:bg-brand-gold",
              )}
            >
              Download
            </a>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-accent-teal/40 bg-card px-6 py-5 shadow-sm dark:border-brand-gold/40">
            {markdown ? (
              <MarkdownBody markdown={markdown} />
            ) : (
              <p className="text-sm text-muted-foreground">
                This resource does not have a full article yet. Use the download
                link above to access the content.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


