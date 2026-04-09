# Lessons Learned: UI/UX Optimize Skill

- **Verification (2026-04-01):** Successfully applied the skill to create a `FitnessTracker` dashboard.
- **Insight:** Renaming `validate-tokens.js` to `.cjs` was necessary to support `require` in an ESM-default project.
- **Result:** The "Initialize -> Tokenize -> Optimize -> Validate" loop is fully functional and produces high-fidelity, token-aligned UI.
- **Audit:** The `technical` theme correctly inherited tokens from `docs/design/design-system.md`.
- **Anti-Flicker & Overflow (2026-04-01):** High-motion views (Fluid, Trends, Neural) can suffer from layout flickering due to complex blurs and 3D transforms.
- **Solution:** Implement `TOKENS.effects.antiFlicker` (`will-change-transform transform-gpu backface-visibility-hidden`) on all animated containers. Ensure `overflow-x-hidden` on the root container to stabilize the scrollbar across media screens.
- **Result:** Zero-jitter transitions and stable layout positioning on both mobile and desktop viewports.
- **Design Mode Expansion (2026-04-04):** As the application grew to include diverse themes (Neural, Technical/Fitness), the base `Card` and `Button` components became bottlenecks by only supporting `app` and `game` modes.
- **Solution:** Expanded `DesignMode` to include `neural` and `technical`. Refactored base components to dynamically select styles from `TOKENS.colors[mode]`. Implemented a `designMode` mapping function in the root `App.tsx` to bridge application states to design system tokens.
- **Result:** Unified component behavior across all thematic views while maintaining strict visual isolation between modes.
