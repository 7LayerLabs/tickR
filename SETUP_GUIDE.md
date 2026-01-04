# TickR Setup & Deployment Guide

## Project Overview

TickR is a gamified investment education platform for kids ages 12-16. This guide will get you from zero to a fully functional MVP in your local environment.

**Status:** Phase 1 MVP Foundation Complete
- ✅ Backend (Express + Node.js)
- ✅ Frontend (Next.js 14)
- ✅ Database Schema (Prisma + PostgreSQL)
- ✅ Authentication System (JWT)
- ✅ Stock Data Integration (Finnhub API)
- ✅ Learning System (Lessons, Quizzes, Points)
- ✅ Portfolio Management
- ✅ Daily Snapshot Cron Job
- ⚠️ UI Pages (70% complete - need stock detail page, learn page, buy/sell modal)

---

## Prerequisites

### Required Software
- **Node.js 18+** - https://nodejs.org/
- **PostgreSQL 14+** - https://www.postgresql.org/download/
- **npm or yarn** - Comes with Node.js
- **Git** - https://git-scm.com/

### API Keys Needed
- **Finnhub API Key** - Sign up at https://finnhub.io/ (free tier works for MVP)

---

## Step 1: Setup Database (PostgreSQL)

### Option A: Local PostgreSQL Installation

```bash
# On Windows (using default installer)
# After installation, PostgreSQL runs as a service

# Create a new database
psql -U postgres
# In psql:
CREATE DATABASE tickr;
\q
```

### Option B: Docker (Recommended)

```bash
# Pull and run PostgreSQL in Docker
docker run --name tickr-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tickr \
  -p 5432:5432 \
  -d postgres:latest
```

### Verify Connection

```bash
psql -h localhost -U postgres -d tickr -c "SELECT 1;"
# Should return: 1
```

---

## Step 2: Setup Backend

### 1. Install Dependencies

```bash
cd C:\Users\derek\OneDrive\Desktop\TickR\backend

npm install
# or
yarn install
```

### 2. Create `.env` File

```bash
# Copy from example
copy .env.example .env

# Edit .env with your values:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tickr?schema=public"
JWT_SECRET="your-super-secret-key-change-in-production"
FINNHUB_API_KEY="your-finnhub-api-key-here"
REDIS_URL="redis://localhost:6379"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### 3. Setup Database Schema

```bash
# Run Prisma migrations
npm run prisma:migrate

# Seed initial data (sectors, stocks, lessons)
npm run prisma:seed
```

### 4. Start Backend Server

```bash
npm run dev

# You should see:
# 🚀 TickR Backend running on port 3001
# [CRON] Daily snapshot job started
```

### API Health Check

```bash
curl http://localhost:3001/health
# Response: {"status":"ok","timestamp":"2024-01-03T..."}
```

---

## Step 3: Setup Frontend

### 1. Install Dependencies

```bash
cd C:\Users\derek\OneDrive\Desktop\TickR\frontend

npm install
# or
yarn install
```

### 2. Create `.env.local` File

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Start Frontend Server

```bash
npm run dev

# You should see:
# ▲ Next.js 14.2.0
# - Local: http://localhost:3000
```

---

## Step 4: Test the App

### 1. Access the App

Open browser: http://localhost:3000

### 2. Create Account

1. Click "Get Started"
2. Register: username `testuser`, password `password123`, age `EARLY_TEEN`
3. You'll be redirected to portfolio (currently empty)

### 3. Test Portfolio

- Navigate to "Stocks" tab
- Search for "AAPL"
- Click on Apple stock
- You'll see the stock details page (if implemented)

### 4. Test Backend Directly

```bash
# Get authentication token
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Response:
# {
#   "user": {...},
#   "token": "eyJhbGc..."
# }

# Get portfolio (replace TOKEN with actual token)
curl http://localhost:3001/api/portfolio \
  -H "Authorization: Bearer TOKEN"
```

---

## Database Inspection

### Using pgAdmin (GUI)

1. Download pgAdmin: https://www.pgadmin.org/download/
2. Connect to your PostgreSQL instance
3. Browse tables in the `tickr` database

### Using Command Line

```bash
# Connect to database
psql -h localhost -U postgres -d tickr

# List all tables
\dt

# View users
SELECT * FROM users;

# View market data
SELECT ticker, price, "changePercent" FROM market_data LIMIT 5;

# View lessons
SELECT id, title FROM lesson_content;

# Exit
\q
```

---

## Remaining MVP Features to Complete

### High Priority (Complete These First)

1. **Stock Detail Page** (`/dashboard/stock/[ticker]`)
   - 6-section template (What company does, Why people know it, How it makes money, etc.)
   - Buy/Sell modal with transaction logic
   - Progressive metric unlocking based on learning level

2. **Learn Page** (`/dashboard/learn`)
   - Display available lessons by level
   - Lesson viewer with cards and quizzes
   - Points awarded on completion

3. **Buy/Sell Modal Component**
   - Input validation
   - Guardrails enforcement (cooldowns, cash balance)
   - Real-time price updates

### Medium Priority

4. **Onboarding Sector Selection** (`/dashboard/onboarding/sectors`)
   - After registration, select starter sectors
   - First stock purchase within 10 minutes target

5. **Transaction History Page**
   - View all past buy/sell transactions
   - Filter by date, ticker, type

### Lower Priority (Phase 2+)

6. **Games Mode** - Create and join private games
7. **Leaderboards** - Composite scoring system
8. **Community Board** - Moderated discussion threads

---

## Deployment Instructions

### Frontend Deployment (Vercel - Recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to https://vercel.com
# 3. Import your repository
# 4. Set environment variable:
#    NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
# 5. Deploy

# Your frontend will be live at: https://tickr-yourusername.vercel.app
```

### Backend Deployment (Railway or Render)

#### Using Railway.app

```bash
# 1. Create Railway account at https://railway.app
# 2. Create new project
# 3. Add PostgreSQL database plugin
# 4. Connect your GitHub repo
# 5. Set environment variables:
#    DATABASE_URL=<railway-generated>
#    JWT_SECRET=<your-secret>
#    FINNHUB_API_KEY=<your-key>
#    FRONTEND_URL=https://your-frontend-url.com

# Your backend will be live at: https://tickr-api.up.railway.app
```

#### Using Render.com

```bash
# Similar process to Railway
# 1. https://render.com
# 2. Create new Web Service
# 3. Connect GitHub
# 4. Set environment variables
# 5. Deploy
```

---

## Troubleshooting

### Backend Won't Start

```bash
# Error: Database connection failed
# Fix: Check DATABASE_URL and PostgreSQL is running

# Error: Port 3001 already in use
# Fix: Change PORT in .env or kill process:
# On Windows: netstat -ano | findstr :3001
# Kill: taskkill /PID <PID> /F
```

### Frontend Won't Start

```bash
# Error: Module not found
# Fix: npm install

# Error: API requests failing
# Fix: Make sure backend is running and NEXT_PUBLIC_API_URL is correct
```

### Database Issues

```bash
# Reset everything
npm run prisma:migrate reset
npm run prisma:seed

# View logs
tail -f ./logs/app.log
```

### Daily Snapshot Job Not Running

```bash
# The cron job runs at 4:00 PM ET (20:00 UTC)
# For testing, manually trigger it:

curl -X POST http://localhost:3001/api/snapshots/force \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Development Workflow

### Making Backend Changes

1. Edit files in `backend/src/`
2. Server auto-reloads (via ts-node)
3. No rebuild needed

### Making Frontend Changes

1. Edit files in `frontend/src/`
2. Hot reload works automatically
3. No restart needed

### Database Schema Changes

```bash
# After modifying schema.prisma:
npm run prisma:migrate

# If migration fails, reset and reseed:
npm run prisma:migrate reset
npm run prisma:seed
```

---

## Key API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Portfolio
- `GET /api/portfolio` - Get current portfolio
- `GET /api/portfolio/history?days=30` - Get historical snapshots

### Stocks
- `GET /api/stocks/:ticker` - Get stock details
- `GET /api/stocks/search?q=apple` - Search stocks
- `GET /api/stocks/sector/:sector` - Get stocks by sector

### Transactions
- `POST /api/transactions/buy` - Buy stock
- `POST /api/transactions/sell` - Sell stock
- `GET /api/transactions/history` - Get transaction history
- `GET /api/transactions/cooldown/:ticker` - Check trade cooldown

### Learning
- `GET /api/learning/learning` - Get user's learning progress
- `GET /api/learning/available` - Get available lessons
- `GET /api/learning/lessons/:id` - Get lesson content
- `POST /api/learning/lessons/:id/complete` - Complete lesson
- `POST /api/learning/quiz/:id/submit` - Submit quiz answers

---

## Performance Tips

### Backend
- Redis caching for stock prices (enabled)
- Database connection pooling (via Prisma)
- Rate limiting on API endpoints (enabled)

### Frontend
- React Query for data caching
- Next.js image optimization
- Code splitting by route (automatic)

---

## Security Checklist

Before production deployment:

- [ ] Change JWT_SECRET to random 32+ character string
- [ ] Enable HTTPS everywhere
- [ ] Set CORS properly (don't use *)
- [ ] Implement rate limiting
- [ ] Add input validation on all endpoints
- [ ] Use environment variables for all secrets
- [ ] Enable CSRF protection
- [ ] Test for SQL injection (you're safe with Prisma, but test)
- [ ] Implement logging and monitoring
- [ ] Regular security audits

---

## Next Steps

1. **Complete remaining UI pages** (2-3 days)
   - Stock detail page with 6-section template
   - Buy/Sell modal with transaction logic
   - Learn page with lesson viewer and quiz

2. **User testing** (1 week)
   - Test with real 12-16 year olds
   - Measure onboarding completion rate
   - Track D1, D7, D14, D30 retention

3. **Phase 2 features** (4-6 weeks)
   - Games mode
   - Leaderboards with composite scoring
   - Parent dashboard
   - Advanced learning levels (4-7)

4. **Launch & iterate**
   - Deploy to production
   - Monitor key metrics
   - Iterate based on user feedback

---

## Support & Resources

### Documentation
- Prisma: https://www.prisma.io/docs/
- Next.js: https://nextjs.org/docs
- Express: https://expressjs.com/
- React Query: https://tanstack.com/query/latest

### API Documentation (Finnhub)
- https://finnhub.io/docs/api

### Community
- GitHub Issues (this repo)
- Stack Overflow (tag: `tickr` or framework names)

---

## Metrics to Track

### User Acquisition
- Daily signups
- Signup source
- Cost per acquisition

### Engagement
- D1, D7, D14, D30 retention
- Onboarding completion rate
- Time to first trade
- Lessons completed per user
- Games created/joined

### Business
- Free to paid conversion rate
- Churn rate
- Average session length
- Features used

---

## License

TickR is proprietary software. All rights reserved.

---

Last updated: January 3, 2024
