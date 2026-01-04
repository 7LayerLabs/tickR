# MVP Build Order (DO THIS)

**Critical:** Do not build everything at once.

## Phase 1 (Must-Have)

These 5 items are the foundation. Nothing ships without them.

1. **Onboarding**
   - Username + age band capture
   - Starter sectors selection
   - Portfolio initialization ($10k)
   - Expectations setting
   - Estimated time: 1–2 weeks

2. **Portfolio Screen**
   - Display total value
   - Show daily change (% and $)
   - List holdings
   - Diversification bar
   - Real-time updates
   - Estimated time: 1–2 weeks

3. **Stock Pages**
   - What company does
   - Why people know it
   - How it makes money
   - Sector connections
   - Basic stats (price, change)
   - Buy/sell buttons
   - Estimated time: 2 weeks

4. **Learning Levels 1–3**
   - Companies & Brands (Level 1)
   - Stocks & Ownership (Level 2)
   - Sectors (Level 3)
   - Lessons + quizzes
   - Point unlocks
   - Estimated time: 2–3 weeks

5. **Play Money Engine**
   - Real-time stock price integration
   - Simulated cash system
   - Buy/sell transaction logic
   - Portfolio value calculation
   - Transaction history
   - Estimated time: 2–3 weeks

**Phase 1 Total: 4–6 weeks for a lean team (2–3 devs)**

### Why Phase 1 is Enough to Launch

After Phase 1, you have:
- ✔ Fully functional investing simulator
- ✔ Real stock data
- ✔ Learning system (3 of 7 levels)
- ✔ Point progression
- ✔ Portfolio tracking

You can launch and start getting user feedback.

---

## Phase 2 (Core Product)

Add these after Phase 1 users validate the core loop.

6. **Sectors Page & Filtering**
   - Browse all sectors
   - Filter stocks by sector
   - Unlock logic
   - Performance tracking by sector
   - Estimated time: 1 week

7. **Points & Unlocks**
   - Daily portfolio evaluation
   - Point earning logic
   - Unlock milestone tracking
   - Visual progression display
   - Estimated time: 1 week

8. **Full Lessons System**
   - Lessons 4–7 (Risk, Valuation, Growth, Advanced)
   - Unlock metrics progressively
   - Reflection questions
   - Quiz system
   - Estimated time: 2 weeks

9. **Parent Dashboard**
   - Learning progress view
   - Portfolio overview
   - Risk indicators
   - Email notifications
   - Parent account linking
   - Estimated time: 2 weeks

**Phase 2 Total: 4–6 weeks**

---

## Phase 3 (Competition & Community)

Add these after Phase 1 + 2 are solid and you have traction.

10. **Games Mode**
    - Game creation UI
    - Invite system
    - Game-specific portfolios
    - Real-time leaderboards (simple)
    - Estimated time: 2 weeks

11. **Leaderboards**
    - Composite score calculation
    - Friends leaderboard
    - Age-banded global leaderboard
    - Rank display
    - Estimated time: 1–2 weeks

12. **Community Board**
    - Thread creation
    - Moderation queue
    - Flagging system
    - Basic discussion
    - Estimated time: 2 weeks

**Phase 3 Total: 3–5 weeks**

---

## Critical Notes

### What Not to Do

❌ Build all 7 learning levels before launch
❌ Build games, tournaments, community in Phase 1
❌ Build advanced parent features (analytics, exports) first
❌ Build fancy UI before core logic works

### What to Prioritize

✔ **Real stock data** (most important — do early)
✔ **Accurate portfolio calculations**
✔ **Fast onboarding** (kids should be buying within 60 seconds)
✔ **Learning loop works** (Lessons → Quizzes → Points → Unlocks)

### Testing Strategy

- Phase 1: Internal QA + small beta (10–20 users)
- Phase 2: Beta expansion (50–100 users)
- Phase 3: Public beta → full launch

### Success Metrics

**Phase 1:**
- 80%+ onboarding completion
- Users making 3+ trades in first week
- 60%+ daily active users

**Phase 2:**
- 40%+ users reach Level 4+
- Parents creating accounts
- Good retention (30%+ 7-day)

**Phase 3:**
- Users participating in games
- Community moderation manageable
- Composite scoring makes sense

---

## Technology Assumptions

- Frontend: React/Next.js (or similar)
- Backend: Node.js / Python (or similar)
- Database: PostgreSQL
- Real-time: WebSockets or Server-Sent Events
- Stock data API: Alpha Vantage, Finnhub, or similar
- Auth: Firebase or custom JWT

## Resource Estimate

**Lean MVP (Phase 1 only):**
- 2–3 full-stack developers
- 1 product manager
- 1 designer
- 4–6 weeks

**Full MVP (Phase 1 + 2):**
- Same team
- 8–12 weeks total

**Ready for Scale (Phase 3):**
- Add community manager + moderation
- 12–16 weeks total

---

## DO NOT SKIP PHASE 1

Everything else is nice-to-have. Phase 1 is the game.
