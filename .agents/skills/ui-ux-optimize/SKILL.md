---
name: ui-ux-optimize
description: Converts ambiguous UI/UX requests into technical design specifications using semantic tokens and structural hierarchy. Use when a user asks for UI improvements, modern design, or when building interfaces that need scalable design systems and responsive layouts.
---

# UI/UX Optimize Skill

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

## Workflow

1. **Initialize (MANDATORY):** If `docs/design/` is missing, generate persistent project-specific design documentation (e.g., `docs/design/design-system.md`, `docs/design/typography.md`) based on the skill's references. This is the source of truth for the specific codebase.
2. **Parse:** Extract product type, audience, and UI density requirements.
3. **Classify:** Map to interface model (Workflow, Dashboard, Game, etc.).
4. **Normalize:** Replace vague terms with concrete design constraints based on the persistent docs.
5. **Tokenize:** Define/update semantic tokens in `docs/design/design-system.md` and `src/lib/design-system.tsx` as the source of truth.
6. **Structure:** Map navigation and screen hierarchy before visual styling.
7. **Optimize:** Generate implementation-ready prompt using templates.
8. **Validate:** Run `npx -y node .agents/skills/ui-ux-optimize/scripts/validate-tokens.cjs` to ensure the design system is correctly initialized. Then run the design audit (see `assets/design-audit-template.md`). If validation fails, revise the layout and re-validate.
9. **Log:** Record lessons to improve future optimization runs.

## Gotchas

- **AI Slop:** The agent will naturally gravitate towards generic "modern" aesthetics (e.g., purple gradients, Inter font). You must explicitly override this with specific, opinionated design tokens.
- **Mobile Cutoffs:** Horizontal lists often break on mobile. Always enforce `overflow-x-auto` for horizontal navigation.
- **Z-Index Wars:** Avoid absolute positioning for core layout. Enforce flow-based layouts (Flexbox/Grid) to prevent overlapping elements.
- **Flickering UI:** State transitions without `AnimatePresence` will flicker. Always use `mode="wait"` and `initial={false}` for smooth transitions. High-motion elements must use `TOKENS.effects.antiFlicker` to stabilize rendering.
- **Overflow Jitter:** Unstable scrollbars cause layout shifts. Enforce `overflow-x-hidden` on the root container and `overflow-y-auto` for content.

## Required Outputs
- `optimized_prompt`: Technical instructions for implementation.
- `design_tokens_summary`: Semantic token definitions.
- `product_ui_mode`: Interface classification.
- `navigation_model`: IA and orientation rules.
- `screen_or_state_map`: Flow visualization.
- `responsive_behavior_summary`: Viewport-specific logic.
- `anti_slop_warnings`: Clichés removed or replaced.
- `layout_risk_flags`: Collision or wrapping risks.
- `lessons_learned`: Operational insights for the self-learning loop.

## Portability & Reuse
The UI/UX Optimize Skill is a portable "Design Engine". To reuse it in a new codebase:
1. **Copy the `.agents/skills/ui-ux-optimize/` directory** to the new project root.
2. **Initialize Persistent Design Docs:** Ask the agent to "Initialize the design system". It will create `docs/design/design-system.md` to store persistent, customizable design tokens for the specific codebase.
3. **Generate Code:** The agent will generate `src/lib/design-system.tsx` based on the persistent docs.
4. **Run a Design Audit:** Use the `assets/design-audit-template.md` to identify "slop" and layout risks in the new codebase.
5. **Apply the Skill:** The agent will then use the `SKILL.md` to refactor the UI into a high-fidelity, token-aligned interface.

## Core Principles
- **Tokens First:** All styles must derive from semantic tokens.
- **Stability First:** Prevent flickering and layout shifts (CLS) by using `antiFlicker` tokens (`will-change-transform transform-gpu`) on all animated or 3D transformed elements.
- **Navigation First:** IA clarity precedes visual treatment.
- **Anti-Overlap:** Enforce flow-based layouts over absolute positioning. No elements should overlap or cut off on any media screen.
- **Mobile-First:** Scale from 375px upwards with deliberate density shifts. Use `overflow-x-auto` for horizontal navigation.
- **Anti-Flicker:** Use `AnimatePresence` with `mode="wait"` and `initial={false}` for smooth state transitions. Avoid rapid layout shifts.
- **Visibility & Scrollability:** Ensure all text is readable and interactive elements are accessible. Use `min-h-screen` and `overflow-y-auto` for main containers.
- **Anti-Slop:** Zero generic AI-generated design language or "sludge" aesthetics.
- **Dynamic Adaptation:** The skill continuously self-learns from the `lessons_learned.md` log and codebase patterns.

## References
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

## Assets
- [Optimize Prompt](assets/optimize-prompt-template.md)
- [Design Audit](assets/design-audit-template.md)
- [Lessons Log](assets/lessons-log-template.md)
- [Screen Map](assets/screen-map-template.md)
- [Variant Brief](assets/variant-brief-template.md)
