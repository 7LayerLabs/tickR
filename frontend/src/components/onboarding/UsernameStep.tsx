'use client'

import { useState, useEffect } from 'react'

interface UsernameStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export default function UsernameStep({ value, onChange, onNext, onBack }: UsernameStepProps) {
  const [validation, setValidation] = useState<{ valid: boolean; message: string } | null>(null)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!touched && !value) return

    // Local validation
    if (value.length === 0) {
      setValidation({ valid: false, message: 'Username is required' })
      return
    }
    if (value.length < 3) {
      setValidation({ valid: false, message: 'At least 3 characters' })
      return
    }
    if (value.length > 20) {
      setValidation({ valid: false, message: 'Maximum 20 characters' })
      return
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setValidation({ valid: false, message: 'Letters, numbers, underscores only' })
      return
    }

    setValidation({ valid: true, message: 'Great choice!' })
  }, [value, touched])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    onChange(e.target.value)
  }

  const isValid = validation?.valid ?? false

  return (
    <div className="text-center animate-fade-in">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
        <svg className="w-8 h-8 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
        Pick your <span className="display-accent">trader name</span>
      </h2>

      <p className="text-slate-400 mb-8">
        This is how you&apos;ll appear on leaderboards
      </p>

      {/* Input */}
      <div className="max-w-sm mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={() => setTouched(true)}
            placeholder="e.g. StockNinja_2024"
            className={`
              input text-center text-lg font-medium
              ${touched && validation
                ? validation.valid
                  ? 'border-teal-500 focus:border-teal-400 focus:shadow-teal-500/30'
                  : 'border-coral-500 focus:border-coral-400 focus:shadow-coral-500/30'
                : ''
              }
            `}
            maxLength={20}
            autoFocus
          />

          {/* Character counter */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            {value.length}/20
          </div>
        </div>

        {/* Validation message */}
        {touched && validation && (
          <div className={`mt-2 text-sm flex items-center justify-center gap-1.5 ${validation.valid ? 'text-teal-400' : 'text-coral-400'}`}>
            {validation.valid ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {validation.message}
          </div>
        )}
      </div>

      {/* Example names */}
      <p className="text-xs text-slate-500 mb-8">
        Examples: DiamondTrader, StockWhiz99, InvestorKid
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={onBack} className="btn-ghost">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!isValid}
          className="btn-primary"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
