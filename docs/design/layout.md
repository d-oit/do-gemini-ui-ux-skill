# Layout & Grid

## Structural Rules
1. **Visible Borders:** All major sections must have a 1px solid border.
2. **Grid System:** Use CSS Grid for layout.
3. **Mobile First:** Default to single column, use `md:` for multi-column.
4. **No Overlap:** Absolute positioning is forbidden for core layout.
5. **Dynamic Overlays:** Absolute elements (HUDs) must have defined "Safe Zones" in coordinates to prevent overlap with dynamic content.
6. **HUD Constraints:** HUDs on mobile must use relative widths (e.g., `w-[calc(100%-32px)]`) and fixed widths on desktop (e.g., `w-72`).

## Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
