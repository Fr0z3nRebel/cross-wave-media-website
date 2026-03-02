import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Article } from "@/types";
import { getArticleBySlug, getMockArticles } from "@/lib/data";
import { ArticlePageLayout } from "@/components/features/ledger";

interface LedgerArticlePageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  const articles = getMockArticles();

  return articles
    .filter((article): article is Article & { slug: string } => !!article.slug)
    .map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: LedgerArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article not found — The Ledger",
    };
  }

  const title = `${article.title} — The Ledger`;
  const description = article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
  };
}

export default function LedgerArticlePage({ params }: LedgerArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticlePageLayout article={article} />;
}

