import { createClient } from "./client";

type NewAvatarUrl = string;

export async function updateUserPhoto(
  file: File,
  avatarUrl: string | null,
): Promise<NewAvatarUrl | undefined> {
  try {
    // Get supabase client
    const supabase = createClient();

    // Get supabase user
    const { data: userData } = await supabase.auth.getUser();

    if (avatarUrl) {
      // Generate full path of old file
      const oldFilePath = `${userData.user?.id}/${avatarUrl.split("/").pop()}`;

      // Delete old image
      try {
        const { error } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET!)
          .remove([oldFilePath]);

        if (error) {
          console.error("Old avatar deletion failed: ", error);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const uuid = self.crypto.randomUUID();
    // Generate file new file path
    const newFilePath = `${userData.user?.id}/${uuid}`;

    // Upload new file
    const { error, data: uploadedData } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET!)
      .upload(newFilePath, file, {});

    if (error) {
      console.error(error);
    }

    return uploadedData?.path;
  } catch (e) {
    console.error(e);
  }
}
