import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Article } from "@/types";
import {
  getArticleBySlug as getMockArticleBySlug,
  getArticleById as getMockArticleById,
} from "@/lib/data";
import {
  getArticleBySlug as getArticleBySlugFromDb,
  getArticleById as getArticleByIdFromDb,
} from "@/lib/articles";
import { ArticlePageLayout } from "@/components/features/ledger";

interface LedgerArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function resolveArticle(param: string): Promise<Article | null> {
  const dbBySlug = await getArticleBySlugFromDb(param);
  if (dbBySlug) return dbBySlug;
  const dbById = await getArticleByIdFromDb(param);
  if (dbById) return dbById;
  const mockBySlug = getMockArticleBySlug(param);
  if (mockBySlug) return mockBySlug;
  const mockById = getMockArticleById(param);
  return mockById ?? null;
}

export async function generateMetadata({
  params,
}: LedgerArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await resolveArticle(slug);

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

export default async function LedgerArticlePage({
  params,
}: LedgerArticlePageProps) {
  const { slug } = await params;
  const article = await resolveArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticlePageLayout article={article} />;
}


