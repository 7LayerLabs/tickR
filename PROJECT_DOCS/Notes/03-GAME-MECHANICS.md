# TickR - Game Mechanics Deep Dive

## Philosophy: Learning Through Play

Every game mechanic in TickR serves a **dual purpose**:
1. **Engagement** - Makes the app fun and addictive
2. **Education** - Reinforces good learning habits and financial concepts

This is not "gamification as decoration" - the game IS the learning experience.

---

## XP (Experience Points) System

### What is XP?
XP is the universal currency of progress in TickR. It measures overall engagement and learning, not just trading performance.

### XP Earning Actions

| Action | XP Reward | Purpose |
|--------|-----------|---------|
| **Buy a stock** | +25 XP | Encourages active trading practice |
| **Sell a stock** | +15 XP | Rewards complete trade cycles |
| **Complete a lesson** | +50 XP | Prioritizes learning over trading |
| **Pass a quiz (≥70%)** | +75 XP | Tests understanding |
| **Perfect quiz score** | +150 XP | Rewards mastery |
| **Complete daily challenge** | Variable | Drives daily engagement |
| **Daily login** | +10 XP | Builds consistent habits |
| **Unlock achievement** | +200 XP | Celebrates milestones |
| **Complete learning path** | +500 XP | Major accomplishment |

### XP Design Principles

1. **Learning > Trading** - Lessons give more XP than trades
2. **Quality > Quantity** - Perfect scores rewarded
3. **Consistency Rewarded** - Daily login bonuses
4. **Milestone Celebrations** - Big XP for achievements

---

## Leveling System

### Level Progression

| Level | Title | Total XP Required | XP for Level |
|-------|-------|-------------------|--------------|
| 1 | Rookie | 0 | 0 |
| 2 | Beginner | 500 | 500 |
| 3 | Apprentice | 1,200 | 700 |
| 4 | Trader | 2,100 | 900 |
| 5 | Investor | 3,300 | 1,200 |
| 6 | Strategist | 4,800 | 1,500 |
| 7 | Expert | 6,600 | 1,800 |
| 8 | Master | 8,700 | 2,100 |
| 9 | Legend | 11,100 | 2,400 |
| 10 | Wall Street Wolf | 14,000 | 2,900 |
| 11 | Market Genius | 17,500 | 3,500 |
| 12 | Trading Titan | 21,500 | 4,000 |
| 13 | Finance Guru | 26,000 | 4,500 |
| 14 | Money Master | 31,000 | 5,000 |
| 15 | Ultimate Investor | 37,000 | 6,000 |

### Level Title Design
- **Levels 1-3**: Beginner terminology (Rookie, Beginner, Apprentice)
- **Levels 4-6**: Competence (Trader, Investor, Strategist)
- **Levels 7-9**: Expertise (Expert, Master, Legend)
- **Levels 10-12**: Prestige (Wall Street Wolf, Market Genius, Trading Titan)
- **Levels 13-15**: Ultimate status (Finance Guru, Money Master, Ultimate Investor)

### Level Colors
Each level has a signature color used throughout the UI:
```
Level 1: #94a3b8 (Gray)       Level 9: #14b8a6 (Teal)
Level 2: #10b981 (Green)      Level 10: #eab308 (Gold)
Level 3: #0ea5e9 (Blue)       Level 11: #6366f1 (Indigo)
Level 4: #8b5cf6 (Purple)     Level 12: #a855f7 (Violet)
Level 5: #f59e0b (Amber)      Level 13: #06b6d4 (Cyan)
Level 6: #ec4899 (Pink)       Level 14: #84cc16 (Lime)
Level 7: #ef4444 (Red)        Level 15: #f43f5e (Rose)
Level 8: #f97316 (Orange)
```

### Level-Up Experience
- Visual celebration on level up
- New title displayed prominently
- XP progress bar resets
- Achievement check triggered

---

## Achievement System

### Achievement Categories

#### Trading Achievements
| Badge | Name | Requirement | Icon |
|-------|------|-------------|------|
| first_trade | First Trade! | Make your first stock purchase | 🎯 |
| trader_10 | Active Trader | Complete 10 trades | 📈 |
| trader_50 | Trading Pro | Complete 50 trades | 🏆 |
| diversified | Diversified | Own 5 different stocks | 🌈 |
| big_spender | Big Spender | Single trade worth $1,000+ | 💰 |
| profit_100 | In The Green | Earn $100 total profit | 💵 |
| profit_1000 | Money Maker | Earn $1,000 total profit | 🤑 |

#### Learning Achievements
| Badge | Name | Requirement | Icon |
|-------|------|-------------|------|
| first_lesson | Student | Complete first lesson | 📚 |
| lessons_10 | Bookworm | Complete 10 lessons | 🎓 |
| lessons_25 | Scholar | Complete 25 lessons | 🧠 |
| quiz_master | Quiz Master | Score 100% on 5 quizzes | ⭐ |
| path_complete | Path Finder | Complete entire learning path | 🛤️ |

#### Streak Achievements
| Badge | Name | Requirement | Icon |
|-------|------|-------------|------|
| streak_3 | Getting Started | 3-day login streak | 🔥 |
| streak_7 | Week Warrior | 7-day login streak | 🔥 |
| streak_30 | Monthly Master | 30-day login streak | 👑 |

#### Level Achievements
| Badge | Name | Requirement | Icon |
|-------|------|-------------|------|
| level_5 | Rising Star | Reach Level 5 | ⭐ |
| level_10 | Expert Trader | Reach Level 10 | 🌟 |

#### Exploration Achievements
| Badge | Name | Requirement | Icon |
|-------|------|-------------|------|
| explorer | Explorer | View 20 different stock pages | 🔍 |

### Achievement Display States

**Locked State:**
- Grayed out icon (shows lock)
- Description visible (encourages pursuit)
- Progress bar (if applicable)

**Unlocked State:**
- Full color with glow effect
- Checkmark badge
- Unlock date shown
- +200 XP celebration

### Achievement Progress Tracking
Some achievements track progress:
```typescript
{
  id: 'trader_10',
  name: 'Active Trader',
  maxProgress: 10,
  progress: 7,  // User has 7/10 trades
  unlockedAt: undefined  // Not yet unlocked
}
```

---

## Daily Challenge System

### Challenge Design
Each day generates 3 fresh challenges:

| Challenge | Type | Target | XP Reward |
|-----------|------|--------|-----------|
| "Make a Trade" | trade | 1 | 50 XP |
| "Learn Something New" | learn | 2 lessons | 75 XP |
| "Quiz Time" | quiz | Pass 1 quiz | 100 XP |

### Challenge Mechanics
- **Reset Time**: Midnight local time
- **No Rollover**: Incomplete challenges expire
- **Progress Persists**: Partial progress saves during day
- **Varied Difficulty**: Mix of easy/medium/hard

### Challenge UI Elements
- Progress bars for each challenge
- Completion checkmarks
- XP preview badges
- Time remaining indicator

### Challenge Purpose
1. **Daily Engagement** - Reason to return every day
2. **Diverse Activity** - Mix of trading + learning
3. **Achievable Goals** - Completable in 10-15 minutes
4. **Habit Formation** - Builds routine

---

## Streak System

### How Streaks Work
```
Day 1: Login → Streak = 1
Day 2: Login → Streak = 2
Day 3: Login → Streak = 3
Day 4: Miss → Streak resets to 0
Day 5: Login → Streak = 1
```

### Streak Display
- Fire emoji 🔥 with count
- Prominent in sidebar
- Special card in dashboard
- Achievement unlocks at milestones

### Streak Design Psychology
- **Loss Aversion** - "Don't break the streak!"
- **Social Proof** - "14-day streak" as bragging right
- **Milestone Rewards** - Achievements at 3, 7, 30 days
- **Recovery Friendly** - Easy to restart after break

### Longest Streak Tracking
- Personal record saved separately
- Displayed in profile
- Motivates return even after break

---

## Leaderboard System

### Ranking Categories

**1. XP Leaders**
- Ranks by total XP earned
- Rewards overall engagement
- Most inclusive metric

**2. Top Portfolios**
- Ranks by portfolio value
- Rewards smart trading
- Shows investment skill

**3. Longest Streaks**
- Ranks by current streak
- Rewards consistency
- Easiest to compete in

### Leaderboard Display

**Top 3 Podium:**
- 1st: Crown emoji 👑, gold styling
- 2nd: Silver medal 🥈
- 3rd: Bronze medal 🥉

**User Position:**
- Always highlighted
- Shows rank number
- Distance to next rank

**Motivational Messages:**
```
Top 3: "Amazing! Keep trading to stay on top!"
4-6: "You're #X! Just Y XP from the podium!"
7+: "Every trade gets you closer to the top!"
```

### Competitive Elements
- Position change indicators (↑↓-)
- Mock competitors for demo mode
- Friend comparisons (future feature)

---

## Game Loop

### Core Loop (Daily)
```
LOGIN
  ↓
Daily XP bonus (+10)
  ↓
View Daily Challenges
  ↓
CHOOSE ACTIVITY:
  ├→ Trade stocks (+25 XP each)
  ├→ Complete lessons (+50 XP each)
  └→ Take quizzes (+75-150 XP)
  ↓
Track progress on challenges
  ↓
Unlock achievements
  ↓
Level up (occasionally)
  ↓
Check leaderboard
  ↓
RETURN TOMORROW
```

### Engagement Hooks

| Hook | Trigger | Effect |
|------|---------|--------|
| **Variable Rewards** | XP amounts vary | Dopamine from uncertainty |
| **Progress Bars** | Visual XP/level progress | Zeigarnik effect |
| **Streaks** | Daily login | Loss aversion |
| **Social** | Leaderboards | Competition motivation |
| **Collection** | Achievements | Completionist drive |
| **Mastery** | Levels/titles | Skill recognition |

---

## Balance Considerations

### Anti-Grinding Measures
- XP focuses on quality (learning), not quantity (trades)
- No infinite XP sources
- Daily challenges cap easy XP

### Accessibility
- Achievable in ~15 min/day
- No pay-to-win mechanics
- Skill-based progression

### Fair Competition
- Same starting resources ($10K)
- Merit-based rankings
- Learning weighted equally to trading

---

## Future Mechanics Ideas

### Social Features
- Friend challenges (1v1 competitions)
- Team/class leaderboards
- Achievement sharing

### Advanced Trading
- Unlock advanced order types at higher levels
- Options paper trading at Level 10+
- Portfolio analytics tools

### Seasonal Events
- Weekly challenges with special rewards
- Themed learning events
- Limited-time achievements

---

## Document Navigation

- [01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) - Vision and goals
- [02-TECHNICAL-ARCHITECTURE.md](./02-TECHNICAL-ARCHITECTURE.md) - How it's built
- [04-FEATURES-GUIDE.md](./04-FEATURES-GUIDE.md) - Complete feature breakdown
- [05-LEARNING-CURRICULUM.md](./05-LEARNING-CURRICULUM.md) - Educational content
- [06-UI-UX-DESIGN.md](./06-UI-UX-DESIGN.md) - Design system
- [07-FUTURE-ROADMAP.md](./07-FUTURE-ROADMAP.md) - What's next
