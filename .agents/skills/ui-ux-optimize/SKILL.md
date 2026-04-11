---
name: ui-ux-optimize
description: Converts ambiguous UI/UX requests into technical design specifications using semantic tokens and structural hierarchy. Use when a user asks for UI improvements, modern design, or when building interfaces that need scalable design systems and responsive layouts.
---

# UI/UX Prompt Optimizer

## Goal
Convert ambiguous UI/UX requests into technical design specifications using semantic tokens and structural hierarchy.

## When to Use
- Request contains vague adjectives ("modern", "clean", "sleek").
- Project requires a scalable design system (tokens).
- Interface needs multi-viewport validation (Mobile, Tablet, Desktop).
- Bridging high-level intent to implementation-ready code.

## When Not to Use
- Backend-only logic or data processing.
- Simple bug fixes without layout impact.
- Immutable design systems where tokens are already fixed.

## Swarm Architecture
This skill operates using a specialized "Swarm" of internal personas:
1. **The Researcher:** Proactively searches for design patterns and accessibility standards.
2. **The Token Architect:** Defines and maintains the persistent Design DNA in `docs/design/`.
3. **The Developer:** Implements the UI using semantic tokens and high-fidelity components.
4. **The Auditor:** Performs visual regression and layout audits to ensure "zero-overlap" and "anti-slop" compliance.

## Autoresearch Loop
If a request is ambiguous, the Researcher MUST trigger an autoresearch loop:
- Search for "modern [Product Type] UI trends 2026".
- Identify common layout patterns for the specific industry.
- Extract accessibility requirements for the target audience.

## Session Files
To ensure continuity across turns, the skill maintains:
- `ui-ux-session.md`: Human-readable log of design decisions and audit results.
- `ui-ux-session.jsonl`: Machine-readable state for the self-learning loop.

## Gotchas
- **AI Slop:** The agent will naturally gravitate towards generic "modern" aesthetics (e.g., purple gradients, Inter font). You must explicitly override this with specific, opinionated design tokens.
- **Mobile Cutoffs:** Horizontal lists often break on mobile. Always enforce `overflow-x-auto` for horizontal navigation.
- **Z-Index Wars:** Avoid absolute positioning for core layout. Enforce flow-based layouts (Flexbox/Grid) to prevent overlapping elements.
- **Flickering UI:** State transitions without `AnimatePresence` will flicker. Always use `mode="wait"` and `initial={false}` for smooth transitions. High-motion elements must use `TOKENS.effects.antiFlicker` to stabilize rendering.
- **Overflow Jitter:** Unstable scrollbars cause layout shifts. Enforce `overflow-x-hidden` on the root container and `overflow-y-auto` for content.

## Required Workflow

### Phase 1: Research & Translate
1. **Analyze:** Parse the request for intent, audience, and density.
2. **Research:** Trigger the Autoresearch Loop if intent is vague.
3. **Translate:** Convert adjectives into concrete technical constraints.

### Phase 2: Token & Structure
1. **Initialize:** Ensure `docs/design/` and `src/lib/design-system.tsx` are present and aligned.
2. **Tokenize:** Update semantic tokens in the persistent docs.
3. **Structure:** Map the IA and screen hierarchy before styling.

### Phase 3: Generate & Verify
1. **Generate:** Produce implementation-ready code using `TOKENS`.
2. **Verify:** Run `npx -y node .agents/skills/ui-ux-optimize/scripts/validate-tokens.cjs`.
3. **Test:** Use Playwright to verify responsiveness and visibility.

### Phase 4: Audit & Learn
1. **Audit:** Perform a "Red Team" design audit using the template.
2. **Fix:** Resolve any overlaps or contrast issues.
3. **Learn:** Update `LEARNINGS.md` with specific technical insights.

## Quality Bar
- **Zero Overlap:** No elements should collide on any viewport (375px to 1920px).
- **High Contrast:** All text must meet WCAG AA standards against dynamic backgrounds.
- **Motion Stability:** Zero flickering or layout shifts during transitions.
- **Token Integrity:** 100% of styles derived from `TOKENS`.

## Cross-Skill Integration
- **Gemini API:** Use for generating contextual copy or analyzing screenshots.
- **Playwright:** Mandatory for Phase 3/4 verification.
- **Frontend Design:** Source of truth for aesthetic recipes.

## Reference Files Index
- [Design Tokens](references/design-tokens.md)
- [Typography](references/typography.md)
- [Color System](references/color-system.md)
- [Layout & Composition](references/layout-composition.md)
- [Navigation Clarity](references/navigation-clarity.md)
- [Responsive Rules](references/responsive-screen-rules.md)
- [Game UI Rules](references/game-ui-rules.md)
- [Anti-Slop Rules](references/anti-slop-rules.md)
- [Self-Learning Loop](references/self-learning-loop.md)
- [Stitch Alignment](references/stitch-design-token-alignment.md)
- [Prompt Patterns](references/prompt-patterns.md)
- [Review Checklist](references/review-checklist.md)
- [Variant Worktree Flow](references/variant-worktree-flow.md)

## Scripts
- `validate-tokens.cjs`: Fast-fail design system check.
