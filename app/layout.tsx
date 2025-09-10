"use client";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import SideNav from "./components/SideNav";
import { Theme } from "@radix-ui/themes";
import SessionProvide from "./components/sessionProvide";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
  param,
}: {
  children: React.ReactNode;
  param: string;
}) {
  const pathname = usePathname();
  const onAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/logout") ||
    pathname?.startsWith("/api/auth");

  return (
    <>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>TaskMate</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <script
            src="https://kit.fontawesome.com/bb488c4407.js"
            async
          ></script>
        </head>
        <body className={inter.className}>
          <SessionProvide>
            <Theme>
              {onAuthRoute ? (
                children
              ) : (
                <section className="flex fixed h-screen w-full">
                  <SideNav />
                  <main className="flex-grow h-screen overflow-y-scroll w-full md:px-16 md:py-10 p-8 pt-20">
                    {children}
                  </main>
                </section>
              )}
            </Theme>
          </SessionProvide>
        </body>
      </html>
    </>
  );
}
