'use client'

import SignUp from './(auth)/signup/page'
import Dashboard from './dashboard/page'
import { useRouter } from 'next/navigation'

export default function Home() {
  return (
    <Dashboard />
  )
}