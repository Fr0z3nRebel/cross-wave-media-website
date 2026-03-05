"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface MarkdownBodyProps {
  markdown: string;
  className?: string;
}

export function MarkdownBody({ markdown, className }: MarkdownBodyProps) {
  const { resolvedTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";

  if (!markdown.trim()) {
    return null;
  }

  return (
    <div
      className={cn(
        "prose prose-slate max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-accent-teal dark:prose-a:text-brand-gold",
        className,
      )}
    >
      <MarkdownPreview
        source={markdown}
        wrapperElement={{ "data-color-mode": colorMode }}
      />
    </div>
  );
}

