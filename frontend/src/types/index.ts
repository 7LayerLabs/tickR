export type AgeBand = 'TWEEN' | 'EARLY_TEEN' | 'LATE_TEEN';

export interface User {
  id: string;
  username: string;
  ageBand: AgeBand;
  learningLevel: number;
  points: number;
  createdAt: string;
  lastLogin?: string;
}

export interface Portfolio {
  totalValue: number;
  cashBalance: number;
  dailyChange: number;
  dailyChangePercent: number;
  positions: Position[];
}

export interface Position {
  id: string;
  ticker: string;
  shares: number;
  avgCostPerShare: number;
  currentPrice: number;
  currentValue: number;
  sector: string;
  percentOfPortfolio: number;
}

export interface Stock {
  ticker: string;
  companyName: string;
  sector: string;
  price: number;
  previousClose: number;
  changePercent: number;
  whatCompanyDoes: string;
  whyPeopleKnowIt: string[];
  revenueBreakdown: Array<{
    source: string;
    percent: number;
    icon: string;
  }>;
  stats: {
    marketCap?: number;
    peRatio?: number;
    pegRatio?: number;
    growthPercent?: number;
  };
  isAvailable: boolean;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  learningLevel: number;
  estimatedMinutes: number;
  pointsOnCompletion: number;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface LessonContent extends Lesson {
  cards: Array<{
    type: 'explanation' | 'question' | 'reflection';
    title?: string;
    body: string;
    image_url?: string;
    options?: string[];
    correctAnswer?: number;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correct_answer: number;
    explanation_correct: string;
    explanation_wrong: string;
    points_for_correct: number;
  }>;
  realWorldExample?: {
    ticker?: string;
    context: string;
    metric_to_check: string;
  };
  metricsUnlocked: string[];
}

export interface Transaction {
  id: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  timestamp: string;
}

export interface Sector {
  name: string;
  displayName: string;
  description: string;
  icon?: string;
  isStarter: boolean;
  unlockLevel: number;
  unlockPoints: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
