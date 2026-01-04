'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth.store'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(username, password)
      router.push('/dashboard/portfolio')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-sapphire/15 to-transparent rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-emerald/15 to-transparent rounded-full blur-3xl -ml-48 -mb-48"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <span className="text-4xl font-display font-bold gradient-text">TickR</span>
          </Link>
          <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to your investment portfolio</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-accent-rose/10 border border-accent-rose/30 rounded-xl text-accent-rose text-sm">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-brand-700/50 border border-brand-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-sapphire focus:border-transparent transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-brand-700/50 border border-brand-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-sapphire focus:border-transparent transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full text-base font-semibold"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-8 text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-accent-sapphire font-semibold hover:text-accent-sapphire/80 transition">
            Sign up here
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 TickR. Designed for ages 12–16.</p>
        </div>
      </div>
    </div>
  )
}