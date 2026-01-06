'use client'

import { useState } from 'react'
import { apiClient } from '@/lib/api'
import ProgressBar from './ProgressBar'
import WelcomeStep from './WelcomeStep'
import UsernameStep from './UsernameStep'
import AgeBandStep from './AgeBandStep'
import PasswordStep from './PasswordStep'
import WhatsNextModal from './WhatsNextModal'

type AgeBand = 'TWEEN' | 'EARLY_TEEN' | 'LATE_TEEN'

const STEP_LABELS = ['Welcome', 'Username', 'Age', 'Password']

export default function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [username, setUsername] = useState('')
  const [ageBand, setAgeBand] = useState<AgeBand | null>(null)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWhatsNext, setShowWhatsNext] = useState(false)

  const nextStep = () => {
    setError(null)
    setStep((s) => Math.min(s + 1, 3))
  }

  const prevStep = () => {
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = async () => {
    if (!ageBand) return

    setIsLoading(true)
    setError(null)

    try {
      await apiClient.register(username, password, ageBand)
      // Show the What's Next modal on success
      setShowWhatsNext(true)
    } catch (err: unknown) {
      // Handle API errors
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { error?: string; message?: string } } }
        const message = axiosError.response?.data?.error || axiosError.response?.data?.message || 'Registration failed. Please try again.'
        setError(message)
      } else {
        setError('Network error. Please check your connection.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-xl">
        {/* Progress bar - only show after welcome */}
        {step > 0 && (
          <ProgressBar
            currentStep={step}
            totalSteps={4}
            stepLabels={STEP_LABELS}
          />
        )}

        {/* Step content */}
        <div className="min-h-[400px] flex items-center justify-center">
          {step === 0 && (
            <WelcomeStep onNext={nextStep} />
          )}

          {step === 1 && (
            <UsernameStep
              value={username}
              onChange={setUsername}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {step === 2 && (
            <AgeBandStep
              value={ageBand}
              onChange={setAgeBand}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {step === 3 && (
            <PasswordStep
              value={password}
              onChange={setPassword}
              onSubmit={handleSubmit}
              onBack={prevStep}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>

        {/* Login link */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <a href="/auth/login" className="text-orange-400 hover:text-orange-300 font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* What's Next Modal */}
      <WhatsNextModal isOpen={showWhatsNext} username={username} />
    </div>
  )
}
