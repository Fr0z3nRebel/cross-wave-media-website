import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import type { Resource } from "@/lib/data/mockResources";

type MarkdownContent = {
  format: "markdown";
  markdown: string;
};

function rowToResource(row: {
  id: string;
  title: string;
  type: string;
  description: string;
  download_url: string;
  thumbnail_url: string;
  content: unknown;
}): Resource {
  return {
    id: row.id,
    title: row.title,
    type: row.type as Resource["type"],
    description: row.description,
    downloadUrl: row.download_url,
    thumbnailUrl: row.thumbnail_url,
    content: row.content,
  };
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("id, title, type, description, download_url, thumbnail_url, content")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Unable to load resources." },
      { status: 500 },
    );
  }

  const resources = (data ?? []).map(rowToResource);
  return NextResponse.json({ resources });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    title?: string;
    type?: Resource["type"];
    description?: string;
    downloadUrl?: string;
    thumbnailUrl?: string;
    contentMarkdown?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const title = body.title?.trim();
  const type = body.type ?? "PDF";
  const description = body.description?.trim() ?? "";
  const downloadUrl = body.downloadUrl?.trim() ?? "";
  const thumbnailUrl = body.thumbnailUrl?.trim() ?? "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!downloadUrl) {
    return NextResponse.json({ error: "Download URL is required." }, { status: 400 });
  }
  if (!thumbnailUrl) {
    return NextResponse.json({ error: "Thumbnail URL is required." }, { status: 400 });
  }

  const validTypes = ["PDF", "Guide", "Book"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Type must be PDF, Guide, or Book." }, { status: 400 });
  }

  const content: MarkdownContent | null =
    body.contentMarkdown && body.contentMarkdown.trim()
      ? { format: "markdown", markdown: body.contentMarkdown.trim() }
      : null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resources")
    .insert({
      title,
      type,
      description,
      download_url: downloadUrl,
      thumbnail_url: thumbnailUrl,
      content,
    })
    .select(
      "id, title, type, description, download_url, thumbnail_url, content",
    )
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to create resource." },
      { status: 500 },
    );
  }

  return NextResponse.json({ resource: rowToResource(data) }, { status: 201 });
}
