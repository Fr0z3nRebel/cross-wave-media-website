"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/data/mockResources";
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

interface AdminResourceFormProps {
  resource?: Resource | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AdminResourceForm({
  resource,
  onSuccess,
  onCancel,
}: AdminResourceFormProps) {
  const [title, setTitle] = useState(resource?.title ?? "");
  const [type, setType] = useState<Resource["type"]>(resource?.type ?? "PDF");
  const [description, setDescription] = useState(resource?.description ?? "");
  const [body, setBody] = useState<string>(getInitialBody(resource?.content));
  const [downloadUrl, setDownloadUrl] = useState(resource?.downloadUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    resource?.thumbnailUrl ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(resource?.id);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        type,
        description: description.trim(),
        downloadUrl: downloadUrl.trim(),
        thumbnailUrl: thumbnailUrl.trim(),
        contentMarkdown: body,
      };

      const url = isEdit
        ? `/api/admin/resources/${resource!.id}`
        : "/api/admin/resources";
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
      setType("PDF");
      setDescription("");
      setDownloadUrl("");
      setThumbnailUrl("");
      setBody("");
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="resource-title" className={LABEL_CLASS}>
          Title
        </label>
        <Input
          id="resource-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resource title"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="resource-type" className={LABEL_CLASS}>
          Type
        </label>
        <select
          id="resource-type"
          value={type}
          onChange={(e) => setType(e.target.value as Resource["type"])}
          className="flex h-9 w-full rounded-full border border-muted-border bg-background px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold"
        >
          <option value="PDF">PDF</option>
          <option value="Guide">Guide</option>
          <option value="Book">Book</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="resource-description" className={LABEL_CLASS}>
          Description
        </label>
        <textarea
          id="resource-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          rows={3}
          className="flex w-full rounded-full border border-muted-border bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 dark:border-brand-gold/25 dark:focus-visible:ring-brand-gold"
        />
      </div>

      <MarkdownEditor
        id="resource-body"
        label="Full article (optional)"
        value={body}
        onChange={setBody}
      />

      <div className="space-y-1.5">
        <label htmlFor="resource-download-url" className={LABEL_CLASS}>
          Download URL
        </label>
        <Input
          id="resource-download-url"
          value={downloadUrl}
          onChange={(e) => setDownloadUrl(e.target.value)}
          placeholder="/resources/file.pdf"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="resource-thumbnail-url" className={LABEL_CLASS}>
          Thumbnail URL
        </label>
        <Input
          id="resource-thumbnail-url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="/thumbnails/file.jpg"
          required
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              BUTTON_CLASS,
              "border-muted-border bg-muted/50 text-muted-foreground hover:bg-muted",
            )}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className={cn(BUTTON_CLASS, "flex-1")}
        >
          {submitting
            ? "Saving…"
            : isEdit
              ? "Update resource"
              : "Create resource"}
        </button>
      </div>
    </form>
  );
}
