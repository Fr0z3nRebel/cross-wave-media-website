import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?error=sign_in_required");
  }

  const profile = await getProfile(user.id);
  if (!profile || profile.role !== "admin") {
    redirect("/?error=admin_required");
  }

  return <>{children}</>;
}
