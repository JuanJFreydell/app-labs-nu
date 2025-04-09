"use server";

import { ServerValidateError } from "@tanstack/react-form/nextjs";
import { UserSettingsForm } from "@/zod";
import { updateUserProfile } from "@/db/handlers";

export async function updateProfile(formData: UserSettingsForm) {
  console.log(formData);
  try {
    const request = await updateUserProfile(formData);

    return request;
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }
}
