# Design System: Technical Dashboard (2026)

This document serves as the persistent source of truth for the UI/UX design tokens in this codebase.

## Semantic Tokens

### Colors
- **Background (bg):** `#E4E3E0` (Warm Paper)
- **Ink (ink):** `#141414` (Deep Charcoal)
- **Line (line):** `#141414` (Sharp Borders)
- **Accent (accent):** `#F27D26` (Warm Orange)
- **Muted (muted):** `rgba(20, 20, 20, 0.5)`

### Typography
- **Display:** "Anton", sans-serif (Bold, Uppercase)
- **Body:** "Inter", sans-serif (Clean, Modern)
- **Mono:** "Courier New", monospace (Data Precision)

### Spacing
- **Base:** `4px`
- **Gutter:** `16px`
- **Section:** `48px`

## Layout Rules
- **Grid:** 12-column fluid grid.
- **Borders:** 1px solid `var(--line)` for all structural elements.
- **Density:** High density for desktop, fluid stacking for mobile.

## Interaction
- **Hover:** Invert colors (bg -> ink, ink -> bg).
- **Transitions:** `0.2s ease-in-out`.
