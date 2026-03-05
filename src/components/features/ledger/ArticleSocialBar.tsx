"use client";

import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

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

  const shareParam = article.slug ?? article.id;
  const shareUrl =
    origin && shareParam ? `${origin}/ledger/${shareParam}` : undefined;

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

  const facebookHref = shareUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : undefined;

  const iconButtonClass = cn(
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-muted-border/70 bg-background/70 transition-colors",
    "hover:border-accent-teal hover:text-accent-teal dark:hover:border-brand-gold dark:hover:text-brand-gold",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold",
  );

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Share
        </span>
        <div className="flex items-center gap-1.5">
          <a
            href={tweetHref}
            target="_blank"
            rel="noreferrer"
            className={cn(
              iconButtonClass,
              !tweetHref && "pointer-events-none opacity-40",
            )}
            aria-label="Share on X"
          >
            <XIcon className="h-4 w-4" />
          </a>
          <a
            href={facebookHref}
            target="_blank"
            rel="noreferrer"
            className={cn(
              iconButtonClass,
              !facebookHref && "pointer-events-none opacity-40",
            )}
            aria-label="Share on Facebook"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(iconButtonClass)}
            aria-label="Copy link"
          >
            <Link2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSaved((prev) => !prev)}
        className={cn(
          "inline-flex min-w-[8.5rem] justify-center rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:focus-visible:ring-brand-gold",
          saved
            ? "border-accent-teal bg-accent-teal text-background dark:border-brand-gold dark:bg-brand-gold dark:text-brand-navy"
            : "border-muted-border bg-background/80 text-foreground hover:border-accent-teal hover:text-accent-teal dark:hover:border-brand-gold dark:hover:text-brand-gold",
        )}
      >
        {saved ? "Saved to Library" : "Save to Library"}
      </button>
    </div>
  );
}

