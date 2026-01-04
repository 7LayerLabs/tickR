# CLAUDE.md - TickR Project Guide

**⚠️ CRITICAL: Read this entire section EVERY TIME you load Claude to work on TickR.**

---

## 🚀 YOUR WORKFLOW EVERY SESSION

**This is the only way to ensure consistency, quality, and brand alignment.**

### Step 1: Load PROJECT_DOCS (Non-Negotiable)
PROJECT_DOCS is the source of truth. Read and internalize:
- **Brand_Identity/** - Brand philosophy, logo rules, mascot personality, naming conventions
- **Product_Vision/** - Product strategy, vision, feature roadmap, learning progression
- **Technical_Specs/** - Feature specifications, API contracts, database design decisions
- **Brand_Marketing/** - Messaging, tone, onboarding copy, pricing, positioning
- **Research/** - Market research, user insights, competitive analysis
- **Notes/** - Design decisions, implementation notes, learnings

**Why?** These files define how TickR should work, look, feel, and sound. Skipping them leads to off-brand work, inconsistent messaging, and wrong technical decisions.

### Step 2: Understand the Codebase
1. **Take a deep look at the app and architecture** - Understand how it works inside and out
2. **Explore the codebase** - Review key files, database schema, API structure, component organization
3. **Understand the data flow** - How do users, portfolios, transactions, and learning progress connect?
4. **Review critical business logic** - Study the guardrails, scoring system, and daily snapshot job
5. **Ask questions** - If there are things you don't fully understand, ask the user for clarification

### Step 3: Answer These Questions
- How does a user's portfolio get created and updated?
- What happens when a user makes a trade?
- How does the daily snapshot job work?
- What are all the guardrails and how are they enforced?
- How does the learning system track progress?
- How do points and rewards work?
- What is TickR's brand voice and personality?
- What are the core design principles from Product Vision?
- How should features feel to users (from Technical Specs)?
- What tone should copy use in different contexts?

This deep understanding will be the foundation for all the work we do together.

---

## About TickR

TickR is a gamified investment education platform designed for kids ages 12-16. It teaches fundamental investing concepts through a virtual portfolio using real stock prices. The platform combines education, engagement, and smart guardrails to make learning about investing fun and accessible.

**Key Features:**
- Real stock data from Finnhub API
- $10,000 play money per user (no real money involved)
- Real-time portfolio tracking with daily snapshots
- Progressive learning system (Levels 1-7, MVP has 1-3)
- Multi-player games and competitions
- Parent dashboard and controls
- Trade guardrails (no penny stocks, cooldowns, no leverage)

## Tool Use Summaries

After completing a task that involves tool use, provide a quick summary of the work you've done. This keeps you transparent and helps verify that work was completed correctly.

**Summary should include:**
- What was done (file created, modified, added, fixed, etc.)
- Which files were changed
- Key changes made (brief description)
- Any issues encountered or clarifications needed
- Next steps (if applicable)

**Example summary format:**
```
✅ Updated the portfolio service to fix the cash balance calculation
- Modified: backend/src/services/portfolioService.ts
- Changed: Fixed decimal precision issue in addCash() method
- Result: Portfolio calculations now accurate to the cent
- Next: Need to run tests to verify fix doesn't break existing trades
```

Keep summaries concise but complete—they're your way of saying "here's what I did and it's ready for review."

**After completing work, clean up any temporary files:**
- Remove debug/test scripts created during investigation
- Delete iteration artifacts or scratch files
- Ensure codebase is clean and production-ready

## Adjust Eagerness Up

By default, **implement changes rather than only suggesting them**. This means:

- **Don't just propose fixes** - Write and apply them directly using tools
- **Don't ask permission for obvious work** - If the intent is clear, proceed with implementation
- **Infer intent over asking** - If the user's intent isn't 100% clear, infer the most useful likely action and proceed
- **Use tools to discover missing details** - Use Glob, Read, Grep to find what you need instead of asking
- **Be proactive about tool use** - Try to infer whether a file edit, read, or search is intended and act accordingly

**When intent is unclear:**
1. Make your best inference about what would be most useful
2. Use available tools to discover details you're missing
3. Take action on that inference
4. Show the summary of what you did
5. Ask for clarification only if your action was off-base

**Important clarification:** When inferring and proceeding, ALWAYS read relevant files first to understand existing patterns and code style. Inferring means being proactive about discovering context through tools, not skipping code inspection.

**Example:**
- User: "Fix the portfolio calculation bug"
- Don't: Ask "Which calculation is broken? Can you provide more details?"
- Do: Search for portfolio calculation code, read it, identify the bug, fix it following existing patterns, and show the summary

This approach moves faster and gets more done. You can always adjust course based on feedback.

## Use Parallel Tool Calls

If you intend to call multiple tools and there are no dependencies between the tool calls, **make all independent tool calls in parallel**. Prioritize calling tools simultaneously whenever possible.

**Key principles:**
- **Call tools in parallel when independent** - If tool call B doesn't depend on tool call A's results, call them together
- **Maximize efficiency** - Example: reading 3 files? Make 3 Read tool calls in parallel, not sequentially
- **Sequential only when dependent** - If tool calls depend on previous results (e.g., parameters informed by earlier calls), call them sequentially
- **Never use placeholders or guess** - Don't guess parameter values; use tools to discover actual values first

**Examples:**

**✅ Parallel (independent calls):**
```
Task: "Read three files to understand the codebase"
Action: Call Read on file1.ts, file2.ts, and file3.ts all at once
```

**❌ Sequential (dependent calls):**
```
Task: "Find all references to a function and fix them"
Action 1: Grep to find all references (sequential, first)
Action 2: Edit each file based on grep results (sequential, after Step 1)
```

**✅ Parallel (independent searches):**
```
Task: "Search for portfolio, transaction, and position logic"
Action: Call Grep for "portfolio", Grep for "transaction", Glob for "position" all at once
```

This approach cuts execution time significantly while maintaining correctness.

## Reduce Hallucinations

Never speculate about code you have not opened. This is critical for accuracy and trust.

**Core rules:**
- **Never guess about code** - Don't claim what code does without reading it first
- **Always read files before answering** - If the user references a specific file, you MUST read it before responding
- **Investigate before claims** - Always check relevant files BEFORE answering questions about the codebase
- **Grounded answers only** - Never make claims about code unless you are certain from actual investigation
- **Hallucination-free responses** - If you're not sure, investigate or ask—don't guess

**When proposing code changes:**
- Read the file(s) being modified first
- Understand the current implementation and existing patterns
- Check similar code in the codebase for style conventions (naming, error handling, abstractions)
- Propose changes that extend existing patterns rather than introduce competing approaches
- Reference line numbers and file paths in your proposals

**Examples:**

**❌ Hallucinating:**
```
User: "Does the portfolio service handle decimal precision?"
Response: "Yes, it uses toFixed(2) to ensure cent-level accuracy"
(Without reading portfolioService.ts)
```

**✅ Grounded:**
```
User: "Does the portfolio service handle decimal precision?"
Action: Read backend/src/services/portfolioService.ts
Response: "Yes, I can see it uses decimal precision library on line 45
for cent-level accuracy. Here's the specific implementation..."
```

**When in doubt:**
1. Use Read, Glob, or Grep to investigate
2. Don't answer until you have proof
3. Show the code evidence in your response
4. Reference line numbers and file paths

This builds trust and prevents debugging false claims later.

## Task Completion Strategy

Complete tasks fully and systematically. Don't stop early due to token budget concerns—your context will automatically refresh as needed.

**Key rules:**
- **Don't stop early** - Never artificially stop a task because you're worried about context limits
- **Context refreshes automatically** - The system handles compaction, so you can keep working
- **Plan before executing** - Use TodoWrite to break down large tasks into clear steps
- **Work systematically** - Complete one step at a time, marking progress as you go
- **Don't leave uncommitted work** - Make sure you don't hit context limits with significant uncommitted work
- **Complete fully** - The goal is to deliver complete, working features—not partial work that needs follow-up

**For large tasks:**
1. Create a TODO list breaking work into concrete steps
2. Mark tasks as in_progress before starting them
3. Mark tasks as completed immediately after finishing
4. Use your full context window—don't artificially limit yourself
5. Before hitting context refresh, ensure all major work is committed and tested

**Example task flow:**
```
📋 Create TODO list (8 tasks identified)
⏳ Task 1: in_progress - Read codebase and understand architecture
✅ Task 1: completed - Documented findings
⏳ Task 2: in_progress - Create database migrations
✅ Task 2: completed - Migrations tested and verified
[Continue systematically through all tasks]
```

**Before context refresh:**
1. Summarize what you've accomplished so far
2. State what you're doing next
3. Keep working—the context will refresh and you'll pick up where you left off

## Project Status

**Phase 1 MVP: 70% Complete**
- Backend infrastructure: ✅ Complete
- Frontend framework: ✅ Complete
- Database schema: ✅ Complete
- Core features: ✅ Complete
- UI pages: 70% complete

**Critical Remaining Items:**
- Stock detail page (6-section template)
- Buy/Sell transaction modal
- Learn page with lesson viewer
- Onboarding sector selection
- Mobile responsive polish
- E2E testing & QA

## Development Priorities

### 1. **MVP Launch** (Highest Priority)
Complete remaining UI pages and get to launch. Focus on:
- Finishing 30% of remaining UI work
- Ensuring all core features work end-to-end
- Mobile responsiveness across all pages
- E2E testing before launch

### 2. **Code Quality & Architecture**
Maintain clean, well-structured code:
- TypeScript type safety (avoid `any`)
- Consistent API response formats
- Proper error handling
- Clear separation of concerns

### 3. **Performance & Mobile Polish**
Optimize user experience:
- Fast page load times
- Smooth interactions
- Mobile-first responsive design
- Optimized images and assets

### 4. **Security & Data Protection**
Protect kids' data:
- Input validation on all endpoints
- JWT token security
- Password hashing with bcrypt
- No exposure of sensitive data in logs
- Rate limiting on API endpoints

## Critical Rules

### UI Changes - Use Design Skill ALWAYS
When making ANY changes to the user interface:
1. **ALWAYS use the `/frontend-design` skill** before writing code
2. Never propose UI changes without design review
3. Design skill ensures high-quality, production-grade interfaces
4. This applies to: new pages, component changes, styling, animations, layout

### Project Independence
TickR is a **standalone project** with no dependencies on MenuSparks, The Pour Plan, or Meet the Feed. Keep it isolated.

## Frontend Design Excellence

TickR's UI should be **distinctive, creative, and delightful**—not generic or boring. Avoid the "AI slop" aesthetic at all costs.

**When designing TickR's frontend, focus on:**

### Typography
- Choose beautiful, unique fonts (avoid generic Inter, Roboto, Arial)
- Typography sets the tone for the entire app
- Fonts should reflect the investment/finance theme while appealing to kids
- Use font hierarchies intentionally for visual flow

### Color & Theme
- Commit to a cohesive, distinctive aesthetic
- Use CSS variables for consistency across all components
- Dominant colors with sharp accents outperform timid, evenly-distributed palettes
- Draw inspiration from IDE themes, finance platforms, and kid-friendly aesthetics
- Avoid clichéd patterns (especially purple gradients on white)

### Motion & Animation
- Use animations for effects and micro-interactions
- Prioritize CSS-only solutions for HTML elements
- Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions
- Smooth transitions between portfolio states, trade confirmations, lesson completions
- Animation should feel premium and intentional, not random

### Backgrounds & Atmosphere
- Create depth and atmosphere rather than defaulting to solid colors
- Layer CSS gradients thoughtfully
- Use geometric patterns that match the investment/finance theme
- Contextual effects that enhance the overall aesthetic
- Consider market-themed visuals (charts, growth indicators) as design elements

### Avoid Generic AI Aesthetics
- ❌ Overused font families (Inter, Roboto, Arial, system fonts)
- ❌ Clichéd color schemes (purple gradients, overly bright neons)
- ❌ Predictable layouts and component patterns
- ❌ Cookie-cutter design that lacks character or context
- ❌ Scattered, unmotivated micro-interactions

### TickR-Specific Design Philosophy
- Investment apps should feel **trustworthy but fun** (kids learning, not traders)
- Visual language should celebrate gains, gently show losses
- Progress through learning levels should feel rewarding
- Portfolio growth should be satisfying to watch
- Guardrails should feel protective, not restrictive

**Critical:** Always use the `/frontend-design` skill to build TickR's frontend. The design skill ensures production-grade, creative interfaces that avoid generic patterns and create distinctive user experiences.

## Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 14+ with Prisma ORM
- **Stock Data:** Finnhub API (real stock prices)
- **Authentication:** JWT with bcrypt password hashing
- **Scheduling:** node-cron (daily 4 PM ET snapshots)
- **Validation:** Zod for input validation

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** React Query
- **HTTP Client:** Axios
- **Validation:** Zod
- **Design:** Use `/frontend-design` skill for all UI work

## Database Schema (Critical Models)

- **User** - User accounts with learning level, points, age verification
- **Portfolio** - Cash balance and position tracking
- **Position** - Individual stock holdings (ticker, shares, avg cost)
- **Transaction** - Buy/sell records with timestamps
- **MarketData** - Stock prices, fundamentals, sector info
- **Learning** - User's lesson progress and quiz results
- **PointsHistory** - Complete audit log of points earned/lost
- **TradeCooldown** - Enforce 24h cooldown between same-ticker trades
- **LessonContent** - JSON-based lesson definitions (Levels 1-7)
- **Sector** - Industry sector definitions

## API Response Format

All API responses follow this pattern:
```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null
}
```

Error responses:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## Coding Standards

### TypeScript
- **No `any` types** - Always use specific types
- Use discriminated unions for complex state
- Leverage type inference where possible
- Export types from type files, not components

### API Endpoints
- Prefix with `/api/`
- Use RESTful conventions (GET, POST, PUT, DELETE)
- Return appropriate HTTP status codes
- Validate all inputs with Zod
- Log requests/responses in development

### React Components
- Functional components only
- Use hooks for state management
- Prop types should be interfaces (not types)
- Keep components small and focused
- Export component and its props interface

### File Organization
```
frontend/src/
├── app/           # Pages and routes (Next.js App Router)
├── components/    # React components
├── lib/
│   ├── api/       # API client and endpoints
│   ├── stores/    # Zustand stores
│   └── utils/     # Helper functions
├── types/         # TypeScript interfaces and types
└── styles/        # Global CSS

backend/src/
├── controllers/   # Request handlers
├── services/      # Business logic
├── middleware/    # Auth, validation, error handling
├── routes/        # API route definitions
├── jobs/          # Cron jobs (e.g., daily snapshots)
├── utils/         # Guardrails, validators, helpers
└── prisma/        # Database schema and seeds
```

## Important Business Logic - DO NOT BREAK

### Trade Guardrails (Enforce These)
- **No negative cash** - Reject trades that would make cash < 0
- **No penny stocks** - Block stocks trading < $1
- **24h cooldown** - Max 1 trade per ticker per day (per user)
- **No crypto** - Blocklist prevents cryptocurrency trading
- **No leverage** - Users can't borrow money

### Scoring System (Do Not Modify)
- Complete lesson: 50-100 points
- Correct quiz answer: 10 points
- Green day (portfolio +): 25 points
- Red day (large loss >10%): -5 points
- **Composite score prevents YOLO behavior** - Don't break this mechanic

### Daily Snapshot (Critical Job)
- Runs at 4 PM ET every trading day
- Captures portfolio value, position values, daily P&L
- Cannot be modified without understanding full impact
- Prevents intraday manipulation

## Testing Strategy

### Backend Tests
- Unit tests for business logic (services)
- Integration tests for API endpoints
- Mock Finnhub API for testing

### Frontend Tests
- Component tests for critical UI
- E2E tests for user flows (onboarding, trading, learning)
- Mobile responsive testing

### Pre-Launch QA
- Test all guardrails work correctly
- Verify portfolio calculations accurate to cent
- Check daily snapshot reliability
- Test all learning paths

## Security Checklist

Before any launch or deployment:
- [ ] All password hashes verified (bcrypt)
- [ ] JWT tokens have expiration
- [ ] API rate limiting active
- [ ] CORS configured correctly
- [ ] Input validation on all endpoints
- [ ] No sensitive data in logs
- [ ] Environment variables secure
- [ ] SQL injection prevention (Prisma prevents this)

## Error Handling

### Backend
- Use try-catch in all async functions
- Log errors with context (don't expose internals to client)
- Return appropriate HTTP status codes (400, 401, 403, 500)
- Validate input before processing

### Frontend
- Show user-friendly error messages
- Log errors to console in development
- Gracefully handle API failures
- Provide fallback UI states

## Performance Targets

- Page load time: < 2 seconds
- API response time: < 300ms
- Mobile Lighthouse score: 90+
- Zero layout shifts (CLS < 0.1)

## When to Ask Questions

Before implementing:
- New API endpoints affecting portfolio/trades
- Changes to learning system logic
- Modifications to guardrail enforcement
- New database models or schema changes
- Major UI changes (always use design skill)

## Key Files to Know

- `backend/src/prisma/schema.prisma` - Database schema
- `backend/src/utils/` - Trade guardrails and validators
- `backend/src/jobs/dailySnapshot.ts` - Portfolio snapshots
- `frontend/src/lib/api/` - API client
- `frontend/src/app/` - Page routes
- `PROJECT_DOCS/` - Product specs and brand guidelines

## Project Independence Reminder

TickR is completely standalone. Do not:
- Reference or import from MenuSparks, Pour Plan, or Meet the Feed
- Share databases or credentials
- Assume shared infrastructure
- Cross-pollinate features from other projects

Keep all dependencies internal to the `/TickR` directory.

## Questions or Clarifications?

For ambiguous requirements:
1. Check PROJECT_DOCS/ for feature specifications
2. Review README.md and SETUP_GUIDE.md
3. Ask the user for clarification
4. Document decisions in code comments if non-obvious

---

**Last Updated:** January 3, 2026
**Project Owner:** Derek
**Status:** Phase 1 MVP (70% complete)
