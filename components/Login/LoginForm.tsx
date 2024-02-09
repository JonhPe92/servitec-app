"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { loginWithEmailAndPassword } from "@/lib/supabase/login/actions";
import { AuthTokenResponse } from "@supabase/supabase-js";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: "Contraseña requerida" }),
});

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = JSON.parse(
        await loginWithEmailAndPassword(data)
      ) as AuthTokenResponse;

      if (error) {
        toast({
          title: "Error al iniciar sesion",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-primary p-4">
              <code className="text-black">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast ({
          title: "Inicio de sesion exitoso 🎉",
     
        });
        revalidatePath('/dashboard', 'layout')
        redirect('/dashboard')
      }
    });
  }

  return (
    <div className="w-96 container bg-themeColor">

        <div className="mx-2 my-6">
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">Email</FormLabel>
                <FormControl>
                  <Input className="text-gray-100" placeholder="user@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">Contraseña</FormLabel>
                <FormControl>
                  <Input className="text-gray-100" placeholder="" {...field} type="password" />
                </FormControl>
                <FormDescription>
                  {"Contactese con el administrador si olvido su contraseña"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            variant="theme"
            className="w-full flex items-center gap-2"
          >
            Login{" "}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", {
                hidden: true,
              })}
            />
          </Button>
        </form>
      </Form>
        </div>
      
    </div>
  );
}
