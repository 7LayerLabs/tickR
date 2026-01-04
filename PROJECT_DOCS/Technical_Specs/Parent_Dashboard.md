# Parent Dashboard

## What Parents See

Parents have visibility without micromanaging.

### Learning Progress
- Concepts learned (checklist)
- Levels completed (1–7)
- Lessons finished this week
- Time spent learning

### Portfolio Insights
- Total portfolio value
- Daily change (%)
- Holdings (what they own)
- Sector allocation (pie chart)

### Risk Behavior Indicators
- Diversification score
- Consistency (green vs red days)
- Largest single-day loss
- Average daily volatility

### Time Analytics
- Minutes spent this week
- Most active days
- Engagement trend

## What Parents Do NOT See

**Intentionally Hidden:**
- Rankings vs other kids (competitive, not comparative)
- Chat/community content (unless flagged by moderators)
- Individual transactions (too much detail)
- Other players' portfolios

**Philosophy:** Parents should trust, not spy.

## Parent Controls

| Setting | Default | Parent Can Change |
|---------|---------|-------------------|
| Community access | Enabled | Yes |
| Leaderboard visibility | Enabled | Yes |
| Game participation | Enabled | Yes |
| Tournament entry | Disabled | Yes |
| Data export | Allow | Yes |

## Parent Communication

### Email Alerts (Opt-In)
- Weekly digest: Progress update
- Alerts: Unusual behavior (e.g., large loss)
- Monthly summary: Learning achievements

### In-App Messages
- Notification when level completed
- Notification when tournament unlocked
- Notification when major risk score drops

## Data Export

Parents can download:
- Full learning transcript
- Portfolio history (CSV)
- Monthly reports (PDF)
- Transaction log

**Purpose:** Transparency for other stakeholders (tutors, advisors, educators).

## Access & Security

- Parent linked to child account
- Parent login separate from child account
- Parent sees only their child's data
- Can add multiple parents (for shared custody)

## UI Overview

```
Parent Dashboard
├── Learning Progress
│   ├── Level 3 of 7 Complete
│   ├── 5 Lessons This Week
│   └── Topics Learned: [Companies, Stocks, Sectors]
│
├── Portfolio Health
│   ├── Value: $10,540 (+5.4% from start)
│   ├── Diversification Score: 78/100
│   ├── Green Days: 12/14
│   └── Sector Breakdown [Pie]
│
├── Weekly Summary
│   ├── Time Spent: 2h 15m
│   ├── Key Learning: "Risk & Diversification"
│   └── Portfolio Trend: +$200
│
└── Settings
    ├── Notifications
    ├── Community Settings
    ├── Export Data
    └── Manage Account
```

## Data Model

```
ParentAccount {
  id: string
  email: string
  linked_children: [User]
  preferences: {
    community_enabled: boolean
    leaderboard_visible: boolean
    email_frequency: 'weekly' | 'monthly' | 'never'
  }
}

ParentView {
  child_id: string
  learning_level: 1-7
  lessons_completed: number
  portfolio_value: number
  diversification_score: number
  green_day_percentage: number
  time_spent_this_week: number
}
```

## MVP Version

Parent dashboard is Phase 2 (after core features work).

Start simple:
- Learning progress (levels, lessons)
- Portfolio overview (value, change %)
- Time spent
- Simple email digest

Add later:
- Risk indicators
- Advanced analytics
- Custom exports
