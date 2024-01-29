'use client'

import { SessionProvider } from 'next-auth/react'
import SignUp from './(auth)/signup/page'
import Dashboard from './(site)/dashboard/page'
import { useRouter } from 'next/navigation'


export default function Home() {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  )
}