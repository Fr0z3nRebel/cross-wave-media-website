import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import type { Article } from "@/types";

type MarkdownContent = {
  format: "markdown";
  markdown: string;
};

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

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, excerpt, content, reading_time, linked_scripture, author, category, status, slug, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Unable to load articles." },
      { status: 500 },
    );
  }

  const articles = (data ?? []).map(rowToArticle);
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    title?: string;
    excerpt?: string;
    contentMarkdown?: string;
    readingTime?: number;
    linkedScripture?: Article["linkedScripture"];
    author?: Article["author"];
    category?: Article["category"];
    status?: Article["status"];
    slug?: string;
    imageUrl?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const title = body.title?.trim();
  const excerpt = body.excerpt?.trim() ?? "";
  const category = body.category ?? "Analysis";
  const status = body.status ?? "Draft";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const content: MarkdownContent | null =
    body.contentMarkdown && body.contentMarkdown.trim()
      ? { format: "markdown", markdown: body.contentMarkdown.trim() }
      : null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title,
      excerpt,
      content,
      reading_time: body.readingTime ?? 5,
      linked_scripture: body.linkedScripture ?? [],
      author: body.author ?? { name: "", avatar: "" },
      category,
      status,
      slug: body.slug?.trim() || null,
      image_url: body.imageUrl?.trim() || null,
    })
    .select(
      "id, title, excerpt, content, reading_time, linked_scripture, author, category, status, slug, image_url",
    )
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to create article." },
      { status: 500 },
    );
  }

  return NextResponse.json({ article: rowToArticle(data) }, { status: 201 });
}
