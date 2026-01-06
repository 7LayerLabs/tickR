'use client'

import { useState } from 'react'
import { X, Target, CheckCircle2, ChevronRight } from 'lucide-react'
import { useQuestStore, useActiveQuest } from '@/lib/quest.store'
import { QuestCard } from './QuestCard'
import type { Quest } from '@/lib/quest.store'

interface QuestHubProps {
  isOpen: boolean
  onClose: () => void
}

export function QuestHub({ isOpen, onClose }: QuestHubProps) {
  const { quests } = useQuestStore()
  const activeQuest = useActiveQuest()
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  if (!isOpen) return null

  const completedQuests = quests.filter((q) => q.status === 'completed').length
  const totalQuests = quests.length

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[80vh] z-50 flex flex-col bg-navy-800 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-cream-100">Quest Hub</h2>
                <p className="text-sm text-slate-400">
                  {completedQuests}/{totalQuests} quests completed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedQuest ? (
            // Quest Detail View
            <QuestDetail
              quest={selectedQuest}
              onBack={() => setSelectedQuest(null)}
            />
          ) : (
            // Quest List View
            <div className="space-y-4">
              {/* Active quest highlight */}
              {activeQuest && activeQuest.status === 'active' && (
                <div className="mb-6">
                  <div className="text-xs font-display font-semibold text-orange-400 uppercase tracking-wider mb-2">
                    Current Quest
                  </div>
                  <QuestCard
                    quest={activeQuest}
                    isActive={true}
                    onSelect={() => setSelectedQuest(activeQuest)}
                  />
                </div>
              )}

              {/* All quests */}
              <div>
                <div className="text-xs font-display font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  All Quests
                </div>
                <div className="space-y-3">
                  {quests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      isActive={quest.id === activeQuest?.id}
                      onSelect={() => quest.status !== 'locked' && setSelectedQuest(quest)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Quest Detail View
interface QuestDetailProps {
  quest: Quest
  onBack: () => void
}

function QuestDetail({ quest, onBack }: QuestDetailProps) {
  const completedSteps = quest.steps.filter((s) => s.completed).length
  const isCompleted = quest.status === 'completed'

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-400 hover:text-cream-100 mb-4 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to quests
      </button>

      {/* Quest header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
            isCompleted ? 'bg-teal-500/20' : 'bg-navy-900'
          }`}
        >
          {quest.icon}
        </div>
        <div className="flex-1">
          <h3
            className={`text-2xl font-display font-bold mb-1 ${
              isCompleted ? 'text-teal-400' : 'text-cream-100'
            }`}
          >
            {quest.title}
          </h3>
          <p className="text-slate-400">{quest.description}</p>
        </div>
      </div>

      {/* Rewards */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30">
          <span className="text-orange-400 font-display font-bold">+{quest.xpReward} XP</span>
        </div>
        {quest.badgeReward && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/30">
            <span className="text-gold-400 font-display font-bold">{quest.badgeReward} Badge</span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Progress</span>
          <span className={isCompleted ? 'text-teal-400' : 'text-orange-400'}>
            {completedSteps}/{quest.steps.length} steps
          </span>
        </div>
        <div className="h-3 rounded-full bg-navy-900 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted
                ? 'bg-teal-400'
                : 'bg-gradient-to-r from-orange-400 to-orange-500'
            }`}
            style={{ width: `${(completedSteps / quest.steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div>
        <div className="text-xs font-display font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Steps
        </div>
        <div className="space-y-3">
          {quest.steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border ${
                step.completed
                  ? 'bg-teal-500/10 border-teal-500/30'
                  : 'bg-navy-900 border-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Step number or checkmark */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    step.completed
                      ? 'bg-teal-500/20'
                      : 'bg-navy-800'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  ) : (
                    <span className="text-sm font-bold text-slate-500">{index + 1}</span>
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-display font-semibold ${
                      step.completed ? 'text-teal-400' : 'text-cream-100'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-400">{step.description}</p>

                  {/* Progress bar for multi-target steps */}
                  {step.target > 1 && !step.completed && (
                    <div className="mt-2">
                      <div className="h-1.5 rounded-full bg-navy-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-orange-400"
                          style={{ width: `${(step.progress / step.target) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {step.progress}/{step.target}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// =====================================================
//   QUEST BUTTON - Floating button to open Quest Hub
// =====================================================

interface QuestButtonProps {
  onClick: () => void
}

export function QuestButton({ onClick }: QuestButtonProps) {
  const activeQuest = useActiveQuest()
  const completedSteps = activeQuest?.steps.filter((s) => s.completed).length || 0
  const totalSteps = activeQuest?.steps.length || 1
  const progress = (completedSteps / totalSteps) * 100

  if (!activeQuest || activeQuest.status === 'completed') {
    return null
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-2xl bg-navy-800 border border-orange-500/30 shadow-lg shadow-orange-500/20 hover:border-orange-400 hover:shadow-orange-500/30 transition-all group"
    >
      {/* Progress ring */}
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#fb923c"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg">
          {activeQuest.icon}
        </span>
      </div>

      {/* Quest info */}
      <div className="text-left">
        <div className="text-xs text-orange-400 font-display font-semibold uppercase tracking-wide">
          Active Quest
        </div>
        <div className="text-sm text-cream-100 font-semibold truncate max-w-[120px]">
          {activeQuest.title}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
    </button>
  )
}
