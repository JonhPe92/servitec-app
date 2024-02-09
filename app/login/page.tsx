import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/auth/server";
import LoginForm from "@/components/Login/LoginForm";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      
        <LoginForm/>
      
    </div>
  );
}
