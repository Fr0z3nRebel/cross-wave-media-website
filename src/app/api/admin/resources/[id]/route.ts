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

  const updates: Record<string, unknown> = {};
  if (body.title !== undefined) updates.title = body.title.trim();
  if (body.type !== undefined) updates.type = body.type;
  if (body.description !== undefined) updates.description = body.description.trim();
  if (body.downloadUrl !== undefined) updates.download_url = body.downloadUrl.trim();
  if (body.thumbnailUrl !== undefined) updates.thumbnail_url = body.thumbnailUrl.trim();
  if (body.contentMarkdown !== undefined) {
    const trimmed = body.contentMarkdown.trim();
    updates.content = trimmed
      ? ({ format: "markdown", markdown: trimmed } as MarkdownContent)
      : null;
  }
  updates.updated_at = new Date().toISOString();

  if (Object.keys(updates).length <= 1) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resources")
    .update(updates)
    .eq("id", id)
    .select("id, title, type, description, download_url, thumbnail_url, content")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to update resource." },
      { status: 500 },
    );
  }

  return NextResponse.json({ resource: rowToResource(data) });
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

  const { error } = await supabase.from("resources").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Failed to delete resource." },
      { status: 500 },
    );
  }

  return new NextResponse(null, { status: 204 });
}
