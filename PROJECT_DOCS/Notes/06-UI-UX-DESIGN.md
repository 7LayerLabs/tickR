# TickR - UI/UX Design System

## Design Philosophy

### Core Principles

1. **Fun First** - Make finance feel approachable, not intimidating
2. **Visual Progress** - Every action should feel rewarding
3. **Clarity Over Cleverness** - Teens should understand immediately
4. **Mobile-Ready** - Works great on any device
5. **Accessible** - High contrast, readable fonts, clear affordances

### Design Personality
- **Energetic** but not overwhelming
- **Playful** but not childish
- **Modern** but not trendy
- **Trustworthy** but not boring

---

## Color System

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Emerald** | #10b981 | Success, gains, positive actions |
| **Cyan** | #0ea5e9 | Primary brand, CTAs |
| **Amber** | #f59e0b | XP, rewards, warnings |
| **Red** | #ef4444 | Losses, sells, alerts |

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Slate 800** | #1e293b | Primary text |
| **Slate 600** | #475569 | Secondary text |
| **Slate 400** | #94a3b8 | Tertiary/muted text |
| **Slate 100** | #f1f5f9 | Backgrounds |
| **White** | #ffffff | Card backgrounds |

### Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Purple** | #8b5cf6 | Learn, education |
| **Pink** | #ec4899 | Competition, social |
| **Orange** | #f97316 | Streaks, fire |
| **Indigo** | #6366f1 | Finance, banking |
| **Teal** | #14b8a6 | Gaming sector |

### Level Colors
Each user level has a signature color:
```
Level 1:  #94a3b8 (Gray)
Level 2:  #10b981 (Green)
Level 3:  #0ea5e9 (Blue)
Level 4:  #8b5cf6 (Purple)
Level 5:  #f59e0b (Amber)
Level 6:  #ec4899 (Pink)
Level 7:  #ef4444 (Red)
Level 8:  #f97316 (Orange)
Level 9:  #14b8a6 (Teal)
Level 10: #eab308 (Gold)
```

---

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Display Font
```css
.font-display {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
}
```

### Type Scale

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| **text-5xl** | 48px | Bold | Hero headlines |
| **text-4xl** | 36px | Bold | Section titles |
| **text-3xl** | 30px | Bold | Page titles |
| **text-2xl** | 24px | Bold | Card headers |
| **text-xl** | 20px | Semibold | Subheadings |
| **text-lg** | 18px | Medium | Large body |
| **text-base** | 16px | Normal | Body text |
| **text-sm** | 14px | Normal | Secondary text |
| **text-xs** | 12px | Medium | Labels, badges |

---

## Spacing System

Based on Tailwind's default scale:

| Name | Value | Usage |
|------|-------|-------|
| **1** | 4px | Tiny gaps |
| **2** | 8px | Icon spacing |
| **3** | 12px | Small gaps |
| **4** | 16px | Standard gap |
| **5** | 20px | Medium spacing |
| **6** | 24px | Large spacing |
| **8** | 32px | Section spacing |

### Container Padding
- Mobile: `px-4` (16px)
- Desktop: `px-6` (24px)
- Max width: `max-w-6xl` (1152px)

---

## Border Radius

| Class | Radius | Usage |
|-------|--------|-------|
| **rounded-lg** | 8px | Buttons, inputs |
| **rounded-xl** | 12px | Small cards |
| **rounded-2xl** | 16px | Cards, modals |
| **rounded-3xl** | 24px | Hero sections |
| **rounded-full** | 50% | Avatars, badges |

---

## Shadows

| Class | Usage |
|-------|-------|
| **shadow-sm** | Subtle depth |
| **shadow-md** | Cards on hover |
| **shadow-lg** | Modals, dropdowns |
| **shadow-xl** | Floating elements |

### Colored Shadows
```css
shadow-emerald-200  /* Success actions */
shadow-red-200      /* Sell actions */
shadow-amber-200    /* XP rewards */
```

---

## Component Library

### Buttons

**Primary Button**
```html
<button class="px-6 py-3 rounded-xl bg-gradient-to-r
  from-emerald-500 to-cyan-500 text-white font-bold
  hover:shadow-lg transition-all">
  Action
</button>
```

**Secondary Button**
```html
<button class="px-6 py-3 rounded-xl bg-slate-100
  text-slate-700 font-semibold hover:bg-slate-200
  transition-colors">
  Cancel
</button>
```

**Danger Button**
```html
<button class="px-6 py-3 rounded-xl bg-gradient-to-r
  from-red-500 to-rose-500 text-white font-bold
  hover:shadow-lg shadow-red-200 transition-all">
  Sell
</button>
```

### Cards

**Basic Card**
```html
<div class="p-6 rounded-2xl bg-white border-2
  border-slate-100 hover:shadow-lg transition-all">
  Content
</div>
```

**Gradient Card**
```html
<div class="p-6 rounded-3xl bg-gradient-to-br
  from-emerald-50 to-cyan-50 border-2 border-emerald-200">
  Content
</div>
```

**Hero Card**
```html
<div class="relative overflow-hidden rounded-3xl
  bg-gradient-to-br from-cyan-500 via-blue-500
  to-purple-600 p-8 text-white">
  Content
</div>
```

### Badges

**Status Badge**
```html
<span class="px-3 py-1 rounded-full text-sm font-bold
  bg-emerald-100 text-emerald-600">
  +2.5%
</span>
```

**HOT Badge**
```html
<span class="px-2.5 py-1 rounded-full text-xs font-bold
  bg-gradient-to-r from-orange-400 to-red-500 text-white">
  🔥 HOT
</span>
```

### Progress Bars

**XP Progress Bar**
```html
<div class="h-3 rounded-full overflow-hidden bg-slate-200">
  <div
    class="h-full rounded-full transition-all"
    style="width: 65%; background: linear-gradient(90deg,
      #10b981, #0ea5e9, #8b5cf6)"
  />
</div>
```

### Inputs

**Search Input**
```html
<div class="relative">
  <Search class="absolute left-4 top-1/2 -translate-y-1/2
    text-slate-400" />
  <input
    type="text"
    placeholder="Search..."
    class="w-full pl-12 pr-4 py-4 rounded-2xl
      border-2 border-slate-200 focus:border-cyan-500
      focus:outline-none transition-colors"
  />
</div>
```

### Modals

**Modal Structure**
```html
<!-- Backdrop -->
<div class="fixed inset-0 z-50 flex items-center justify-center">
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

  <!-- Modal Content -->
  <div class="relative w-full max-w-md bg-white
    rounded-3xl shadow-2xl overflow-hidden">

    <!-- Header -->
    <div class="p-6 bg-gradient-to-r from-emerald-500
      to-cyan-500 text-white">
      Header
    </div>

    <!-- Body -->
    <div class="p-6">
      Content
    </div>
  </div>
</div>
```

### Toasts

**Success Toast**
```html
<div class="fixed top-4 right-4 z-50">
  <div class="flex items-center gap-3 px-6 py-4 rounded-2xl
    bg-gradient-to-r from-emerald-500 to-green-500
    text-white shadow-xl">
    <CheckCircle />
    <div>
      <div class="font-bold">Success!</div>
      <div class="text-emerald-100">Message here</div>
    </div>
  </div>
</div>
```

---

## Layout Patterns

### Dashboard Layout
```
┌──────────────────────────────────────────────────┐
│ ┌─────────┐  ┌─────────────────────────────────┐ │
│ │         │  │ Header                          │ │
│ │ Sidebar │  ├─────────────────────────────────┤ │
│ │         │  │                                 │ │
│ │ - Nav   │  │ Main Content Area               │ │
│ │ - User  │  │                                 │ │
│ │ - Stats │  │ (max-w-6xl mx-auto p-6)         │ │
│ │         │  │                                 │ │
│ └─────────┘  └─────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Grid Patterns

**2-Column Feature Grid**
```html
<div class="grid lg:grid-cols-2 gap-6">
```

**3-Column Card Grid**
```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
```

**4-Column Stats Grid**
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
```

---

## Animation Guidelines

### Transitions
```css
transition-all duration-200   /* Quick interactions */
transition-all duration-300   /* Standard animations */
transition-all duration-500   /* Emphasis animations */
```

### Hover Effects

**Scale on Hover**
```html
<div class="hover:scale-105 transition-transform">
```

**Shadow on Hover**
```html
<div class="hover:shadow-xl transition-shadow">
```

**Color on Hover**
```html
<div class="hover:bg-slate-50 transition-colors">
```

### Loading States

**Spinner**
```html
<div class="w-8 h-8 border-4 border-emerald-500
  border-t-transparent rounded-full animate-spin">
</div>
```

**Pulse**
```html
<div class="animate-pulse bg-slate-200 rounded-xl h-12">
</div>
```

---

## Responsive Breakpoints

| Breakpoint | Width | Typical Use |
|------------|-------|-------------|
| **sm** | 640px | Large phones |
| **md** | 768px | Tablets |
| **lg** | 1024px | Laptops |
| **xl** | 1280px | Desktops |

### Mobile-First Examples
```html
<!-- Stack on mobile, side-by-side on desktop -->
<div class="flex flex-col lg:flex-row gap-6">

<!-- Full width on mobile, half on desktop -->
<div class="w-full lg:w-1/2">

<!-- Hidden on mobile, visible on desktop -->
<div class="hidden lg:block">
```

---

## Icon System

Using **Lucide React** icons.

### Common Icons

| Icon | Usage |
|------|-------|
| `TrendingUp` | Gains, buying |
| `TrendingDown` | Losses, selling |
| `Trophy` | Achievements, compete |
| `BookOpen` | Learning |
| `Zap` | XP, energy |
| `Flame` | Streaks, hot |
| `Star` | Favorites, ratings |
| `ChevronRight` | Navigation |
| `X` | Close |
| `Plus` / `Minus` | Quantity controls |

### Icon Sizes
```html
<Icon class="w-4 h-4" />  <!-- Small -->
<Icon class="w-5 h-5" />  <!-- Default -->
<Icon class="w-6 h-6" />  <!-- Medium -->
<Icon class="w-8 h-8" />  <!-- Large -->
```

---

## Dark Theme (Landing Page)

The landing page uses a dark theme while the dashboard uses light:

```css
background: #0f1628;
border-color: #1f3a5f;
card-background: #141e2f;
text-primary: #ffffff;
text-secondary: #94a3b8;
```

---

## Accessibility Guidelines

### Color Contrast
- Maintain 4.5:1 contrast ratio minimum
- Don't rely solely on color for information
- Use icons/text alongside color indicators

### Focus States
```css
focus:outline-none focus:ring-4 focus:ring-cyan-500/30
```

### Touch Targets
- Minimum 44x44px for touch targets
- Adequate spacing between interactive elements

### Text
- Minimum 16px body text
- Max line length ~70 characters
- Clear hierarchy

---

## Document Navigation

- [01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) - Vision and goals
- [02-TECHNICAL-ARCHITECTURE.md](./02-TECHNICAL-ARCHITECTURE.md) - How it's built
- [03-GAME-MECHANICS.md](./03-GAME-MECHANICS.md) - XP, levels, achievements
- [04-FEATURES-GUIDE.md](./04-FEATURES-GUIDE.md) - Complete feature breakdown
- [05-LEARNING-CURRICULUM.md](./05-LEARNING-CURRICULUM.md) - Educational content
- [07-FUTURE-ROADMAP.md](./07-FUTURE-ROADMAP.md) - What's next
