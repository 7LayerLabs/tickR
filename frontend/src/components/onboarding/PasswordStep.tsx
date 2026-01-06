'use client'

import { useState } from 'react'

interface PasswordStepProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onBack: () => void
  isLoading: boolean
  error: string | null
}

export default function PasswordStep({ value, onChange, onSubmit, onBack, isLoading, error }: PasswordStepProps) {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [touched, setTouched] = useState(false)

  // Password strength checks
  const checks = {
    minLength: value.length >= 8,
    hasUppercase: /[A-Z]/.test(value),
    hasNumber: /\d/.test(value),
    passwordsMatch: value === confirmPassword && confirmPassword.length > 0
  }

  const strengthScore = [checks.minLength, checks.hasUppercase, checks.hasNumber].filter(Boolean).length
  const strengthLabel = strengthScore === 0 ? '' : strengthScore === 1 ? 'Weak' : strengthScore === 2 ? 'Medium' : 'Strong'
  const strengthColor = strengthScore === 0 ? 'bg-slate-600' : strengthScore === 1 ? 'bg-coral-500' : strengthScore === 2 ? 'bg-gold-500' : 'bg-teal-500'

  const isValid = checks.minLength && checks.passwordsMatch

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid && !isLoading) {
      onSubmit()
    }
  }

  return (
    <div className="text-center animate-fade-in">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/30">
        <svg className="w-8 h-8 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
        Create a <span className="display-accent">password</span>
      </h2>

      <p className="text-slate-400 mb-8">
        Keep your account secure
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        {/* Password input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter password"
            className="input pr-12"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Strength indicator */}
        {value.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${i <= strengthScore ? strengthColor : 'bg-slate-700'}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Password strength</span>
              <span className={`font-medium ${strengthScore === 3 ? 'text-teal-400' : strengthScore === 2 ? 'text-gold-400' : 'text-coral-400'}`}>
                {strengthLabel}
              </span>
            </div>
          </div>
        )}

        {/* Password requirements */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <div className={`text-xs px-2 py-1 rounded-full ${checks.minLength ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700 text-slate-500'}`}>
            8+ characters
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${checks.hasUppercase ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700 text-slate-500'}`}>
            Uppercase
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${checks.hasNumber ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700 text-slate-500'}`}>
            Number
          </div>
        </div>

        {/* Confirm password */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setTouched(true)
            }}
            placeholder="Confirm password"
            className={`input pr-12 ${touched && confirmPassword.length > 0 ? (checks.passwordsMatch ? 'border-teal-500' : 'border-coral-500') : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showConfirm ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Match indicator */}
        {touched && confirmPassword.length > 0 && (
          <div className={`text-sm mb-4 flex items-center justify-center gap-1.5 ${checks.passwordsMatch ? 'text-teal-400' : 'text-coral-400'}`}>
            {checks.passwordsMatch ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Passwords match
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Passwords don&apos;t match
              </>
            )}
          </div>
        )}

        {/* API Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-coral-500/10 border border-coral-500/30 text-coral-400 text-sm">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button type="button" onClick={onBack} className="btn-ghost" disabled={isLoading}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="btn-primary"
          >
            {isLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating...
              </>
            ) : (
              <>
                Create Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
