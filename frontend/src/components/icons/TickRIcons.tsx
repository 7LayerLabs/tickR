'use client'

import React from 'react'

interface IconProps {
  size?: number
  className?: string
}

// Glossy 3D Icon wrapper with consistent styling
const IconWrapper: React.FC<{
  children: React.ReactNode
  size: number
  bgGradient: string
  shadowColor: string
  className?: string
}> = ({ children, size, bgGradient, shadowColor, className = '' }) => (
  <div
    className={`relative inline-flex items-center justify-center rounded-2xl ${className}`}
    style={{
      width: size,
      height: size,
      background: bgGradient,
      boxShadow: `
        0 ${size * 0.1}px ${size * 0.3}px ${shadowColor},
        0 ${size * 0.02}px ${size * 0.05}px rgba(0,0,0,0.2),
        inset 0 ${size * 0.02}px ${size * 0.05}px rgba(255,255,255,0.4),
        inset 0 -${size * 0.02}px ${size * 0.05}px rgba(0,0,0,0.1)
      `,
    }}
  >
    {/* Glossy highlight overlay */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)',
      }}
    />
    {children}
  </div>
)

// Portfolio/Chart Icon - Rising chart with bars
export const PortfolioIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #fb923c 0%, #f97316 50%, #ea580c 100%)"
    shadowColor="rgba(249, 115, 22, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Bar chart */}
      <rect x="3" y="14" width="4" height="7" rx="1" fill="#fef3c7" />
      <rect x="10" y="10" width="4" height="11" rx="1" fill="#fef3c7" />
      <rect x="17" y="6" width="4" height="15" rx="1" fill="#fef3c7" />
      {/* Rising line */}
      <path
        d="M4 12L10 8L16 10L21 4"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="4" r="2" fill="#0a0e1a" />
    </svg>
  </IconWrapper>
)

// Learn/Education Icon - Book with lightbulb
export const LearnIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #facc15 0%, #eab308 50%, #ca8a04 100%)"
    shadowColor="rgba(234, 179, 8, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Book */}
      <path
        d="M4 19.5A2.5 2.5 0 016.5 17H20"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
        fill="#fefce8"
        stroke="#0a0e1a"
        strokeWidth="2"
      />
      {/* Lightbulb */}
      <circle cx="12" cy="9" r="3" fill="#f97316" />
      <path d="M10.5 12.5V14H13.5V12.5" stroke="#0a0e1a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 6V5" stroke="#0a0e1a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 9H16" stroke="#0a0e1a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 9H9" stroke="#0a0e1a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </IconWrapper>
)

// Trophy/Achievement Icon
export const TrophyIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #fde047 0%, #facc15 50%, #eab308 100%)"
    shadowColor="rgba(250, 204, 21, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Trophy cup */}
      <path
        d="M8 21H16"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17V21"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 4H17V10C17 13.3137 14.7614 16 12 16C9.23858 16 7 13.3137 7 10V4Z"
        fill="#fefce8"
        stroke="#0a0e1a"
        strokeWidth="2"
      />
      {/* Handles */}
      <path
        d="M17 7H19C20.1046 7 21 7.89543 21 9V9C21 10.1046 20.1046 11 19 11H17"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 7H5C3.89543 7 3 7.89543 3 9V9C3 10.1046 3.89543 11 5 11H7"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Star */}
      <path
        d="M12 7L12.5 8.5H14L12.75 9.5L13.25 11L12 10L10.75 11L11.25 9.5L10 8.5H11.5L12 7Z"
        fill="#f97316"
      />
    </svg>
  </IconWrapper>
)

// Trade/Exchange Icon - Two arrows
export const TradeIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #2dd4bf 0%, #14b8a6 50%, #0d9488 100%)"
    shadowColor="rgba(20, 184, 166, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Up arrow */}
      <path
        d="M7 17L7 7M7 7L3 11M7 7L11 11"
        stroke="#f0fdfa"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Down arrow */}
      <path
        d="M17 7L17 17M17 17L13 13M17 17L21 13"
        stroke="#0a0e1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
)

// Leaderboard Icon - Podium with people
export const LeaderboardIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #fb7185 0%, #f43f5e 50%, #e11d48 100%)"
    shadowColor="rgba(244, 63, 94, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Podium bars */}
      <rect x="2" y="14" width="6" height="8" rx="1" fill="#fecdd3" />
      <rect x="9" y="8" width="6" height="14" rx="1" fill="#fef3c7" />
      <rect x="16" y="11" width="6" height="11" rx="1" fill="#fecdd3" />
      {/* Numbers */}
      <text x="5" y="19" textAnchor="middle" fill="#0a0e1a" fontSize="5" fontWeight="bold">3</text>
      <text x="12" y="14" textAnchor="middle" fill="#0a0e1a" fontSize="5" fontWeight="bold">1</text>
      <text x="19" y="17" textAnchor="middle" fill="#0a0e1a" fontSize="5" fontWeight="bold">2</text>
      {/* Crown on #1 */}
      <path d="M9 6L12 3L15 6L14 7H10L9 6Z" fill="#facc15" stroke="#0a0e1a" strokeWidth="0.5" />
    </svg>
  </IconWrapper>
)

// Wallet/Money Icon
export const WalletIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #a3e635 0%, #84cc16 50%, #65a30d 100%)"
    shadowColor="rgba(132, 204, 22, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Wallet body */}
      <rect x="2" y="6" width="20" height="14" rx="3" fill="#fefce8" stroke="#0a0e1a" strokeWidth="2" />
      {/* Flap */}
      <path d="M2 9C2 7.34315 3.34315 6 5 6H19C20.6569 6 22 7.34315 22 9" stroke="#0a0e1a" strokeWidth="2" />
      {/* Card slot */}
      <rect x="14" y="11" width="6" height="5" rx="1" fill="#84cc16" stroke="#0a0e1a" strokeWidth="1" />
      <circle cx="17" cy="13.5" r="1.5" fill="#fefce8" />
      {/* Dollar sign */}
      <text x="8" y="16" textAnchor="middle" fill="#0a0e1a" fontSize="8" fontWeight="bold">$</text>
    </svg>
  </IconWrapper>
)

// Stock/Market Icon - Candlestick chart
export const StockIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)"
    shadowColor="rgba(59, 130, 246, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Candlesticks */}
      <line x1="5" y1="4" x2="5" y2="20" stroke="#dbeafe" strokeWidth="1" />
      <rect x="3" y="8" width="4" height="6" rx="0.5" fill="#22c55e" />

      <line x1="12" y1="3" x2="12" y2="18" stroke="#dbeafe" strokeWidth="1" />
      <rect x="10" y="6" width="4" height="8" rx="0.5" fill="#ef4444" />

      <line x1="19" y1="5" x2="19" y2="21" stroke="#dbeafe" strokeWidth="1" />
      <rect x="17" y="9" width="4" height="7" rx="0.5" fill="#22c55e" />
    </svg>
  </IconWrapper>
)

// Shield/Safety Icon
export const SafetyIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #5eead4 0%, #2dd4bf 50%, #14b8a6 100%)"
    shadowColor="rgba(45, 212, 191, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Shield */}
      <path
        d="M12 2L4 6V12C4 16.4183 7.58172 20 12 22C16.4183 20 20 16.4183 20 12V6L12 2Z"
        fill="#f0fdfa"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Checkmark */}
      <path
        d="M8 12L11 15L16 9"
        stroke="#14b8a6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
)

// Target/Goal Icon
export const GoalIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #fdba74 0%, #fb923c 50%, #f97316 100%)"
    shadowColor="rgba(251, 146, 60, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Target rings */}
      <circle cx="12" cy="12" r="10" fill="#fef3c7" stroke="#0a0e1a" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" fill="#fed7aa" stroke="#0a0e1a" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#f97316" />
      {/* Arrow */}
      <path
        d="M12 12L19 5M19 5H15M19 5V9"
        stroke="#0a0e1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
)

// Rocket/Level Up Icon
export const RocketIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #c4b5fd 0%, #a78bfa 50%, #8b5cf6 100%)"
    shadowColor="rgba(167, 139, 250, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Rocket body */}
      <path
        d="M12 2C12 2 8 6 8 12C8 16 10 19 12 21C14 19 16 16 16 12C16 6 12 2 12 2Z"
        fill="#faf5ff"
        stroke="#0a0e1a"
        strokeWidth="2"
      />
      {/* Window */}
      <circle cx="12" cy="10" r="2" fill="#8b5cf6" stroke="#0a0e1a" strokeWidth="1" />
      {/* Fins */}
      <path d="M8 14L5 17L8 16" fill="#e9d5ff" stroke="#0a0e1a" strokeWidth="1" />
      <path d="M16 14L19 17L16 16" fill="#e9d5ff" stroke="#0a0e1a" strokeWidth="1" />
      {/* Flame */}
      <path d="M10 21L12 24L14 21" fill="#fb923c" stroke="#f97316" strokeWidth="0.5" />
    </svg>
  </IconWrapper>
)

// News/Info Icon
export const NewsIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #94a3b8 0%, #64748b 50%, #475569 100%)"
    shadowColor="rgba(100, 116, 139, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Paper */}
      <rect x="4" y="3" width="16" height="18" rx="2" fill="#f1f5f9" stroke="#0a0e1a" strokeWidth="2" />
      {/* Lines */}
      <line x1="8" y1="8" x2="16" y2="8" stroke="#0a0e1a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="16" x2="12" y2="16" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      {/* Badge */}
      <circle cx="18" cy="5" r="3" fill="#f97316" stroke="#0a0e1a" strokeWidth="1" />
    </svg>
  </IconWrapper>
)

// Brain/Strategy Icon
export const StrategyIcon: React.FC<IconProps> = ({ size = 64, className }) => (
  <IconWrapper
    size={size}
    bgGradient="linear-gradient(145deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)"
    shadowColor="rgba(245, 158, 11, 0.4)"
    className={className}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Brain outline */}
      <path
        d="M12 4C8 4 6 6.5 6 9C4.5 9 3 10.5 3 12.5C3 14.5 4.5 16 6 16C6 18.5 8 21 12 21C16 21 18 18.5 18 16C19.5 16 21 14.5 21 12.5C21 10.5 19.5 9 18 9C18 6.5 16 4 12 4Z"
        fill="#fef3c7"
        stroke="#0a0e1a"
        strokeWidth="2"
      />
      {/* Brain details */}
      <path d="M12 8V16" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 10C9 10 10 11 10 12C10 13 9 14 9 14" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 10C15 10 14 11 14 12C14 13 15 14 15 14" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </IconWrapper>
)

// Export all icons
export const TickRIcons = {
  Portfolio: PortfolioIcon,
  Learn: LearnIcon,
  Trophy: TrophyIcon,
  Trade: TradeIcon,
  Leaderboard: LeaderboardIcon,
  Wallet: WalletIcon,
  Stock: StockIcon,
  Safety: SafetyIcon,
  Goal: GoalIcon,
  Rocket: RocketIcon,
  News: NewsIcon,
  Strategy: StrategyIcon,
}

export default TickRIcons
