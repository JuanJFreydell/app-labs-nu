"use server";

import {
  ServerFormState,
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { emailFormOpts, otpFormOpts } from "./shared";
import { emailSchema, otpSchema } from "@/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { SignInWithPasswordlessCredentials } from "@supabase/supabase-js";

const serverValidateEmail = createServerValidate({
  ...emailFormOpts,
  onServerValidate: emailSchema,
});

const serverValidateLogin = createServerValidate({
  ...otpFormOpts,
  onServerValidate: otpSchema,
});

export async function requestOtp(_prev: unknown, formData: FormData) {
  try {
    const validData = await serverValidateEmail(formData);

    // Store email as server cookie if valid
    const cookieStore = await cookies();
    cookieStore.set("email", validData.email);
    const supabase = await createClient();

    // Initial call requesting OTP should return an error
    const { error } = await supabase.auth.signInWithOtp(
      validData as SignInWithPasswordlessCredentials,
    );

    if (error) {
      return;
    }
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }
}

export async function verifyOtp(_prev: unknown, formData: FormData) {
  try {
    const validData = await serverValidateLogin(formData);

    // Grab validated email cookie
    const cookieStore = await cookies();
    const email = cookieStore.get("email");

    const supabase = await createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email?.value as string,
      token: validData.otp,
      type: "email",
    });

    // Invalid token gives 403
    if (error?.status === 403) {
      return { values: [403, "Invalid token"] } as ServerFormState<
        string[],
        undefined
      >;
    }
    // Delete email cookie when we are done authenticating
    cookieStore.delete("email");

    if (error) {
      redirect("/error");
    }

    if (session) {
      revalidatePath("/", "layout");
      redirect("/");
    }
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }
}
