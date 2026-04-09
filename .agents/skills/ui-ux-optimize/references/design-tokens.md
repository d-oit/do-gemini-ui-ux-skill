# Design Tokens Reference

Design tokens are the visual atoms of the design system. They are named entities that store visual design attributes.

## Core Categories
- **Colors:** Primary, Secondary, Surface, Background, Border, Text.
- **Typography:** Font families, sizes, weights, line heights.
- **Spacing:** Padding, margins, gaps.
- **Radius:** Border radius for components.
- **Effects:** Shadows, blurs, glassmorphism, animations.

## Naming Convention
Use semantic naming (e.g., `TOKENS.colors.app.primary`) rather than literal naming (e.g., `TOKENS.colors.blue600`).

## Implementation
Tokens should be defined in `src/lib/design-system.tsx` and documented in `docs/design/design-system.md`.
