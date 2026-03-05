import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/data/mockResources";

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

export async function getResourceById(
  id: string,
): Promise<Resource | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select(
      "id, title, type, description, download_url, thumbnail_url, content",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return rowToResource(data);
}

