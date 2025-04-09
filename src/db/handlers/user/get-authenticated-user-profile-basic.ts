import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schemas";
import { basicUserInfoSchema } from "@/zod";
import { createClient } from "@/supabase/server";

export async function getAuthenticatedUserProfileBasic() {
  try {
    const supabase = await createClient();

    const { data: auth, error } = await supabase.auth.getUser();
    if (error || !auth?.user) {
      return;
    }
    const row = await db
      .select()
      .from(users)
      .where(eq(users.id, auth.user.id))
      .limit(1);

    const parsed = basicUserInfoSchema.parse(row[0]);

    return parsed;
  } catch (e) {
    console.error("Failed to get user info --> ", e);
  }
}
