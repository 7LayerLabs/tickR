'use client'

type AgeBand = 'TWEEN' | 'EARLY_TEEN' | 'LATE_TEEN'

interface AgeBandStepProps {
  value: AgeBand | null
  onChange: (value: AgeBand) => void
  onNext: () => void
  onBack: () => void
}

const ageBands: { value: AgeBand; label: string; range: string; icon: string; color: string }[] = [
  {
    value: 'TWEEN',
    label: '12-13',
    range: 'Tween',
    icon: '🛹',
    color: 'cyan'
  },
  {
    value: 'EARLY_TEEN',
    label: '14-15',
    range: 'Early Teen',
    icon: '🚀',
    color: 'orange'
  },
  {
    value: 'LATE_TEEN',
    label: '16',
    range: 'Late Teen',
    icon: '🎓',
    color: 'purple'
  }
]

export default function AgeBandStep({ value, onChange, onNext, onBack }: AgeBandStepProps) {
  const isValid = value !== null

  return (
    <div className="text-center animate-fade-in">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
        <svg className="w-8 h-8 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
        How <span className="display-accent">old</span> are you?
      </h2>

      <p className="text-slate-400 mb-8">
        This helps us show you the right content
      </p>

      {/* Age band cards */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
        {ageBands.map((band) => {
          const isSelected = value === band.value
          const colorClassMap: Record<string, { selected: string; glow: string }> = {
            cyan: {
              selected: 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20',
              glow: 'bg-cyan-400'
            },
            orange: {
              selected: 'border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20',
              glow: 'bg-orange-400'
            },
            purple: {
              selected: 'border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20',
              glow: 'bg-purple-400'
            }
          }
          const colorClasses = colorClassMap[band.color] || colorClassMap.cyan

          return (
            <button
              key={band.value}
              onClick={() => onChange(band.value)}
              className={`
                relative p-5 rounded-2xl border-2 transition-all duration-300 ease-out
                ${isSelected
                  ? `${colorClasses.selected} scale-105`
                  : 'border-white/10 bg-navy-800 hover:border-white/20 hover:bg-navy-700'
                }
              `}
            >
              {/* Selection indicator dot */}
              {isSelected && (
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${colorClasses.glow} animate-pulse`} />
              )}

              {/* Icon */}
              <div className="text-3xl mb-2">{band.icon}</div>

              {/* Age range */}
              <div className={`text-2xl font-display font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {band.label}
              </div>

              {/* Label */}
              <div className="text-xs text-slate-500 mt-1">
                {band.range}
              </div>
            </button>
          )
        })}
      </div>

      {/* Privacy note */}
      <p className="text-xs text-slate-500 mb-8">
        We use this to personalize your learning experience
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
