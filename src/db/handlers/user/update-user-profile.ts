import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, userUpdateSchema } from "@/db/schemas";
import { createClient } from "@/supabase/server";
import { type UserSettingsForm } from "@/zod";
import { redirect } from "next/navigation";

export async function updateUserProfile(
  profileData: UserSettingsForm,
): Promise<string> {
  const data = profileData;

  // Check if profile was complete before updating database
  const wasProfileCompleteBeforeDbUpdate = profileData.isProfileComplete;

  let isProfileComplete = false;

  if (data.firstName && data.lastName) {
    isProfileComplete = true;
  }

  const dataToUpdate = {
    ...data,
    isProfileComplete: isProfileComplete,
    updatedAt: new Date(),
  };

  const validatedData = userUpdateSchema.parse(dataToUpdate);

  try {
    const supabase = await createClient();

    const { data: auth, error } = await supabase.auth.getUser();

    // If we can't get an authenticated user
    if (error) {
      return "User could not be validated";
    }

    await db
      .update(users)
      .set(validatedData)
      .where(eq(users.id, auth.user.id))
      .returning();

    if (!wasProfileCompleteBeforeDbUpdate && isProfileComplete) {
      redirect("/settings");
    }

    return "Profile updated Successfully";
  } catch (error) {
    console.error("Error updating user profile:", error);
    return "Error updating user profile";
  }
}
