"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Article, ArticleCategory, ArticleStatus } from "@/types";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";

const LABEL_CLASS =
  "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground";
const BUTTON_CLASS = cn(
  "inline-flex w-full items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2.5 text-sm font-medium text-accent-teal shadow-[0_0_0_1px_rgba(45,212,191,0.35)] transition-colors hover:bg-accent-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  "dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:focus-visible:ring-brand-gold",
);

type MarkdownContent = {
  format: "markdown";
  markdown: string;
};

function getInitialBody(content: unknown): string {
  if (
    content &&
    typeof content === "object" &&
    (content as MarkdownContent).format === "markdown" &&
    typeof (content as MarkdownContent).markdown === "string"
  ) {
    return (content as MarkdownContent).markdown;
  }
  return "";
}

interface AdminArticleFormProps {
  article?: Article | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AdminArticleForm({
  article,
  onSuccess,
  onCancel,
}: AdminArticleFormProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [body, setBody] = useState<string>(getInitialBody(article?.content));
  const [readingTime, setReadingTime] = useState(
    String(article?.readingTime ?? 5),
  );
  const [authorName, setAuthorName] = useState(article?.author?.name ?? "");
  const [authorAvatar, setAuthorAvatar] = useState(article?.author?.avatar ?? "");
  const [category, setCategory] = useState<ArticleCategory>(
    article?.category ?? "Analysis",
  );
  const [status, setStatus] = useState<ArticleStatus>(
    article?.status ?? "Draft",
  );
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(article?.imageUrl ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(article?.id);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        contentMarkdown: body,
        readingTime: parseInt(readingTime, 10) || 5,
        author: {
          name: authorName.trim() || "Staff",
          avatar: authorAvatar.trim() || "",
        },
        category,
        status,
        slug: slug.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        linkedScripture: [] as { reference: string; text?: string }[],
      };

      const url = isEdit
        ? `/api/admin/articles/${article!.id}`
        : "/api/admin/articles";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setTitle("");
      setExcerpt("");
      setReadingTime("5");
      setBody("");
      setAuthorName("");
      setAuthorAvatar("");
      setSlug("");
      setImageUrl("");
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="article-title" className={LABEL_CLASS}>
          Title
        </label>
        <Input
          id="article-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="article-excerpt" className={LABEL_CLASS}>
          Excerpt
        </label>
        <textarea
          id="article-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short excerpt"
          rows={2}
          className="flex w-full rounded-full border border-muted-border bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold"
        />
      </div>

      <MarkdownEditor
        id="article-body"
        label="Full article"
        value={body}
        onChange={setBody}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="article-reading-time" className={LABEL_CLASS}>
            Reading time (min)
          </label>
          <Input
            id="article-reading-time"
            type="number"
            min={1}
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="article-category" className={LABEL_CLASS}>
            Category
          </label>
          <select
            id="article-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ArticleCategory)}
            className="flex h-9 w-full rounded-full border border-muted-border bg-background px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold"
          >
            <option value="News">News</option>
            <option value="Analysis">Analysis</option>
            <option value="Devotional">Devotional</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="article-author-name" className={LABEL_CLASS}>
            Author name
          </label>
          <Input
            id="article-author-name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="article-author-avatar" className={LABEL_CLASS}>
            Author avatar URL
          </label>
          <Input
            id="article-author-avatar"
            value={authorAvatar}
            onChange={(e) => setAuthorAvatar(e.target.value)}
            placeholder="/avatars/name.jpg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="article-status" className={LABEL_CLASS}>
            Status
          </label>
          <select
            id="article-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ArticleStatus)}
            className="flex h-9 w-full rounded-full border border-muted-border bg-background px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="article-slug" className={LABEL_CLASS}>
            Slug (optional)
          </label>
          <Input
            id="article-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="article-slug"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="article-image-url" className={LABEL_CLASS}>
          Image URL (optional)
        </label>
        <Input
          id="article-image-url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={cn(BUTTON_CLASS, "border-muted-border bg-muted/50 text-muted-foreground hover:bg-muted")}
          >
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting} className={cn(BUTTON_CLASS, "flex-1")}>
          {submitting ? "Saving…" : isEdit ? "Update article" : "Create article"}
        </button>
      </div>
    </form>
  );
}
