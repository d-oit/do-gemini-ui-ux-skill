# Visual Testing & Screenshots

This project uses **Playwright** to ensure visual stability and generate high-fidelity screenshots of UI/UX optimizations.

## Overview

Visual testing allows us to catch regressions in layout, color, and typography that traditional unit tests might miss. By capturing snapshots of our multi-mode interfaces, we can verify that changes to the design system don't break existing views.

## Core Commands

### 1. Capture Screenshots
Generate screenshots of specific views or components across different viewports.

```bash
# Capture full page screenshot
npx playwright screenshot --viewport-size=1280,720 http://localhost:3000/ screenshot.png

# Capture specific element (e.g., the Dynamic Island)
npx playwright screenshot --selector="#dynamic-island" http://localhost:3000/ island.png
```

### 2. Visual Regression (Snapshots)
Compare current UI against baseline snapshots. Note: In this environment, we primarily use **Chromium** for visual testing due to system dependency constraints for other browsers.

```bash
# Run visual tests (Chromium only)
npx playwright test
```

## Test Patterns

### Multi-Mode Verification
We test each design mode to ensure token alignment.

```typescript
import { test, expect } from '@playwright/test';

test('Neural Mode Visual Check', async ({ page }) => {
  await page.goto('http://localhost:3000/?mode=neural');
  await expect(page).toHaveScreenshot('neural-dashboard.png');
});

test('Technical Mode Density Check', async ({ page }) => {
  await page.goto('http://localhost:3000/?mode=technical');
  const telemetry = page.locator('#telemetry-panel');
  await expect(telemetry).toBeVisible();
  await expect(telemetry).toHaveScreenshot('telemetry-panel.png');
});
```

### Responsive Audits
Verify that text doesn't cut off and elements don't overlap on mobile.

```typescript
test('Mobile Layout Stability', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/');
  
  // Check for horizontal overflow (common mobile bug)
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasOverflow).toBe(false);
});
```

## Best Practices

- **Targeted Snapshots**: Snapshot specific components rather than full pages to reduce noise.
- **Masking**: Mask dynamic content (like timestamps or random data) to prevent false positives.
- **GPU Acceleration**: Use `TOKENS.effects.antiFlicker` to ensure stable rendering during capture.
