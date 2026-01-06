'use client'

import { CheckCircle2, Lock, ChevronRight } from 'lucide-react'
import type { Quest } from '@/lib/quest.store'

interface QuestCardProps {
  quest: Quest
  isActive: boolean
  onSelect: () => void
}

export function QuestCard({ quest, isActive, onSelect }: QuestCardProps) {
  const completedSteps = quest.steps.filter((s) => s.completed).length
  const totalSteps = quest.steps.length
  const progress = (completedSteps / totalSteps) * 100

  const isLocked = quest.status === 'locked'
  const isCompleted = quest.status === 'completed'

  return (
    <button
      onClick={onSelect}
      disabled={isLocked}
      className={`
        w-full p-4 rounded-2xl text-left transition-all duration-300
        border-2
        ${isCompleted
          ? 'border-teal-500/30 bg-teal-500/10'
          : isActive
          ? 'border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20'
          : isLocked
          ? 'border-white/5 bg-navy-800/50 opacity-60 cursor-not-allowed'
          : 'border-white/10 bg-navy-800 hover:border-white/20 hover:bg-navy-700'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`
            w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
            ${isCompleted
              ? 'bg-teal-500/20'
              : isLocked
              ? 'bg-navy-900/50'
              : 'bg-navy-900'
            }
          `}
        >
          {isLocked ? <Lock className="w-6 h-6 text-slate-600" /> : quest.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-display font-bold truncate ${
                isCompleted
                  ? 'text-teal-400'
                  : isActive
                  ? 'text-orange-400'
                  : isLocked
                  ? 'text-slate-500'
                  : 'text-cream-100'
              }`}
            >
              {quest.title}
            </h3>
            {isCompleted && <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />}
          </div>

          <p className={`text-sm mb-3 line-clamp-2 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
            {quest.description}
          </p>

          {/* Progress bar */}
          {!isLocked && (
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-navy-900 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCompleted
                      ? 'bg-teal-400'
                      : 'bg-gradient-to-r from-orange-400 to-orange-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className={isCompleted ? 'text-teal-400' : 'text-slate-500'}>
                  {completedSteps}/{totalSteps} steps
                </span>
                <span className={isCompleted ? 'text-teal-400' : 'text-orange-400'}>
                  +{quest.xpReward} XP
                </span>
              </div>
            </div>
          )}

          {/* Locked message */}
          {isLocked && (
            <div className="text-xs text-slate-600">
              Complete previous quests to unlock
            </div>
          )}
        </div>

        {/* Arrow */}
        {!isLocked && !isCompleted && (
          <ChevronRight
            className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-orange-400' : 'text-slate-500'}`}
          />
        )}
      </div>
    </button>
  )
}
