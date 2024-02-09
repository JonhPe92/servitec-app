"use server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/auth/server";
import { UserResponse } from '@supabase/supabase-js';
import { redirect, useRouter } from "next/navigation";


export async function userSession() {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {data, error} = await supabase.auth.getUser();

  if (error?.status === 401 || !data.user) {
    return 
    redirect("/login");
  }
}
