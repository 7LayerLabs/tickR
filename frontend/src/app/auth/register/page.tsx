'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth.store'
import { AgeBand } from '@/types'

const STEPS = [
  { title: 'Create Username', description: 'Pick your investor name' },
  { title: 'Create Password', description: 'Make it secure' },
  { title: 'Your Age Group', description: 'Personalize your experience' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ageBand, setAgeBand] = useState<AgeBand | ''>('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register } = useAuth()

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (username.length < 3 || username.length > 20) {
      setError('Username must be 3-20 characters')
      return
    }

    setStep(2)
  }

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setStep(3)
  }

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!ageBand) {
      setError('Please select your age group')
      return
    }

    setIsLoading(true)

    try {
      await register(username, password, ageBand)
      router.push('/dashboard/onboarding/sectors')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
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
          <h1 className="text-3xl font-display font-bold mb-2">Start Investing</h1>
          <p className="text-gray-400">Join thousands of young investors</p>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-3 mb-12">
          {STEPS.map((_, idx) => (
            <div key={idx} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all ${
                  idx < step
                    ? 'bg-accent-emerald'
                    : idx === step - 1
                    ? 'bg-accent-sapphire'
                    : 'bg-brand-700'
                }`}
              ></div>
              <p className="text-xs text-gray-500 mt-2 text-center">{STEPS[idx].title}</p>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-accent-rose/10 border border-accent-rose/30 rounded-xl text-accent-rose text-sm animate-slide-up">
            {error}
          </div>
        )}

        {/* Step content */}
        <div className="card p-8">
          {/* Step 1: Username */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-6 animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Choose Your Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., StockMaster2026"
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-brand-700/50 border border-brand-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-sapphire focus:border-transparent transition"
                />
                <p className="text-xs text-gray-400 mt-2">3-20 characters • No real names</p>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-base font-semibold"
              >
                Continue
              </button>
            </form>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-6 animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Create a Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-brand-700/50 border border-brand-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-sapphire focus:border-transparent transition"
                />
                <p className="text-xs text-gray-400 mt-2">Use numbers, letters, and symbols for security</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1 text-base font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 text-base font-semibold"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Age Band */}
          {step === 3 && (
            <form onSubmit={handleStep3} className="space-y-6 animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  What's Your Age Group?
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'TWEEN' as AgeBand, age: '12-13 years old', subtitle: 'Just getting started' },
                    { value: 'EARLY_TEEN' as AgeBand, age: '14-15 years old', subtitle: 'Growing your skills' },
                    { value: 'LATE_TEEN' as AgeBand, age: '16 years old', subtitle: 'Ready to go deep' },
                  ].map((option) => (
                    <label key={option.value} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      ageBand === option.value
                        ? 'border-accent-sapphire bg-accent-sapphire/10'
                        : 'border-brand-600 bg-brand-700/30 hover:border-brand-500'
                    }`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="ageBand"
                          value={option.value}
                          checked={ageBand === option.value}
                          onChange={() => setAgeBand(option.value)}
                          className="mt-1 w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-white">{option.age}</div>
                          <div className="text-sm text-gray-400">{option.subtitle}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1 text-base font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex-1 text-base font-semibold"
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Login link */}
        <div className="mt-8 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-accent-sapphire font-semibold hover:text-accent-sapphire/80 transition">
            Log in here
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