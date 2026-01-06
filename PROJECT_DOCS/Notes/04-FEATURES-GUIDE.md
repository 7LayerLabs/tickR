# TickR - Complete Features Guide

## Overview

This document provides a comprehensive breakdown of every feature in TickR, organized by user journey.

---

## 1. Landing Page

### Purpose
Convert visitors into registered users by demonstrating value.

### Key Elements

**Navigation Bar**
- TickR logo/wordmark
- "Log In" text link
- "Get Started" CTA button (cyan)

**Hero Section**
- Trust badge: "Safe for ages 12-16 · No real money"
- Headline: "Stop Watching / Start Playing"
- Colorful subheadline with value props
- Dual CTA buttons (primary + secondary)
- Hero image

**Stats Bar**
- $10K practice funds
- 500+ real stocks
- 7 learning levels

**How It Works**
- 3-step visual flow
- Create Account → Get $10K → Trade & Learn

**Features Showcase**
- Daily Practice
- Progressive Learning
- Track Progress
- (Each with image + description)

**For Parents Section**
- 100% Safe (no real money)
- Real Learning (actual concepts)
- Parent Visibility (progress dashboard)

**Testimonials**
- 3 student quotes with ages
- Social proof for conversion

**Final CTA**
- "Ready to learn?"
- Single primary button
- Trust indicators

**Footer**
- Copyright
- Legal links
- Age appropriateness note

---

## 2. Authentication

### Registration (`/auth/register`)

**Form Fields:**
- Username (display name)
- Email address
- Password
- Confirm password

**Flow:**
1. User fills form
2. Validation on submit
3. Account created
4. Redirect to portfolio

### Login (`/auth/login`)

**Form Fields:**
- Email address
- Password

**Features:**
- "Forgot password" link
- Demo mode option
- Registration redirect

---

## 3. Dashboard Layout

### Persistent Elements (All Dashboard Pages)

**Sidebar (Left)**
- TickR logo
- User profile card
  - Avatar (level color)
  - Username
  - Level + title
  - XP progress bar
  - Unlocked badges preview
- Navigation links:
  - Portfolio
  - Explore (stocks)
  - Learn
  - Compete (leaderboard)
  - Badges (achievements)
- Streak card
- Mascot image
- Sign out button

**Header (Top)**
- Page title
- Cash balance display

**Mobile Responsive**
- Hamburger menu
- Slide-out drawer
- Overlay backdrop

---

## 4. Portfolio Page

### Empty State (New Users)

**Welcome Hero**
- Celebration emoji
- "$10,000 to start" highlight
- "Buy Your First Stock" CTA

**Getting Started Guide**
- 3 numbered steps with icons
- Browse → Buy → Learn flow

**Daily Challenges Preview**
- Active challenges list
- XP rewards shown

### Active Portfolio

**Portfolio Value Hero**
- Total portfolio value (large)
- Gain/loss indicator
- Stats row:
  - Cash available
  - Invested value
  - Level/title
  - Current streak

**Daily Challenges Card**
- 3 challenge cards with progress bars
- Completion checkmarks
- XP rewards

**Quick Actions**
- "Buy Stocks" button → Explore
- "Learn & Earn XP" button → Learn

**Performance Highlights**
- Top Performer card (best gainer)
- Needs Attention card (worst performer)

**Holdings List**
Each position shows:
- Ticker badge (colored)
- Company name
- Share count
- Current price
- Average cost
- Current value
- Gain/loss percentage
- **Sell button** (opens modal)
- Link to stock detail

**Sell Modal**
- Position summary
- Share quantity selector
- Quick select buttons (25%, 50%, 75%, All)
- Order summary (total cash, profit/loss)
- Two-step confirmation

**Recent Trades**
- Last 3 transactions
- Buy/sell indicator
- Amount and price

**Sector Diversification**
- Bar chart by sector
- Percentage breakdown
- Diversification tips

**Portfolio Stats Footer**
- Stocks owned count
- Total trades count
- Winners count
- Total profit

---

## 5. Stock Explorer

### Search

**Hero Section**
- Search input (prominent)
- Placeholder: "Search Apple, Tesla, Nike..."
- Real-time filtering

**Search Results**
- Results label with query
- Clear button
- Filtered stock list

### Browsing

**Trending Section**
- 4 hot/popular stocks
- HOT/POPULAR badges
- Price and change display

**Sector Filter**
- Category grid with icons:
  - ✨ All
  - 💻 Tech
  - 🎬 Movies & TV
  - 🛍️ Shopping
  - 🎮 Gaming
  - 🍔 Food
  - ⚽ Sports
  - 🏦 Banks
  - 🚗 Cars
- Active state with color gradient

**Stock List**
Each stock card shows:
- Colored ticker badge
- Company name
- Current price
- Day change percentage
- Trend indicator (↑↓)
- HOT/POPULAR badges
- Hover arrow effect

**Stats Footer**
- 500+ real stocks
- $0 trading fees
- Live real prices

---

## 6. Stock Detail Page

### Header Section
- Ticker badge (large, colored)
- Company name
- Current price (prominent)
- Day change with indicator

### Action Buttons
- **Buy button** (green) - Opens buy modal
- **Sell button** (red) - Opens sell modal (if owned)

### Position Card (If Owned)
- Shares owned
- Average cost
- Current value
- Total gain/loss

### Price Chart
- Interactive line chart
- Time period selector (coming soon)

### Company Overview
- Description
- Sector
- Industry
- Key facts

### Key Statistics
Expandable cards explaining:
- **Market Cap** - Company's total value
- **P/E Ratio** - Price vs earnings
- **52 Week Range** - Price history
- **Volume** - Trading activity
- **Dividend Yield** - Income payments
- **Beta** - Risk level

Each stat includes:
- Current value
- Kid-friendly explanation
- Price direction indicator (↑↓↔)

### Buy Modal
- Share quantity selector (+/- buttons)
- Quick select (1, 5, 10, Max)
- Order summary
- Cash check
- XP preview (+25)
- Two-step confirmation

### Sell Modal
- Similar to portfolio sell modal
- Position info
- Profit/loss preview

---

## 7. Learning Center

### Hub View

**Hero Section**
- "Level Up Your Brain" heading
- Lesson/XP progress stats
- Decorative illustration

**Progress Overview**
- Progress percentage
- Total XP earned from learning
- Current streak

**Learning Paths Grid**
5 paths with:
- Icon and color
- Title
- Description
- Lesson count
- Progress bar
- Completion percentage

### Path Detail View

**Path Header**
- Icon (large)
- Title
- Description
- Progress indicator

**Path Stats**
- Lessons completed / total
- XP available

**Lessons List**
Each lesson shows:
- Lesson number
- Title
- Duration
- XP reward
- Lock/complete state
- Progress indicators

Locked lessons:
- Grayed out
- "Complete previous" message

Completed lessons:
- Green checkmark
- "Review" button

### Lesson View

**Lesson Header**
- Title
- Duration
- XP reward
- Completion badge

**Content Sections:**
1. **Definition** - What is it?
2. **Real World Example** - Relatable analogy
3. **How It Works** - Step-by-step explanation
4. **Key Takeaway** - Main point to remember

**Quiz Section** (if available)
- "Test Your Knowledge" prompt
- Quiz icon/illustration
- Start button

**Quiz Interface**
- Question text
- Multiple choice options (4)
- Submit button

**Quiz Results**
- Correct/incorrect feedback
- Explanation of answer
- Continue button

**XP Notification**
- Toast showing XP earned
- Lesson XP + Quiz XP (if correct)

---

## 8. Achievements Page

### Hero Section
- Trophy icon
- "Your Achievements" heading
- Description

**Stats Bar**
- Badges earned count
- Total trades
- Lessons completed
- Day streak

### Recently Unlocked
- Latest 6 unlocked badges
- Quick reference cards

### Achievement Sections

**Trading Badges**
- All trading-related achievements
- Progress bars for in-progress

**Learning Badges**
- All learning achievements
- Completion indicators

**Streak Badges**
- Consistency achievements
- Streak progress

**Level Badges**
- Level milestone achievements
- Level progress

### Achievement Cards

**Unlocked State:**
- Gold/amber background
- Full color icon
- Green checkmark
- Unlock date
- Name and description

**Locked State:**
- Gray background
- Lock icon
- Progress bar (if applicable)
- Progress counter (X/Y)

### XP Earning Guide
- Visual cards showing XP for each action
- Buy stock: +25 XP
- Complete lesson: +50 XP
- Pass quiz: +75 XP
- Unlock badge: +200 XP

---

## 9. Leaderboard

### Hero Section
- Trophy icon
- "Leaderboard" heading
- User ranking card (highlighted)
  - Avatar
  - Rank position
  - Current stat value

### Tab Selector
- XP Leaders
- Top Portfolios
- Longest Streaks

### Top 3 Podium
Visual podium display:
- 1st place (center, elevated)
- 2nd place (left)
- 3rd place (right)

Each shows:
- Avatar
- Username
- Level
- Stat value
- Medal emoji

### Full Rankings
Table with columns:
- Rank number/icon
- Change indicator (↑↓-)
- Avatar
- Username
- Level
- Badge count
- Primary stat

User's row highlighted with special styling

### Motivational Card
- Personalized message based on rank
- XP earning tips
- Progress encouragement

---

## 10. Global Features

### Success Toasts
- Green gradient
- Checkmark icon
- Action description
- XP earned (if applicable)
- Auto-dismiss after 4 seconds

### Loading States
- Spinner animation
- "Loading amazing stocks..."
- Skeleton placeholders

### Empty States
- Friendly illustrations
- Helpful messages
- Action suggestions

### Error Handling
- Red alert styling
- Clear error messages
- Retry suggestions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg
- Touch-friendly targets
- Collapsible navigation

---

## Document Navigation

- [01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) - Vision and goals
- [02-TECHNICAL-ARCHITECTURE.md](./02-TECHNICAL-ARCHITECTURE.md) - How it's built
- [03-GAME-MECHANICS.md](./03-GAME-MECHANICS.md) - XP, levels, achievements
- [05-LEARNING-CURRICULUM.md](./05-LEARNING-CURRICULUM.md) - Educational content
- [06-UI-UX-DESIGN.md](./06-UI-UX-DESIGN.md) - Design system
- [07-FUTURE-ROADMAP.md](./07-FUTURE-ROADMAP.md) - What's next
