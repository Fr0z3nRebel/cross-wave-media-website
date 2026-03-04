import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken, getClientIp } from "@/lib/turnstile";
import type {
  SubmitPrayerRequest,
  SubmitPrayerResult,
} from "@/types/prayer";
import type { PrayerRequest } from "@/types";

function rowToPrayer(row: {
  id: string;
  content: string;
  author_name: string;
  is_anonymized: boolean;
  support_count: number;
  tags: string[];
  created_at: string;
}): PrayerRequest {
  return {
    id: row.id,
    content: row.content,
    authorName: row.is_anonymized ? "Anonymous" : row.author_name,
    isAnonymized: row.is_anonymized,
    supportCount: row.support_count ?? 0,
    tags: row.tags ?? [],
    createdAt: row.created_at,
  };
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prayer_requests")
    .select("id, content, author_name, is_anonymized, support_count, tags, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Unable to load prayer requests." },
      { status: 500 },
    );
  }

  const prayers = (data ?? []).map(rowToPrayer);
  return NextResponse.json({ prayers });
}

export async function POST(request: NextRequest) {
  let body: SubmitPrayerRequest;

  try {
    body = (await request.json()) as SubmitPrayerRequest;
  } catch {
    const error: SubmitPrayerResult = {
      success: false,
      error: "Invalid JSON body.",
    };
    return NextResponse.json(error, { status: 400 });
  }

  const content = body.content?.trim();
  const authorName = body.authorName?.trim() || "Anonymous";
  const isAnonymized = Boolean(body.isAnonymized);
  const tags = body.tags ?? [];

  if (!content) {
    const error: SubmitPrayerResult = {
      success: false,
      error: "Prayer content is required.",
    };
    return NextResponse.json(error, { status: 400 });
  }

  if (content.length > 2000) {
    const error: SubmitPrayerResult = {
      success: false,
      error: "Prayer content is too long. Please keep it under 2000 characters.",
    };
    return NextResponse.json(error, { status: 400 });
  }

  const ip = getClientIp(request);
  const turnstileOk = await verifyTurnstileToken(body.turnstileToken, ip);

  if (!turnstileOk) {
    const error: SubmitPrayerResult = {
      success: false,
      error: "Unable to verify you are human. Please try again.",
    };
    return NextResponse.json(error, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prayer_requests")
    .insert({
      content,
      author_name: isAnonymized ? "Anonymous" : authorName,
      is_anonymized: isAnonymized,
      tags,
    })
    .select(
      "id, content, author_name, is_anonymized, support_count, tags, created_at",
    )
    .single();

  if (error || !data) {
    const result: SubmitPrayerResult = {
      success: false,
      error: "Unable to save prayer request right now. Please try again.",
    };
    return NextResponse.json(result, { status: 500 });
  }

  const result: SubmitPrayerResult = {
    success: true,
    prayer: {
      id: data.id,
      content: data.content,
      authorName: data.is_anonymized ? "Anonymous" : data.author_name,
      isAnonymized: data.is_anonymized,
      supportCount: data.support_count ?? 0,
      tags: data.tags ?? [],
      createdAt: data.created_at,
    },
  };

  return NextResponse.json(result, { status: 201 });
}

