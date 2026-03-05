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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
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

  const updates: Record<string, unknown> = {};
  if (body.title !== undefined) updates.title = body.title.trim();
  if (body.excerpt !== undefined) updates.excerpt = body.excerpt.trim();
  if (body.contentMarkdown !== undefined) {
    const trimmed = body.contentMarkdown.trim();
    updates.content = trimmed
      ? ({ format: "markdown", markdown: trimmed } as MarkdownContent)
      : null;
  }
  if (body.readingTime !== undefined) updates.reading_time = body.readingTime;
  if (body.linkedScripture !== undefined) updates.linked_scripture = body.linkedScripture;
  if (body.author !== undefined) updates.author = body.author;
  if (body.category !== undefined) updates.category = body.category;
  if (body.status !== undefined) updates.status = body.status;
  if (body.slug !== undefined) updates.slug = body.slug?.trim() || null;
  if (body.imageUrl !== undefined) updates.image_url = body.imageUrl?.trim() || null;
  updates.updated_at = new Date().toISOString();

  if (Object.keys(updates).length <= 1) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id)
    .select("id, title, excerpt, content, reading_time, linked_scripture, author, category, status, slug, image_url")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to update article." },
      { status: 500 },
    );
  }

  return NextResponse.json({ article: rowToArticle(data) });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Failed to delete article." },
      { status: 500 },
    );
  }

  return new NextResponse(null, { status: 204 });
}
