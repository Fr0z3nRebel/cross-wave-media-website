import { createClient } from "@/lib/supabase/server";

export interface Profile {
  id: string;
  user_id: string;
  role: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, user_id, role, display_name, avatar_url, bio, created_at, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as Profile;
}

export async function requireAdmin(): Promise<{
  userId: string;
  profile: Profile;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const profile = await getProfile(user.id);
  if (!profile || profile.role !== "admin") return null;

  return { userId: user.id, profile };
}
