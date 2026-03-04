import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/turnstile";
import type { SupportPrayerResult } from "@/types/prayer";
import crypto from "crypto";

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "default-ip-hash-salt";

  return crypto
    .createHash("sha256")
    .update(salt + ":" + ip)
    .digest("hex");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: prayerRequestId } = await params;

  if (!prayerRequestId) {
    const error: SupportPrayerResult = {
      success: false,
      error: "Missing prayer request id.",
    };
    return NextResponse.json(error, { status: 400 });
  }

  const ip = getClientIp(request);
  if (!ip) {
    const error: SupportPrayerResult = {
      success: false,
      error: "Unable to determine your IP address.",
    };
    return NextResponse.json(error, { status: 400 });
  }

  const ipHash = hashIp(ip);
  const supabase = await createClient();

  // First, attempt to insert support row. Unique constraint enforces one per IP per prayer.
  const { error: supportError } = await supabase
    .from("prayer_support")
    .insert({
      prayer_request_id: prayerRequestId,
      ip_hash: ipHash,
    });

  if (supportError) {
    // Postgres unique violation
    if (supportError.code === "23505") {
      const { data: existing, error: fetchError } = await supabase
        .from("prayer_requests")
        .select("support_count")
        .eq("id", prayerRequestId)
        .single();

      const result: SupportPrayerResult = {
        success: false,
        error: "You have already prayed for this request.",
        supportCount: existing?.support_count ?? 0,
      };

      const status = fetchError ? 500 : 200;
      return NextResponse.json(result, { status });
    }

    const error: SupportPrayerResult = {
      success: false,
      error: "Unable to register your support right now. Please try again.",
    };
    return NextResponse.json(error, { status: 500 });
  }

  // If insert worked, increment support_count (non-atomic but acceptable for this scale).
  const { data: current, error: fetchError } = await supabase
    .from("prayer_requests")
    .select("support_count")
    .eq("id", prayerRequestId)
    .single();

  if (fetchError || !current) {
    const error: SupportPrayerResult = {
      success: false,
      error: "Support saved but unable to update count.",
    };
    return NextResponse.json(error, { status: 500 });
  }

  const nextCount = (current.support_count ?? 0) + 1;

  const { data: updated, error: updateError } = await supabase
    .from("prayer_requests")
    .update({ support_count: nextCount })
    .eq("id", prayerRequestId)
    .select("support_count")
    .single();

  if (updateError || !updated) {
    const error: SupportPrayerResult = {
      success: false,
      error: "Support saved but unable to update count.",
    };
    return NextResponse.json(error, { status: 500 });
  }

  const result: SupportPrayerResult = {
    success: true,
    supportCount: updated.support_count ?? nextCount,
  };

  return NextResponse.json(result, { status: 200 });
}

