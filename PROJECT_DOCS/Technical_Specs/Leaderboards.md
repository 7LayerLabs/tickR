# Leaderboards (COMPOSITE SCORE)

This is a HUGE differentiator.

## Final Score Breakdown

**No "YOLO wins."**

Instead of just ranking by portfolio return, TickR scores players on multiple dimensions:

| Dimension | Weight | Explanation |
|-----------|--------|-------------|
| Portfolio Performance | 50% | Total return % (gains/losses) |
| Risk & Diversification | 25% | How well-balanced the portfolio is |
| Consistency | 15% | Green vs red days (avoiding wild swings) |
| Learning Progress | 10% | Levels completed, lessons done |

**Example:**
- Player A: +100% return, 0 diversification, unstable → Score 75
- Player B: +40% return, 90% diversified, consistent → Score 88

Player B ranks higher because they played smarter.

## Types of Leaderboards

### Friends Leaderboard
- Private to the game or account
- See friends only
- Refreshes every 5 minutes

### Age-Banded Global Leaderboard
- Separate rankings by age group (12–13, 14–15, 16)
- Opt-in (parents control visibility)
- Refreshes daily

### Tournament Leaderboard
- Only visible for advanced tournaments
- Unlocked at Level 7+
- Shows composite score + breakdown

## Composite Score Calculation

```
Final_Score = (
  (Portfolio_Return_Percentile × 0.50) +
  (Diversification_Score × 0.25) +
  (Consistency_Score × 0.15) +
  (Learning_Progress_Score × 0.10)
) × 100
```

### Portfolio Return Percentile
- Ranked against all players in time period
- Percentile converted to 0–100 scale

### Diversification Score (0–100)
- 0 = all in one stock
- 100 = perfectly balanced across sectors
- Formula: `1 - (max_sector_allocation - target_allocation)`

### Consistency Score (0–100)
- Count of "green days" vs total days
- Penalize large single-day drops
- Formula: `(green_days / total_days) × 100`

### Learning Progress Score (0–100)
- Based on level + lessons completed
- Scale: (current_level / 7) × 100
- Bonus: +10 points per lesson completed (max +70)

## Display

### On Leaderboard Page
Show top 100 globally, user's rank, and top 10 friends.

```
🏆 Global Leaderboard (Age 14-15)
1. @crypto_kid       89.4 pts
2. @balanced_jane    87.2 pts
3. @your_username    83.1 pts (YOU)
...

Your Friends
1. @best_friend      81.5 pts
2. @other_friend     78.3 pts
```

### On Profile
Show player's:
- Overall rank
- Score breakdown (pie chart)
- Trend (getting better/worse)

## Privacy & Parent Controls

Parents can:
- Hide leaderboard from child view
- Disable global ranking
- Allow friends-only leaderboard

This keeps competitive elements healthy.
