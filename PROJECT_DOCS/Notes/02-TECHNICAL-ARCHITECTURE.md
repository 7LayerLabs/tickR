# TickR - Technical Architecture

## Technology Stack

### Frontend (Current Implementation)
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Zustand** | 4.x | State management with persistence |
| **TanStack Query** | 5.x | Server state management |
| **Lucide React** | - | Icon library |
| **Recharts** | - | Charting library |

### State Management
| Store | Purpose |
|-------|---------|
| **useGameStore** | Central game state (Zustand + localStorage) |
| **useAuth** | Authentication state |
| **React Query** | API data caching |

---

## Project Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Landing page
│   │   ├── layout.tsx           # Root layout
│   │   ├── auth/                # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── dashboard/           # Main app (authenticated)
│   │       ├── layout.tsx       # Dashboard shell (sidebar, header)
│   │       ├── portfolio/       # User's holdings
│   │       ├── stocks/          # Stock explorer
│   │       ├── stock/[ticker]/  # Individual stock details
│   │       ├── learn/           # Learning center
│   │       ├── achievements/    # Badges/achievements
│   │       └── leaderboard/     # Rankings
│   │
│   ├── components/              # Shared components
│   │   └── Providers.tsx        # Context providers wrapper
│   │
│   ├── lib/                     # Utilities and stores
│   │   ├── game.store.ts        # ⭐ Central game state
│   │   ├── auth.store.ts        # Authentication
│   │   └── api.ts               # API client
│   │
│   └── types/                   # TypeScript definitions
│       └── index.ts
│
├── public/
│   └── images/                  # Static assets
│
├── PROJECT-DOCS/
│   └── notes/                   # This documentation
│
└── package.json
```

---

## Core Data Model

### Game State (game.store.ts)

```typescript
interface GameState {
  // User Profile
  username: string
  level: number           // 1-15
  xp: number             // Total experience points
  xpToNextLevel: number

  // Finances
  cashBalance: number    // Available cash ($10,000 starting)
  startingBalance: number

  // Portfolio
  positions: Position[]  // Current holdings
  tradeHistory: Trade[]  // All past trades

  // Learning
  lessonProgress: LessonProgress[]
  completedPaths: string[]

  // Gamification
  achievements: Achievement[]
  dailyChallenges: DailyChallenge[]
  currentStreak: number
  longestStreak: number
  lastLoginDate: string
  totalTrades: number
  totalLessonsCompleted: number
  totalQuizzesPassed: number

  // Timestamps
  accountCreatedAt: string
  lastUpdated: string
}
```

### Position (Stock Holding)
```typescript
interface Position {
  ticker: string          // e.g., "AAPL"
  companyName: string     // e.g., "Apple Inc."
  shares: number          // Quantity owned
  avgCost: number         // Average purchase price
  purchaseDate: string    // ISO timestamp
}
```

### Trade (Transaction Record)
```typescript
interface Trade {
  id: string
  ticker: string
  companyName: string
  type: 'buy' | 'sell'
  shares: number
  price: number           // Price per share
  total: number           // Total transaction value
  timestamp: string
}
```

### Achievement
```typescript
interface Achievement {
  id: string              // e.g., "first_trade"
  name: string            // e.g., "First Trade!"
  description: string
  icon: string            // Emoji
  unlockedAt?: string     // When unlocked (undefined = locked)
  progress?: number       // Current progress
  maxProgress?: number    // Target for unlock
}
```

### Daily Challenge
```typescript
interface DailyChallenge {
  id: string
  title: string
  description: string
  type: 'trade' | 'learn' | 'quiz' | 'explore'
  target: number          // Goal to complete
  progress: number        // Current progress
  xpReward: number
  completed: boolean
  expiresAt: string       // Resets daily
}
```

---

## State Management Architecture

### Zustand Store with Persistence

```typescript
export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Trading actions
      buyStock: (ticker, shares, price) => { ... },
      sellStock: (ticker, shares, price) => { ... },

      // Learning actions
      completeLesson: (lessonId, pathId) => { ... },
      submitQuiz: (lessonId, pathId, score, total) => { ... },

      // Gamification actions
      addXp: (amount, reason) => { ... },
      checkAndUnlockAchievements: () => { ... },
      updateChallengeProgress: (type, amount) => { ... },

      // Streak management
      checkDailyLogin: () => { ... },
    }),
    {
      name: 'tickr-game-state',  // localStorage key
      version: 1,
    }
  )
)
```

### Why Zustand?
1. **Simplicity** - Minimal boilerplate vs Redux
2. **Persistence** - Built-in localStorage middleware
3. **Performance** - Fine-grained subscriptions
4. **TypeScript** - Excellent type inference
5. **No Providers** - Works anywhere in React tree

---

## Data Flow

### Trading Flow
```
User clicks "Buy" button
        ↓
BuyModal captures shares quantity
        ↓
buyStock(ticker, shares, price) called
        ↓
Zustand store updates:
  - positions (add/update holding)
  - cashBalance (deduct cost)
  - tradeHistory (add record)
  - totalTrades++
        ↓
Side effects trigger:
  - addXp(25, 'Stock purchase')
  - updateChallengeProgress('trade')
  - checkAndUnlockAchievements()
        ↓
UI re-renders with new state
        ↓
localStorage persists automatically
```

### Learning Flow
```
User completes lesson content
        ↓
User takes quiz
        ↓
submitQuiz(lessonId, pathId, score, total)
        ↓
If passed (≥70%):
  - lessonProgress updated
  - totalQuizzesPassed++
  - XP awarded (75 or 150 for perfect)
  - Challenge progress updated
  - Achievements checked
        ↓
completeLesson(lessonId, pathId)
        ↓
Additional XP (50) awarded
Achievement check for learning milestones
```

### Daily Login Flow
```
App loads / User navigates to dashboard
        ↓
checkDailyLogin() called
        ↓
Compare lastLoginDate to today
        ↓
If new day:
  - Update streak (increment or reset)
  - Award daily login XP (10)
  - Refresh daily challenges
  - Check streak achievements
        ↓
If same day: no-op
```

---

## Page Architecture

### Landing Page (`/`)
- Static marketing content
- No authentication required
- Redirects to portfolio if already logged in

### Dashboard Layout (`/dashboard/layout.tsx`)
- Persistent sidebar navigation
- Header with cash balance
- User profile card with XP progress
- Streak display
- Mobile-responsive drawer

### Portfolio (`/dashboard/portfolio`)
- Holdings list with sell buttons
- Portfolio value summary
- Daily challenges widget
- Recent trades history
- Sector diversification chart

### Stock Explorer (`/dashboard/stocks`)
- Search functionality
- Sector filters
- Trending stocks section
- Stock cards with price/change

### Stock Detail (`/dashboard/stock/[ticker]`)
- Price chart
- Buy/Sell modals
- Company overview
- Key statistics with explanations
- Position info (if owned)

### Learn (`/dashboard/learn`)
- Learning paths grid
- Progress tracking
- Lesson detail view
- Interactive quizzes
- XP notifications

### Achievements (`/dashboard/achievements`)
- Badge gallery
- Progress indicators
- Locked/unlocked states
- XP earning guide

### Leaderboard (`/dashboard/leaderboard`)
- Multiple rankings (XP, Portfolio, Streak)
- User position highlight
- Motivational messages

---

## Stock Data

### Current Implementation (Mock Data)
```typescript
export const BASE_STOCK_PRICES: Record<string, { price: number; name: string }> = {
  AAPL: { price: 277.18, name: 'Apple Inc.' },
  NVDA: { price: 184.90, name: 'NVIDIA Corporation' },
  TSLA: { price: 446.07, name: 'Tesla, Inc.' },
  // ... 20 stocks total
}
```

### Stock Categories
- **Technology**: AAPL, NVDA, GOOGL, MSFT, META, AMD
- **Entertainment**: NFLX, DIS, SPOT
- **Gaming**: RBLX, EA, TTWO
- **Automotive**: TSLA
- **Consumer**: NKE, UBER, SNAP
- **Food & Beverage**: SBUX, MCD, KO

### Price Simulation
```typescript
getSimulatedPrice: (ticker) => {
  const basePrice = BASE_STOCK_PRICES[ticker]?.price
  // Add ±2% random fluctuation
  const fluctuation = (Math.random() - 0.5) * 0.04
  return basePrice * (1 + fluctuation)
}
```

---

## Persistence Strategy

### localStorage Schema
```json
{
  "tickr-game-state": {
    "state": {
      "username": "DemoTrader",
      "level": 3,
      "xp": 1250,
      "cashBalance": 8750.50,
      "positions": [...],
      "achievements": [...],
      // ... full state
    },
    "version": 1
  }
}
```

### Benefits
- Works offline
- Instant load (no API wait)
- Privacy (data stays on device)
- Simple implementation

### Limitations
- Single device only
- No cloud sync (yet)
- Limited storage size
- Can be cleared by user

---

## Component Patterns

### Modal Pattern
```typescript
const [showModal, setShowModal] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)

// Open
<button onClick={() => {
  setSelectedItem(item)
  setShowModal(true)
}}>

// Modal
{showModal && (
  <Modal onClose={() => setShowModal(false)}>
    <Content item={selectedItem} />
  </Modal>
)}
```

### Toast/Notification Pattern
```typescript
const [successMessage, setSuccessMessage] = useState('')

// After action
setSuccessMessage('Trade successful!')
setTimeout(() => setSuccessMessage(''), 4000)

// Render
{successMessage && (
  <div className="fixed top-4 right-4 z-50">
    <Toast>{successMessage}</Toast>
  </div>
)}
```

---

## Performance Considerations

### Bundle Optimization
- Next.js automatic code splitting
- Dynamic imports for heavy components
- Image optimization with next/image

### State Performance
- Zustand selector subscriptions
- Memoization where needed
- Avoid unnecessary re-renders

### Future Optimizations
- React Server Components for static content
- Suspense boundaries for loading states
- Virtual scrolling for long lists

---

## Security Notes

### Current (Demo Mode)
- No real authentication required
- Data stored locally only
- No sensitive financial data

### Production Considerations
- Implement proper auth (OAuth, etc.)
- Server-side data validation
- Rate limiting on API calls
- Input sanitization
- HTTPS enforcement

---

## Document Navigation

- [01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) - Vision and goals
- [03-GAME-MECHANICS.md](./03-GAME-MECHANICS.md) - XP, levels, achievements
- [04-FEATURES-GUIDE.md](./04-FEATURES-GUIDE.md) - Complete feature breakdown
- [05-LEARNING-CURRICULUM.md](./05-LEARNING-CURRICULUM.md) - Educational content
- [06-UI-UX-DESIGN.md](./06-UI-UX-DESIGN.md) - Design system
- [07-FUTURE-ROADMAP.md](./07-FUTURE-ROADMAP.md) - What's next
