# Project Instructions & Personas

## UI/UX Design Integrity
- **Single Scroll Context:** To prevent double scrollbar regressions in iframe environments, always enforce `html { overflow: hidden }` and `body { overflow-y: auto }`.
- **Viewport Height Chain:** Maintain a strict height chain: `html { height: 100% }`, `body { min-height: 100% }`, and `#root { min-height: 100% }`.
- **Root Wrapper:** Use a relative height for the primary application wrapper. Avoid `min-h-screen` or `min-h-full` on the root container as it forces the page to be at least 100vh, creating unused space at the bottom of short content.
- **Body Background Management:** Instead of a `fixed` div for background colors, apply the background class directly to the `document.body` via a `useEffect` in `App.tsx`. This ensures the background covers the entire scrollable area without affecting layout calculations.
- **Token Integrity:** 100% of styles must be derived from `TOKENS` in `src/lib/design-system.tsx`.
- **Anti-Slop:** Avoid generic AI-generated aesthetics. Use opinionated font pairings (e.g., Anton + JetBrains Mono) and high-contrast technical palettes.
- **Anti-Flicker & GPU Acceleration:** Avoid applying `transform-gpu` or `will-change-transform` to the `body` or `html` as it can interfere with height calculations in some headless environments.
