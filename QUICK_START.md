# TickR - 5 Minute Quick Start

Get TickR running locally in 5 minutes.

## Prerequisites
- Node.js 18+ installed
- PostgreSQL running on `localhost:5432`
- Finnhub API key (free from https://finnhub.io)

## Step 1: Setup Database (1 min)

```bash
# Create database
createdb tickr

# Or with password:
psql -U postgres -c "CREATE DATABASE tickr;"
```

## Step 2: Setup Backend (2 min)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tickr?schema=public"
FINNHUB_API_KEY="your-key-here"
JWT_SECRET="dev-secret-change-in-production"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"' > .env

# Setup database
npm run prisma:migrate
npm run prisma:seed

# Start backend
npm run dev
```

Keep this terminal open. Backend should be running on `http://localhost:3001`

## Step 3: Setup Frontend (2 min)

Open NEW terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo 'NEXT_PUBLIC_API_URL=http://localhost:3001/api' > .env.local

# Start frontend
npm run dev
```

## Step 4: Access the App (0 min)

Open browser: **http://localhost:3000**

### Test Account
- Username: `testuser`
- Password: `password123`
- Age: `EARLY_TEEN`

### What You Can Do
1. **Register** a new account (username, password, age)
2. **View Portfolio** (starts with $10,000)
3. **Browse Stocks** (10 sample stocks seeded)
4. **View Lessons** (3 sample lessons)
5. **Check Learning** (track your progress)

## Next Steps

### To See Full Features
1. Complete a lesson to earn points
2. Make a stock purchase (visit Stocks page)
3. View your updated portfolio

### To Understand the Code
- Backend: See `backend/ARCHITECTURE.md`
- Frontend: See `frontend/ARCHITECTURE.md`
- Full guide: See `SETUP_GUIDE.md`

### To Deploy
- See `SETUP_GUIDE.md` Deployment section

## Troubleshooting

### "Database does not exist"
```bash
createdb tickr
npm run prisma:migrate
```

### "Port 3001 already in use"
```bash
# Find and kill process:
lsof -i :3001
kill -9 <PID>
```

### "Module not found"
```bash
npm install
```

### "API requests failing"
Check that:
1. Backend is running (`npm run dev`)
2. `.env` has correct DATABASE_URL
3. PostgreSQL is running

### "Finnhub API errors"
Add your real API key to `.env`:
```
FINNHUB_API_KEY="your-actual-key-here"
```

## Next Commands

After setup is working:

### Backend
```bash
npm run prisma:studio      # View database in GUI
npm run prisma:seed        # Reseed demo data
npm run build              # Build for production
```

### Frontend
```bash
npm run build              # Build for production
npm run type-check         # Check TypeScript
```

## Architecture Overview

**Frontend (Next.js)**
- Pages: `/app/[route]/page.tsx`
- API Client: `/lib/api.ts`
- State: `/lib/auth.store.ts` (Zustand)
- Components: `/components/`

**Backend (Express)**
- Routes: `/src/routes/`
- Controllers: `/src/controllers/`
- Services: `/src/services/` (Business logic)
- Database: Prisma ORM

**Database**
- 10+ tables (users, portfolios, stocks, transactions, etc.)
- 10 sample stocks (AAPL, MSFT, GOOGL, NKE, etc.)
- 3 sample lessons (Companies, Stocks, Sectors)
- 7 sectors (Tech, Healthcare, Finance, etc.)

## What's Complete

✅ Full backend API (all endpoints)
✅ User authentication & JWT
✅ Portfolio management
✅ Stock data integration (Finnhub)
✅ Learning system with quizzes
✅ Points & rewards
✅ Trade guardrails
✅ Daily snapshots
✅ 70% of frontend UI

⚠️ Remaining: Stock detail page, Buy/Sell modal, Learn page

## Key Files Modified

Backend:
- `src/server.ts` - Express server
- `src/prisma/schema.prisma` - Database schema
- `src/services/*.ts` - Core business logic
- `src/controllers/*.ts` - API endpoints

Frontend:
- `src/app/page.tsx` - Landing page
- `src/app/auth/[page]/page.tsx` - Authentication
- `src/app/dashboard/[page]/page.tsx` - App pages
- `src/lib/api.ts` - API client
- `src/lib/auth.store.ts` - Auth state management

## Performance Tips

**Backend:**
- Uses Decimal type for accurate financial calculations
- Database indexes on frequently queried fields
- Caching ready (Redis optional)

**Frontend:**
- React Query for efficient data fetching
- Next.js automatic code splitting
- Tailwind CSS for small bundle

## Security Notes

🔐 Current setup is for **development only**.

Before production:
- [ ] Change JWT_SECRET to 32+ char random string
- [ ] Enable HTTPS
- [ ] Verify CORS settings
- [ ] Setup rate limiting
- [ ] Enable database backups
- [ ] Setup monitoring

## Support

If stuck:
1. Check backend logs (should show requests)
2. Check browser console (F12)
3. Verify all `.env` variables are set
4. See `SETUP_GUIDE.md` Troubleshooting section

---

**You're ready!** 🚀

Questions? See the comprehensive docs in the project root.
