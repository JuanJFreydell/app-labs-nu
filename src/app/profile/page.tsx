import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";
import { db, users } from "@/db";

import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: auth, error } = await supabase.auth.getUser();
  if (error || !auth?.user) {
    redirect("/login");
  }
  const userProfile = await db
    .select()
    .from(users)
    .where(eq(users.id, auth.user.id))
    .limit(1);

  const {
    id,
    email,
    firstName,
    lastName,
    jobTitle,
    clubPosition,
    avatarUrl,
    // preferences,
    isProfileComplete,
    // createdAt,
    // lastLoginAt,
    // updatedAt,
    linkedinUrl,
    githubUrl,
    skills,
    interests,
  } = userProfile[0];
  console.log(userProfile);

  return (
    <div>
      <ul>
        <li>id: {id}</li>
        <li>email: {email}</li>
        <li>firstName: {firstName}</li>
        <li>lastName: {lastName}</li>
        <li>jobTitle: {jobTitle}</li>
        <li>clubPosition: {clubPosition}</li>
        <li>avatarUrl: {avatarUrl}</li>
        <li>isProfileComplete: {isProfileComplete}</li>
        <li>linkedinUrl: {linkedinUrl}</li>
        <li>githubUrl: {githubUrl}</li>
        <li>skills: {skills}</li>
        <li>interes: {interests}</li>
      </ul>
    </div>
  );
}
