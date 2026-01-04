# Build Specifications (What to Tell Designers & Engineers)

---

## A. NON-NEGOTIABLE PRODUCT RULES

These are not suggestions. They are rules.

- ✔ **No walls of text.** One concept per screen.
- ✔ **Real brands, real tickers, real prices.** No fictional companies.
- ✔ **Simulation only.** No real-money mechanics in the product.
- ✔ **One daily portfolio snapshot.** Avoid day-trading dopamine loops.
- ✔ **Points ≠ money.** Points unlock learning/competition only.
- ✔ **Competition is composite-scored.** Returns-only scoring is banned.
- ✔ **Community is structured + moderated.** No DMs, no links, no hype posts.
- ✔ **Age banding on public views.** Opt-in leaderboards only.
- ✔ **Guardrails are hard-coded.** No penny stocks, no options, no leverage.

---

## B. UX ARCHITECTURE (What Pages You're Building)

### Marketing / Public Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page (dual pitch: kids + parents) |
| `/parents` | Parent trust page |
| `/how-it-works` | SEO-friendly explainer |
| `/pricing` | Pricing + FAQ |

### App Pages (Logged In)

| Route | Purpose |
|-------|---------|
| `/onboarding` | 4-step setup (username, age, sectors, portfolio) |
| `/portfolio` | Core dashboard (value, holdings, diversification) |
| `/sectors` | Browse all sectors |
| `/sector/:name` | Stocks in a sector |
| `/stock/:ticker` | Individual stock detail page |
| `/learn` | Learning hub + lessons (Levels 1–7) |
| `/games` | Create/join private games |
| `/games/:game-id` | Active game dashboard |
| `/leaderboards` | Friends + opt-in global leaderboards |
| `/community` | Moderated discussion board |
| `/profile` | User settings + profile |
| `/parent-dashboard` | Parent visibility + controls |

---

## C. DATA MODEL ESSENTIALS

**Build these schemas from day one. They will not change drastically.**

```
User {
  id: UUID
  username: string (unique, 3-20 chars)
  age_band: 'tween' | 'early_teen' | 'late_teen'
  created_at: timestamp
  last_login: timestamp
  parent_id?: UUID (link to parent account)
  learning_level: 1-7
  points: integer
  privacy_settings: object
}

Portfolio {
  id: UUID
  user_id: UUID
  cash_balance: float
  total_value: float (cash + positions)
  updated_at: timestamp
  positions: [Position]
}

Position {
  id: UUID
  portfolio_id: UUID
  ticker: string
  shares: integer
  avg_cost_per_share: float
  current_price: float
  current_value: float
  sector: string
  bought_at: timestamp
}

MarketData {
  ticker: string
  price: float
  previous_close: float
  change_percent: float
  updated_at: timestamp
  is_available: boolean
}

Learning {
  user_id: UUID
  level: 1-7
  lessons_completed: [lesson_id]
  quizzes_taken: integer
  concepts_mastered: [concept_id]
  unlocked_metrics: [metric_id] (e.g., 'pe_ratio', 'peg_ratio')
  progression_score: integer
}

Points {
  user_id: UUID
  total_points: integer
  earned_today: integer
  earned_this_week: integer
  last_portfolio_update: timestamp
  breakdown: {
    lessons_completed: integer
    quizzes_correct: integer
    reflections: integer
    green_days: integer
  }
}

Game {
  id: UUID
  creator_id: UUID
  name: string
  duration_days: 7 | 30 | 60
  starting_cash: 10000 | 25000 | 50000
  max_players: 2-10
  current_players: [user_id]
  created_at: timestamp
  ends_at: timestamp
  status: 'active' | 'completed'
  rules: object
}

Leaderboard {
  game_id?: UUID (null = global)
  entries: [{
    user_id: UUID
    rank: integer
    performance_score: float (0-100)
    diversification_score: float (0-100)
    consistency_score: float (0-100)
    learning_score: float (0-100)
    final_score: float (weighted composite)
  }]
}

CommunityPost {
  id: UUID
  user_id: UUID
  category: 'sectors' | 'learning' | 'market' | 'general'
  title: string
  body: string
  created_at: timestamp
  status: 'visible' | 'hidden' | 'removed'
  moderation_flags: integer
  replies: [Reply]
}

ParentAccount {
  id: UUID
  email: string
  linked_children: [user_id]
  preferences: {
    community_enabled: boolean
    leaderboard_visible: boolean
    tournament_participation: boolean
    email_frequency: 'weekly' | 'monthly' | 'never'
  }
}
```

---

## D. THE COMPOSITE SCORING FORMULA

**Implement this correctly from day one. Do not improvise later.**

```
FINAL_SCORE = (
  (portfolio_return_percentile × 0.50) +
  (diversification_score × 0.25) +
  (consistency_score × 0.15) +
  (learning_progress_score × 0.10)
) × 100
```

### Calculation Breakdown

**Portfolio Return Percentile (0–100)**
```
Your return vs all players this period
Returns ranked, converted to percentile (0–100)
Example: +15% return = 75th percentile = 75 points
```

**Diversification Score (0–100)**
```
Formula: 1 - (max_sector_allocation - target_allocation)
Example:
  - 100% in Tech = 0 points
  - 50% Tech, 50% Finance = 75 points
  - 25% in each of 4 sectors = 100 points
Target: No single sector > 40%
```

**Consistency Score (0–100)**
```
Formula: (green_days / total_days) × 100
Green day = portfolio value up from previous close
Example:
  - 10 green days out of 10 = 100 points
  - 7 green days out of 10 = 70 points
Penalty for single-day loss > 10% = -5 points
```

**Learning Progress Score (0–100)**
```
Formula: (current_level / 7) × 100 + bonus
Bonus: +10 points per lesson completed (max +70)
Example:
  - Level 3, 2 lessons = (3/7 × 100) + 20 = 62.9 points
  - Level 7, 7 lessons = (7/7 × 100) + 70 = 170 points (capped at 100)
```

**Testing the Formula**

Test case 1:
- Return: 75th percentile (75)
- Diversification: 80 points
- Consistency: 90 points
- Learning: 60 points
- **Final: (75 × 0.5) + (80 × 0.25) + (90 × 0.15) + (60 × 0.10) = 37.5 + 20 + 13.5 + 6 = 77 points**

Test case 2 (YOLO player):
- Return: 95th percentile (95) — got lucky
- Diversification: 10 points — all in one stock
- Consistency: 30 points — lots of volatility
- Learning: 40 points — didn't learn much
- **Final: (95 × 0.5) + (10 × 0.25) + (30 × 0.15) + (40 × 0.10) = 47.5 + 2.5 + 4.5 + 4 = 58.5 points**

**Balanced player beats YOLO player despite worse returns. System works.**

---

## E. GUARDRAILS (Engineering Must Enforce)

### Hard Blocks (Can Never Be Overridden)

- ❌ **Penny stocks:** Block any stock < $1
- ❌ **Options:** Don't even load options data
- ❌ **Leverage:** Cash balance cannot go negative
- ❌ **Crypto:** Explicitly filter tickers
- ❌ **Penny pumps:** Maintain block list for known trash

### Cooldowns & Rate Limits

- **Trade cooldown:** Max 1 transaction per ticker per player per day
- **Portfolio update frequency:** Once per day at market close (4 PM ET)
- **Daily points:** Calculate once per day, not real-time
- **Portfolio access:** Can view anytime, but only updates daily

### Content Moderation Filters

Auto-flag posts containing:
- "Buy now" / "Buy this"
- "Moon" / "YOLO" / "Get rich"
- "$$$" / "Lambo"
- Ticker symbols in non-analysis context
- External links
- Phone numbers / emails
- Profanity

Auto-remove posts with:
- 3+ flags
- Reported by 2+ moderators
- Explicit rule violations

---

## F. CONTENT CREATION SYSTEM (Creator Workflow)

Design a reusable "lesson object" so non-engineers can author content.

```
Lesson {
  id: string
  title: string
  description: string
  learning_level: 1-7
  estimated_time_minutes: integer
  unlock_requirement: {
    previous_level?: integer
    points_required?: integer
  }

  cards: [
    {
      type: 'explanation' | 'question' | 'reflection'
      title?: string
      body: string
      image_url?: string
    }
  ]

  quiz: [
    {
      question: string
      options: [string, string, string, string]
      correct_answer: integer
      explanation_correct: string
      explanation_wrong: string
      points_for_correct: integer
    }
  ]

  real_world_example: {
    ticker?: string
    context: string
    metric_to_check: string
  }

  metrics_unlocked: [string]
  points_on_completion: integer
  estimated_completion_time: integer
}
```

**Content team can author lessons in JSON without coding.**

---

## G. DESIGN LANGUAGE (What It Should Look Like)

### Visual Style

- **Clean-modern** UI with game edge
- **Motion & microinteractions** (but not excessive)
- **Bright accents,** not childish (no cartoon characters)
- **Clear icons** for sectors/companies
- **Progress visualization** (bars, unlocks, "level up" moments)
- **Portfolio emphasis** (large, readable)
- **Responsive:** Works perfectly on mobile (primary platform)

### Typography & Color

- **Headline:** Bold, modern (Montserrat, Inter, or similar)
- **Body:** Clear, readable (Open Sans, Roboto)
- **Primary color:** Dynamic blue or teal (competitive, not childish)
- **Success:** Green (gains, achievements)
- **Caution:** Orange/red (losses, risks)
- **Neutral:** Grays for secondary information

### Component Library Must Include

- Button (primary, secondary, disabled states)
- Card (holding, stock, sector)
- Badge (achievement, unlock)
- Progress bar (level, daily)
- Modal (buy/sell confirmation)
- Toast (notifications—minimal, no ding sounds)
- Input field (username, trade quantity)
- Chart (portfolio value over time, sector allocation)

### Animation Principles

- **Micro-interactions:** Buttons respond to clicks
- **Page transitions:** Smooth, not jarring
- **Achievement unlocks:** Celebratory but brief
- **No excessive animations:** They feel childish

---

## H. API REQUIREMENTS

### Stock Data API

You need:
- Real-time stock prices (at least daily)
- Historical pricing (for charting)
- Company fundamentals (market cap, P/E, growth %)
- News/events (earnings dates, splits)

**Recommended providers:** Finnhub, Alpha Vantage, IEX Cloud

**Update frequency:** Daily close is sufficient for MVP. Real-time optional for Phase 2.

### Key Endpoints You'll Build

```
GET /api/portfolio — User's current portfolio
GET /api/portfolio/history — Historical portfolio value
GET /api/stock/:ticker — Stock details + fundamentals
GET /api/sectors — All sectors + top stocks
GET /api/learn/lessons — Available lessons
POST /api/learn/quiz/:quiz-id — Submit quiz answer
GET /api/games — User's games
POST /api/games — Create new game
GET /api/leaderboard — Composite scores
POST /api/community/post — Create discussion post
```

---

## I. TECH STACK RECOMMENDATIONS (MVP)

| Layer | Recommendation |
|-------|-----------------|
| Frontend | React / Next.js (TypeScript) |
| Backend | Node.js + Express or Python + FastAPI |
| Database | PostgreSQL (relational, ACID, good for financial data) |
| Real-time | WebSockets or Server-Sent Events (optional for MVP) |
| Auth | Firebase Auth or custom JWT |
| Stock Data | Finnhub API |
| Hosting | AWS (EC2, RDS) or Heroku |
| CDN | CloudFlare (free tier fine for start) |

---

## J. TESTING REQUIREMENTS

Before launch:
- [ ] Composite scoring logic tested with 100 scenarios
- [ ] Portfolio calculations accurate to cent
- [ ] No negative cash balances (ever)
- [ ] Daily snapshot occurs at exact market close time
- [ ] Content moderation filters tested with banned phrases
- [ ] Age verification works (no child can access 16+ features)
- [ ] Parent dashboard shows correct child data
- [ ] All guardrails enforced (can't trade penny stocks, etc.)
- [ ] Mobile UX works on iPhone and Android

---

## K. DEPLOYMENT CHECKLIST

- [ ] Prod database backed up daily
- [ ] Error tracking (Sentry) configured
- [ ] Analytics configured (Amplitude or Mixpanel)
- [ ] Legal/compliance review complete
- [ ] Privacy policy written and published
- [ ] Terms of service written and published
- [ ] Parent onboarding tested end-to-end
- [ ] Kid onboarding tested end-to-end
- [ ] 24-hour monitoring plan for launch week
- [ ] Rollback procedure documented

---

## L. POST-LAUNCH MONITORING

Track these metrics hourly for first week:

- Signups per hour
- Onboarding completion rate
- Portfolio creation rate (% who buy first stock)
- Day-1 retention
- Errors / bugs reported
- API response times
- Community moderation load

If any metric is off, be ready to roll back or hotfix.
