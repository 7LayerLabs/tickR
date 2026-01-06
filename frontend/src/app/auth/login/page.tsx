'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// DEMO MODE: Skip login entirely - redirect to dashboard
export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/portfolio')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white">Redirecting to dashboard...</div>
    </div>
  )
}
