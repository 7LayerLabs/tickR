# Games Mode (PRIVATE FIRST)

## Game Creation Flow

**Who Can Create:**
- Any user Level 1+

**Game Parameters:**

| Parameter | Options |
|-----------|---------|
| Duration | 7 days / 30 days / 60 days |
| Starting Money | $10k / $25k / $50k |
| Max Players | 2–10 |
| Visibility | Invite only (link or username) |

## Hard Rules (Locked - Non-Negotiable)

The following are **always disabled** in games:
- ❌ No leverage (margin trading)
- ❌ No options
- ❌ No cryptocurrency
- ❌ No penny stocks (sub-$1)
- ❌ No day trading (trade cooldown: 1 transaction per stock per day)

**Purpose:** Prevent reckless behavior, keep the focus on strategy and learning.

## Game Features

### Real-Time Updates
- Stock prices update live during market hours
- Portfolio values calculate in real-time
- Leaderboard refreshes every 5 minutes

### Chat / Game Board
- Game-specific discussion thread
- Players can discuss strategy
- No trading of real money

### Game Rules Display
- Show rule set at game start
- Allow players to see current standings
- Allow viewing transaction history

## End of Game

**On Game End Date:**
- Leaderboard locks
- Players see final rankings
- Option to export results

**After Game:**
- Game moves to history
- Results archived
- Option to start rematch

## Data Model

```
Game {
  id: string
  creator_id: string
  name: string
  duration: 7 | 30 | 60
  starting_money: 10000 | 25000 | 50000
  max_players: 2-10
  players: [User]
  created_at: timestamp
  ends_at: timestamp
  status: 'active' | 'completed'
  leaderboard: [PlayerRanking]
}

PlayerRanking {
  user_id: string
  final_portfolio_value: number
  final_rank: number
  score: number (from composite scoring)
}
```

## MVP Notes

Games are Phase 3 (after core product is live).

In MVP, build:
- Basic game creation UI
- Invite link generation
- Real-time portfolio tracking for game
- Simple leaderboard (portfolio value only)

Advanced features (composite scoring) come later.
