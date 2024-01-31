import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./styles/globals.css"

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets:['latin'],
  weight: ['400' ,'700'],
  
})

export const metadata: Metadata = {
  title: "Servitec",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true} className={roboto.className}>{children}</body>
    </html>
  );
}
