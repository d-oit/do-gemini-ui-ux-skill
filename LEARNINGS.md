# UI/UX Optimization Learnings

This document summarizes the key technical and design learnings from the optimization of the UI/UX Optimize Skill Builder.

## 1. Layout & Scroll Management
- **Single Scroll Context**: Avoid nesting `overflow-x-hidden` or `overflow-y-auto` in multiple containers. This can trigger multiple scrollbars or "white gaps" at the bottom of the page. Centralize overflow management on the `html` and `body` tags.
- **Viewport Height Chain**: To ensure background colors cover the entire screen, maintain a strict height chain: `html { height: 100% }`, `body { min-height: 100% }`, and `#root { height: 100% }`.
- **Root Container Height**: Use `min-h-screen` on the primary application wrapper. `min-h-full` can fail if the parent chain is interrupted or if content is positioned absolutely.
- **Layout Density**: Avoid excessive top padding on the `main` container when using a fixed floating header. A gap of 16-24px between the header bottom and content top is usually sufficient for a "breathable" but compact feel.
- **Text Visibility & Overflow**: Large headings (e.g., `text-6xl`) in multi-column layouts can easily overflow their containers on smaller screens. Use responsive font sizes (e.g., `text-2xl md:text-4xl lg:text-6xl`), `break-words`, and `text-center` on mobile to ensure text remains fully visible and doesn't break the layout.
- **Contrast for Accessibility**: In dark-themed technical interfaces, avoid using low-opacity text (e.g., `text-white/40`) for critical data or labels. Use high-contrast tokens (e.g., `text-white` or `text-cyan-50`) and increase background opacity of containers to ensure legibility against complex backgrounds.
- **HUD Safe Zones & Overlap Prevention**: When using absolute positioning for HUDs or overlays, define "Safe Zones" in coordinates to prevent dynamic elements (like neurons or nodes) from overlapping interactive controls. Use `z-index` hierarchies and responsive padding to maintain clear separation.
- **Label Positioning**: Position labels relative to nodes in a way that avoids intersection with connection lines. Placing labels *above* nodes with a slight offset and a subtle drop-shadow often provides the best clarity in dense network visualizations.
- **Viewport Constraints**: On mobile devices, ensure that absolute-positioned HUDs have dynamic offsets (e.g., `top-4 left-4`) and reduced minimum widths to prevent them from being clipped by the container's `overflow-hidden` property.
- **Default Backgrounds**: Always set a default background color on the `body` (e.g., `bg-slate-950`) that matches the app's primary theme. This prevents white flashes during transitions or gaps if content fails to fill the viewport.

## 2. Component Architecture
- **Nested Viewport Conflicts**: Avoid using `min-h-screen` inside sub-components that are rendered within a scrollable parent. This often leads to double scrollbars. Use `min-h-full` or flexible layouts for sub-components.
- **Anti-Flicker Tokens**: For high-motion SVG or Canvas views (like the Neural Visualizer), use `backface-visibility: hidden` or `transform: translateZ(0)` (via `TOKENS.effects.antiFlicker`) to prevent browser rendering artifacts and layout shifts.

## 3. Automated Testing (Playwright)
- **Strict Mode Locators**: In dynamic UIs where text might appear in both UI elements and logs/status messages, use `{ exact: true }` in locators to avoid "strict mode violation" errors.
- **Visual Regression Stability**:
    - **Masking**: Mask animated elements (SVGs, progress bars, logs) in screenshots to ensure stable visual regression tests.
    - **Settling Time**: Use `page.waitForTimeout()` to allow physics-based animations (like Framer Motion springs) to settle before taking snapshots.
- **Token Validation**: Use automated scripts to verify that all components use semantic tokens (`TOKENS`) rather than hardcoded values, ensuring design system integrity.

## 4. Aesthetic Principles
- **Atmospheric Depth**: Layered radial gradients and fixed background blurs create a sense of depth without impacting scroll performance if handled correctly (e.g., using `fixed inset-0 pointer-events-none`).
- **Typography Contrast**: Pairing a geometric sans-serif (Inter) with high-contrast display fonts or monospaced accents (JetBrains Mono) reinforces a "technical/premium" aesthetic.
