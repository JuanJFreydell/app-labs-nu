"use server";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/");
  }

  if (error) {
    console.log(error);
  }
}
