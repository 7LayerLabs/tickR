'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth.store'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, checkAuth, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth()
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated && !user) {
      const timer = setTimeout(() => {
        if (!isAuthenticated) {
          router.push('/auth/login')
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, user, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard/portfolio" className="text-2xl font-bold text-blue-600">
            TickR
          </Link>

          {/* Navigation */}
          <nav className="flex gap-6 text-sm md:text-base">
            <Link href="/dashboard/portfolio" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Portfolio
            </Link>
            <Link href="/dashboard/stocks" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Stocks
            </Link>
            <Link href="/dashboard/learn" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Learn
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <div className="font-bold text-gray-900">{user.username}</div>
              <div className="text-yellow-600 font-bold">{user.points} pts</div>
            </div>
            <button
              onClick={() => {
                logout()
                router.push('/')
              }}
              className="text-gray-700 hover:text-red-600 transition font-medium text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}
