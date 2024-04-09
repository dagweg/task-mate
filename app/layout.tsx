"use client";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import SideNav from "./components/SideNav";
import { Theme } from "@radix-ui/themes";
import SessionProvide from "./components/sessionProvide";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";

export default function RootLayout({
  children,
  param,
}: {
  children: React.ReactNode;
  param: string;
}) {
  const router = useRouter();
  let userId: any = null;

  const [timer, setTimer] = useState<any>(0);

  useEffect(() => {
    userId = window.localStorage.getItem("userId");

    // basic session handling {must be done right}
    if (!userId) {
      router.push("/login");
    }

    if (timer < 1) {
      const intervalId = setInterval(() => {
        setTimer((timer: any) => timer + 1);
      }, 1000);

      // Cleanup function to clear the interval when component unmounts
      return () => clearInterval(intervalId);
    }
  }, [timer, router]);

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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Agbalumo&family=Roboto&family=Overpass&family=DM+Sans&family=Comfortaa&family=Gasoek+One&family=Inter&family=Lilita+One&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&family=Mooli&family=Open+Sans&family=Play:wght@400;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;1,100;1,200;1,300;1,400&family=Quicksand&family=Raleway&family=Rubik&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <SessionProvide>
            <Theme>
              {
                <section className="flex fixed h-screen w-full">
                  <SideNav />
                  <main className="flex-grow h-screen overflow-y-scroll w-full md:px-16 md:py-10 p-8 pt-20">
                    {children}
                  </main>
                </section>
              }
            </Theme>
          </SessionProvide>
        </body>
      </html>
    </>
  );
}
