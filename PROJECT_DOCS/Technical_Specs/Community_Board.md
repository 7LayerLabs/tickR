# Community Board (NOT Social Media)

## Core Structure

Topic-based threads. Not Twitter. Not Instagram.

**Design Principles:**
- ✔ Educational discussions
- ✔ Learning-first
- ✔ Moderated heavily
- ❌ No direct messages
- ❌ No hype language ("Moon," "YOLO," etc.)
- ❌ No "buy this now" posts

## Moderation Rules

**Auto-flagged phrases:**
- "Buy now"
- "Get rich"
- Crypto / lottery language
- Ticker symbols in posts (except sector discussions)

**Moderation team:**
- Reviews flagged posts before visibility
- Can remove posts
- Can mute users
- Can ban for repeated violations

**Community Guidelines:**
- Be respectful
- Ask questions, don't hype
- Share what you learned
- Explain your thinking

## Example Threads

These are the TYPES of discussions we enable:

1. **"Why did Tech drop today?"**
   - Discuss market events
   - Learn cause/effect
   - Share analysis

2. **"What sector did well this week?"**
   - Track performance
   - Learn sector rotation
   - Discuss winners/losers

3. **"What I learned from a red week"**
   - Share experiences
   - Celebrate learning
   - Support peers

4. **"Questions about diversification"**
   - Ask for help
   - Get peer explanations
   - Crowdsource thinking

## User Experience

### Browse View
- See all threads
- Filter by topic (Sectors, Learning, Market News, General)
- Sort by new/popular
- No algorithm (chronological default)

### Create Thread
- Title (required)
- Category (required)
- Body (required)
- No images, no links (except documentation)

### Reply to Thread
- Text only
- Can mark as "reply to" specific comment
- Voting (upvote, no downvote)

### User Profile in Community
- Username only (no email)
- Post history (last 10 posts)
- No follow/friend system
- No DM capability

## Flags & Safety

### What Gets Flagged
- Profanity
- Hype language
- Stock tickers (context dependent)
- External links
- Trolling patterns

### User Reporting
- Report post → mod queue
- Report user → investigation
- Muted users: posts hidden but not deleted

### Age Safety
- All users age 12–16
- Moderation is strict
- Parents can request transcript of child's posts

## Analytics (For Product)

Track:
- Most popular threads
- Topics kids care about
- Questions that come up repeatedly
- Safety metrics (flags, removals)

Use this to improve lessons.

## Data Model

```
Thread {
  id: string
  author_id: string
  title: string
  category: 'sectors' | 'learning' | 'market' | 'general'
  body: string
  created_at: timestamp
  replies: [Reply]
  flagged: boolean
  status: 'visible' | 'hidden' | 'removed'
}

Reply {
  id: string
  author_id: string
  body: string
  created_at: timestamp
  upvotes: number
  flagged: boolean
}
```

## MVP Launch

Community is Phase 3 (after core game).

Start with:
- 5 pre-made threads (samples)
- Basic moderation queue
- Simple flagging system
- No voting (just threads)

Advanced features:
- Gamified contributions
- User badges
- "Most helpful" ranking
