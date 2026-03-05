import type { Article } from "@/types";
import { MarkdownBody } from "@/components/markdown/MarkdownBody";

interface ArticleBodyProps {
  article: Article;
}

interface ProseNode {
  type: string;
  content?: ProseNode[];
  text?: string;
}

type MarkdownContent = {
  format: "markdown";
  markdown: string;
};

function isMarkdownContent(content: unknown): content is MarkdownContent {
  return (
    !!content &&
    typeof content === "object" &&
    (content as MarkdownContent).format === "markdown" &&
    typeof (content as MarkdownContent).markdown === "string"
  );
}

export function ArticleBody({ article }: ArticleBodyProps) {
  // Prefer markdown-rendered content when available (Supabase-backed articles)
  if (isMarkdownContent(article.content)) {
    return (
      <MarkdownBody
        markdown={article.content.markdown}
        className="mx-auto max-w-3xl"
      />
    );
  }

  // Fallback to existing structured prose content (mock articles)
  const doc =
    (article.content as { type?: string; content?: ProseNode[] } | null) ?? {
      type: "doc",
      content: [],
    };

  const paragraphs: string[] =
    doc?.type === "doc" && Array.isArray(doc.content)
      ? doc.content
          .filter((node) => node.type === "paragraph")
          .map((node) => {
            if (!node.content) return "";
            return node.content
              .filter((child) => typeof child.text === "string")
              .map((child) => child.text)
              .join("");
          })
          .filter(Boolean)
      : [];

  const blocks = paragraphs.length > 0 ? paragraphs : [article.excerpt];

  return (
    <div className="mx-auto max-w-3xl space-y-6 font-serif text-lg leading-relaxed text-foreground/90">
      {blocks.map((para, idx) => (
        <p
          key={idx}
          className={
            idx === 0
              ? "first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-heading first-letter:leading-none first-letter:text-foreground"
              : undefined
          }
        >
          {para}
        </p>
      ))}
    </div>
  );
}


