
'use client'

import './globals.css'
import '@radix-ui/themes/styles.css';
import SideNav from './components/SideNav'
import { Theme } from '@radix-ui/themes'
import SessionProvide from './components/sessionProvide';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()
  if (!window.localStorage.getItem('userId')) {
    router.push('/login')
  }

  useEffect(() => {
    const fun = async () => {
      try {
        const response = await fetch(`/api/getUser`, {
          method: "POST",
          body: JSON.stringify({
            uid: window.localStorage.getItem('userId')
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Logged in as ", data.name);
        } else {
          console.error('Error getting user name');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fun();
  })

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TaskMate</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/bb488c4407.js" async></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Agbalumo&family=Roboto&family=Overpass&family=Comfortaa&family=Gasoek+One&family=Inter&family=Lilita+One&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&family=Mooli&family=Open+Sans&family=Play:wght@400;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;1,100;1,200;1,300;1,400&family=Quicksand&family=Raleway&family=Rubik&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SessionProvide>
          <Theme>
            {
              <section className='flex fixed h-screen w-full'>
                <SideNav />
                <main className='flex-grow h-screen overflow-y-scroll w-full px-16 py-10'>{children}</main>
              </section>
            }
          </Theme>
        </SessionProvide>
      </body>
    </html>
  )
}
