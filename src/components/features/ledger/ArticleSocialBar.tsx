"use client";

import { useEffect, useState } from "react";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";

interface ArticleSocialBarProps {
  article: Article;
}

export function ArticleSocialBar({ article }: ArticleSocialBarProps) {
  const [saved, setSaved] = useState(false);
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const shareUrl =
    origin && article.slug ? `${origin}/ledger/${article.slug}` : undefined;

  const handleCopyLink = async () => {
    if (!shareUrl || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // noop
    }
  };

  const tweetHref = shareUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        article.title,
      )}&url=${encodeURIComponent(shareUrl)}`
    : undefined;

  const linkedInHref = shareUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`
    : undefined;

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Share
        </span>
        <div className="flex items-center gap-1.5">
          <a
            href={tweetHref}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center rounded-full border border-muted-border/70 bg-background/70 px-2.5 py-1 text-[0.7rem] font-medium transition-colors",
              !tweetHref && "pointer-events-none opacity-40",
              tweetHref && "hover:border-accent-teal hover:text-accent-teal",
            )}
          >
            X / Twitter
          </a>
          <a
            href={linkedInHref}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center rounded-full border border-muted-border/70 bg-background/70 px-2.5 py-1 text-[0.7rem] font-medium transition-colors",
              !linkedInHref && "pointer-events-none opacity-40",
              linkedInHref && "hover:border-accent-teal hover:text-accent-teal",
            )}
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(
              "inline-flex items-center rounded-full border border-muted-border/70 bg-background/70 px-2.5 py-1 text-[0.7rem] font-medium transition-colors hover:border-accent-teal hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
            )}
          >
            Copy link
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSaved((prev) => !prev)}
        className={cn(
          "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2",
          saved
            ? "border-accent-teal bg-accent-teal text-background"
            : "border-muted-border bg-background/80 text-foreground hover:border-accent-teal hover:text-accent-teal",
        )}
      >
        {saved ? "Saved to Library" : "Save to Library"}
      </button>
    </div>
  );
}

