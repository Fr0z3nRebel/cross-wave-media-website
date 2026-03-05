import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/types";

function rowToArticle(row: {
  id: string;
  title: string;
  excerpt: string;
  content: unknown;
  reading_time: number;
  linked_scripture: unknown;
  author: unknown;
  category: string;
  status: string;
  slug: string | null;
  image_url: string | null;
}): Article {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    readingTime: row.reading_time,
    linkedScripture: Array.isArray(row.linked_scripture)
      ? (row.linked_scripture as Article["linkedScripture"])
      : [],
    author: (row.author as Article["author"]) ?? { name: "", avatar: "" },
    category: row.category as Article["category"],
    status: row.status as Article["status"],
    ...(row.slug != null && { slug: row.slug }),
    ...(row.image_url != null && { imageUrl: row.image_url }),
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, excerpt, content, reading_time, linked_scripture, author, category, status, slug, image_url",
    )
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map(rowToArticle);
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, excerpt, content, reading_time, linked_scripture, author, category, status, slug, image_url",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return rowToArticle(data);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, excerpt, content, reading_time, linked_scripture, author, category, status, slug, image_url",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return rowToArticle(data);
}
