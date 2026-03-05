"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface MarkdownEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const LABEL_CLASS =
  "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground";

export function MarkdownEditor({
  id,
  label,
  value,
  onChange,
  className,
}: MarkdownEditorProps) {
  const editorValue = useMemo(() => value, [value]);

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <div
        data-color-mode="light"
        className="rounded-2xl border border-muted-border bg-background/80 px-2 py-1 text-sm dark:data-[color-mode=dark]:bg-card"
      >
        <MDEditor
          value={editorValue}
          onChange={(next) => onChange(next ?? "")}
          preview="edit"
          height={260}
          textareaProps={{
            id,
            placeholder: "Write in markdown…",
          }}
        />
      </div>
    </div>
  );
}

