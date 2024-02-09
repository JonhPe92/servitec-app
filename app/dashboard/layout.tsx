"use client";

import Loader from "@/components/Common/Loader/Loader";
import Header from "@/components/Dashboard/Header/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
//import { cookies } from 'next/headers'
import { redirect, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/auth/client";
//import { createClient } from '@/lib/supabase/auth/server'

import { useState, useEffect } from "react";
import { userSession } from "@/hooks/userSession";
import { UserResponse } from "@supabase/supabase-js";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = createClient();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log(data);
      if (error?.status === 401 || !data.user) {
        router.push("/login");
      }
    })();
  });




  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <section>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p">
                  {children}
                </div>
              </main>

              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
        )}
      </div>
    </section>
  );
}
