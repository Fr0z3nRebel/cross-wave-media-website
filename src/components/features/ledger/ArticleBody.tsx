import type { Article } from "@/types";

interface ArticleBodyProps {
  article: Article;
}

interface ProseNode {
  type: string;
  content?: ProseNode[];
  text?: string;
}

export function ArticleBody({ article }: ArticleBodyProps) {
  const doc = (article.content as { type?: string; content?: ProseNode[] } | null) ?? {
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

