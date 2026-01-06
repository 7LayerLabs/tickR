'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Progress line container */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-0 right-0 h-1 bg-navy-700 rounded-full" />

        {/* Progress fill */}
        <div
          className="absolute left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />

        {/* Step indicators */}
        {stepLabels.map((label, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            {/* Circle */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm
                transition-all duration-300 ease-out
                ${index < currentStep
                  ? 'bg-gradient-to-br from-teal-400 to-teal-500 text-navy-950 shadow-lg'
                  : index === currentStep
                    ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-navy-950 shadow-lg shadow-orange-500/30 scale-110'
                    : 'bg-navy-700 text-slate-500'
                }
              `}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Label */}
            <span
              className={`
                mt-2 text-xs font-medium transition-colors duration-300
                ${index <= currentStep ? 'text-slate-300' : 'text-slate-500'}
              `}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
