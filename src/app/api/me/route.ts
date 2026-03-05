import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ user: null, profile: null });
  }

  const profile = await getProfile(user.id);
  return NextResponse.json({
    user: { id: user.id, email: user.email },
    profile: profile
      ? {
          id: profile.id,
          role: profile.role,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
        }
      : null,
  });
}
