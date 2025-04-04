"use server";
import { loginSchema } from "@/types/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

// TODO: Only allow users with @northeastern.edu email addresses
export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    "remember-me": formData.get("remember-me") === "on",
  };

  // Validate with Zod
  const validationResult = loginSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    // Return validation errors
    console.log(validationResult.error.format().email?._errors[0]);
    return;
    // return {
    //   success: false,
    //   errors: validationResult.error.format(),
    // };
  }

  // Validated data is available in validationResult.data
  const validatedData = validationResult.data;

  const { error } = await supabase.auth.signInWithPassword(validatedData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    "remember-me": formData.get("remember-me") === "on",
  };

  // Validate with Zod
  const validationResult = loginSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    // Return validation errors
    //
    console.log(validationResult.error.format().email?._errors[0]);
    return;
    // return {
    //   success: false,
    //   errors: validationResult.error.format(),
    // };
  }

  // Validated data is available in validationResult.data
  const validatedData = validationResult.data;
  const { error } = await supabase.auth.signUp(validatedData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
