'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '../auth/server'

export async function loginWithEmailAndPassword(data:{
    email: string;
    password: string;
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);

}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
    
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}


export async function logout() {
    const cookieStore = cookies()
	const supabase = createClient(cookieStore);
	await supabase.auth.signOut();
	redirect("/login");
}