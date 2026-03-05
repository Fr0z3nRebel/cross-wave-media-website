import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  type Resource,
  getResources,
} from "@/lib/data/mockResources";

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

  const dbResources = (data ?? []).map(rowToResource);
  const mockResources = getResources();
  const dbIds = new Set(dbResources.map((r) => r.id));
  const uniqueMocks = mockResources.filter((r) => !dbIds.has(r.id));
  const resources: Resource[] = [...dbResources, ...uniqueMocks];

  return NextResponse.json({ resources });
}
