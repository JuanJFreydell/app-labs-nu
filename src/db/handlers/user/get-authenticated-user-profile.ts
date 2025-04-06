import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schemas";
import { createClient } from "@/utils/supabase/server";

export async function getAuthenticatedUserProfile() {
  const supabase = await createClient();

  const { data: auth, error } = await supabase.auth.getUser();
  if (error || !auth?.user) {
    redirect("/login");
  }
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.id, auth.user.id))
    .limit(1);

  return rows;
}
