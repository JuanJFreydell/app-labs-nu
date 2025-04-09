import { redirect } from "next/navigation";
import { getAuthenticatedUserProfile } from "@/db/handlers";
import { userSelectSchema } from "@/db/schemas";
import ProfileSettingsForm from "@/components/profile-settings-form";

export default async function ProfilePage() {
  const user = await getAuthenticatedUserProfile();

  if (!user) {
    redirect("/login");
  }

  // Validate user data received
  const parsedUser = userSelectSchema.parse(user);

  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col px-6 lg:px-8">
        <ProfileSettingsForm user={parsedUser} />
      </div>
    </div>
  );
}
