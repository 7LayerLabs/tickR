# TickR - Investment Education Platform

Learn to invest with real stocks, play money, and games designed for kids ages 12-16.

## 🎯 What is TickR?

TickR is a gamified investment education platform that teaches kids fundamental investing concepts while they manage a virtual portfolio using real stock prices. It combines education with engaging gameplay to make learning about stocks fun and accessible.

**Key Features:**
- 📱 Real stock data from Finnhub API
- 💰 $10,000 play money per user (no real money)
- 📈 Real-time portfolio tracking
- 🎓 Progressive learning system (Levels 1-7)
- 🎮 Multiplayer games and competitions
- 📊 Composite scoring (prevents YOLO behavior)
- 👨‍👩‍👧‍👦 Parent dashboard & controls
- ⚡ Daily portfolio snapshots at market close

## 📋 Project Status

### Phase 1 MVP: Complete ✅
- ✅ Backend infrastructure (Express + Node.js)
- ✅ Frontend framework (Next.js 14)
- ✅ Database schema (Prisma + PostgreSQL)
- ✅ User authentication (JWT)
- ✅ Stock data integration (Finnhub)
- ✅ Portfolio management system
- ✅ Learning system (3 levels, lessons, quizzes)
- ✅ Points & rewards system
- ✅ Daily snapshot cron job (4 PM ET)
- ✅ Trade guardrails (cooldowns, penny stock blocks)
- ✅ Seed data (10 stocks, 3 lessons, 7 sectors)
- ⚠️ UI Pages: 70% complete

### Remaining for MVP Launch
- [ ] Stock detail page (6-section template)
- [ ] Buy/Sell transaction modal
- [ ] Learn page with lesson viewer
- [ ] Onboarding sector selection
- [ ] Mobile responsive polish
- [ ] E2E testing & QA

**Estimated time to completion: 1-2 weeks (for a developer)**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Finnhub API key (free: https://finnhub.io)

### Setup (5 minutes)

```bash
# 1. Setup Database
createdb tickr

# 2. Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with DATABASE_URL and FINNHUB_API_KEY
npm run prisma:migrate
npm run prisma:seed
npm run dev

# 3. Frontend Setup (in new terminal)
cd frontend
npm install
npm run dev

# 4. Access the app
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

**See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.**

## 📂 Project Structure

```
TickR/
├── backend/                    # Express API Server
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, validation
│   │   ├── routes/            # API routes
│   │   ├── jobs/              # Cron jobs
│   │   ├── utils/             # Guardrails, validators
│   │   ├── prisma/
│   │   │   ├── schema.prisma  # Database schema
│   │   │   └── seed.ts        # Initial data
│   │   └── server.ts          # Express app
│   └── package.json
│
├── frontend/                   # Next.js 14 App
│   ├── src/
│   │   ├── app/               # Pages & routes
│   │   ├── components/        # React components
│   │   ├── lib/               # API client, stores, utilities
│   │   ├── types/             # TypeScript types
│   │   └── styles/            # Global CSS
│   └── package.json
│
├── PROJECT_DOCS/              # Product documentation
│   ├── Product_Vision/        # Product strategy
│   ├── Technical_Specs/       # Feature specs
│   ├── Brand_Identity/        # Brand guidelines
│   └── ...
│
├── SETUP_GUIDE.md             # Deployment & setup instructions
└── README.md                  # This file
```

## 🔧 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Stock Data:** Finnhub API
- **Authentication:** JWT
- **Scheduling:** node-cron
- **Caching:** Redis (optional)

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** React Query
- **HTTP Client:** Axios
- **Validation:** Zod

## 💾 Database Schema

### Core Models
- **User** - User account with learning level and points
- **Portfolio** - User's cash and positions
- **Position** - Individual stock holdings
- **Transaction** - Buy/sell transaction records
- **MarketData** - Stock prices and fundamentals
- **Learning** - User's lesson progress
- **PointsHistory** - Points earned log
- **TradeCooldown** - Trade cooldown tracking
- **LessonContent** - Lesson definitions (JSON-based)
- **Sector** - Industry sector definitions

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register        Create account
POST   /api/auth/login           Login
GET    /api/auth/me              Get current user
```

### Portfolio
```
GET    /api/portfolio            Get portfolio & positions
GET    /api/portfolio/history    Get historical snapshots
GET    /api/portfolio/diversification  Get sector allocation
```

### Stocks
```
GET    /api/stocks/:ticker       Get stock details
GET    /api/stocks/search        Search stocks
GET    /api/stocks/sector/:name  Get stocks by sector
GET    /api/stocks/sectors       Get all sectors
```

### Transactions
```
POST   /api/transactions/buy     Buy stock
POST   /api/transactions/sell    Sell stock
GET    /api/transactions/history Get transaction history
GET    /api/transactions/cooldown/:ticker  Check cooldown
```

### Learning
```
GET    /api/learning/learning           Get learning progress
GET    /api/learning/available          Get available lessons
GET    /api/learning/lessons/:id        Get lesson content
POST   /api/learning/lessons/:id/complete   Complete lesson
POST   /api/learning/quiz/:id/submit    Submit quiz answers
```

**Full API documentation in backend `README.md`**

## 🎓 Learning System

### Levels 1-3 (MVP)
- **Level 1: Companies & Brands** - What companies are and how they make money
- **Level 2: Stocks & Ownership** - What stocks represent and price movements
- **Level 3: Sectors** - Industry groups and diversification importance

### Levels 4-7 (Phase 2+)
- **Level 4: Risk & Diversification**
- **Level 5: Valuation (P/E Ratio)**
- **Level 6: Growth & PEG Ratio**
- **Level 7: Advanced Investing**

### Points System
- Complete lesson: 50-100 points
- Correct quiz answer: 10 points
- Green day (portfolio +): 25 points
- Red day (large loss): -5 points

### Guardrails
- **No penny stocks** - Blocks stocks < $1
- **Trade cooldown** - Max 1 trade per ticker per 24h
- **No leverage** - Cash balance never goes negative
- **No crypto** - Blocklist prevents crypto trading
- **No day trading** - One daily snapshot prevents intraday manipulation

## 📊 Key Metrics to Track

### User Acquisition & Onboarding
- Daily signups
- Onboarding completion rate (target: 65%+ complete first purchase in 10 min)
- Time to first trade

### Engagement
- D1, D7, D14, D30 retention rates
- Daily active users (DAU)
- Lessons completed per user
- Trades made per user

### Learning
- % reaching Level 2 by Day 15
- % reaching Level 3 by Day 30
- Average lesson completion rate

### Monetization
- Free to paid conversion rate (target: 12-15% by Day 30)
- Parent account adoption rate
- Customer lifetime value (CLV)

## 🛡️ Security Features

- JWT token authentication
- Password hashing with bcrypt
- SQL injection prevention (Prisma ORM)
- Input validation on all endpoints
- Rate limiting on API endpoints
- CORS protection
- Environment variable management

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

### Frontend (Vercel - Recommended)
```bash
npm run build
vercel deploy
```

### Backend (Railway, Render, or Heroku)
```bash
npm run build
# Deploy to your chosen platform
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

## 🤝 Contributing

This is Derek's proprietary project. External contributions require explicit permission.

## 📝 License

All rights reserved. TickR is proprietary software.

## 🎯 Success Metrics (Phase 1 Launch)

Before launch, we need to hit:
- ✅ 80%+ onboarding completion rate
- ✅ 65%+ first purchase within 10 minutes
- ✅ Portfolio calculations accurate to cent
- ✅ Zero negative cash balances
- ✅ All guardrails enforced
- ✅ Daily snapshot runs reliably at 4 PM ET

## 📞 Contact & Support

For questions or issues:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) Troubleshooting section
2. Review backend/README.md or frontend/README.md
3. Check PROJECT_DOCS/ for feature specifications

## 🗺️ Roadmap

### Phase 1 (Current) - MVP Foundation
**Goal:** Launch with core investing simulation & learning
**Timeline:** 2-3 weeks remaining
**Focus:** Complete UI, launch, gather user feedback

### Phase 2 - Core Product
**Goal:** Full feature set with games, leaderboards, parent controls
**Timeline:** 4-6 weeks after Phase 1
**Features:** Games mode, leaderboards, parent dashboard, Levels 4-7

### Phase 3 - Scale & Network
**Goal:** Community, viral mechanics, enterprise features
**Timeline:** 8+ weeks out
**Features:** Community board, tournaments, school integrations

---

**Built with ❤️ for young investors**

Last updated: January 3, 2024
