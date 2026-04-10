# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> Layout Density & Responsive Tests >> Layout is compact and verified on Desktop
- Location: tests/layout.spec.ts:11:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

Timeout: 5000ms
  Failed to take two consecutive stable screenshots.

  Snapshot: layout-desktop.png

Call log:
  - Expect "toHaveScreenshot(layout-desktop.png)" with timeout 5000ms
    - generating new stable screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 648 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 250ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 443 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 500ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 463 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 1000ms before taking screenshot
  - Timeout 5000ms exceeded.

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - img [ref=e8]
        - heading "UI/UX OPTIMIZE" [level=1] [ref=e10]
      - navigation [ref=e11]:
        - button "app" [ref=e12]
        - button "game" [ref=e13]
        - button "bento" [ref=e14]
        - button "2026" [ref=e15]
        - button "command" [active] [ref=e16]: command
        - button "fluid" [ref=e18]
        - button "neural" [ref=e19]
        - button "fitness" [ref=e20]
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e24]: Spatial Command
      - heading "Spatial Command Center" [level=2] [ref=e26]
      - paragraph [ref=e27]: A comprehensive integration of spatial surfaces, contextual lighting, and adaptive density patterns.
    - generic [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]:
            - img [ref=e35]
            - generic [ref=e37]:
              - heading "Core Status" [level=3] [ref=e38]
              - paragraph [ref=e39]: Operational
          - generic [ref=e40]:
            - generic [ref=e42]:
              - generic [ref=e43]:
                - img [ref=e44]
                - text: Neural Load
              - generic [ref=e47]: 74%
            - generic [ref=e50]:
              - generic [ref=e51]:
                - img [ref=e52]
                - text: Global Sync
              - generic [ref=e55]: 92%
            - generic [ref=e58]:
              - generic [ref=e59]:
                - img [ref=e60]
                - text: Security
              - generic [ref=e62]: 100%
        - button "System Config" [ref=e64]:
          - img [ref=e65]
          - text: System Config
      - generic [ref=e68]:
        - generic [ref=e72]:
          - generic [ref=e73]: Neural Telemetry
          - heading "Network Synchronization" [level=4] [ref=e74]:
            - text: Network
            - text: Synchronization
          - paragraph [ref=e75]: Real-time visualization of distributed neural nodes and cross-region data propagation.
        - generic [ref=e109]:
          - generic [ref=e110]:
            - img [ref=e112]
            - generic [ref=e114]:
              - paragraph [ref=e115]: "01"
              - paragraph [ref=e116]: Node Alpha
          - generic [ref=e117]:
            - img [ref=e119]
            - generic [ref=e121]:
              - paragraph [ref=e122]: "02"
              - paragraph [ref=e123]: Node Alpha
          - generic [ref=e124]:
            - img [ref=e126]
            - generic [ref=e128]:
              - paragraph [ref=e129]: "03"
              - paragraph [ref=e130]: Node Alpha
    - generic [ref=e131]:
      - generic [ref=e134]: Neural Training Data Feed
      - generic [ref=e135]:
        - generic [ref=e137]:
          - generic [ref=e138]: LAYER_0
          - generic [ref=e139]: "0.3936"
        - generic [ref=e143]:
          - generic [ref=e144]: LAYER_1
          - generic [ref=e145]: "0.1936"
        - generic [ref=e149]:
          - generic [ref=e150]: LAYER_2
          - generic [ref=e151]: "0.4543"
        - generic [ref=e155]:
          - generic [ref=e156]: LAYER_3
          - generic [ref=e157]: "0.3583"
        - generic [ref=e161]:
          - generic [ref=e162]: LAYER_4
          - generic [ref=e163]: "0.6714"
        - generic [ref=e167]:
          - generic [ref=e168]: LAYER_5
          - generic [ref=e169]: "0.8881"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const viewports = [
  4  |   { name: 'Mobile', width: 375, height: 667 },
  5  |   { name: 'Tablet', width: 768, height: 1024 },
  6  |   { name: 'Desktop', width: 1280, height: 800 },
  7  | ];
  8  | 
  9  | test.describe('Layout Density & Responsive Tests', () => {
  10 |   for (const viewport of viewports) {
  11 |     test(`Layout is compact and verified on ${viewport.name}`, async ({ page }) => {
  12 |       await page.setViewportSize({ width: viewport.width, height: viewport.height });
  13 |       await page.goto('/');
  14 |       
  15 |       // Check if header is visible
  16 |       const header = page.locator('header');
  17 |       await expect(header).toBeVisible();
  18 |       
  19 |       // Check for Live Training Data Feed
  20 |       await expect(page.getByText('Neural Training Data Feed')).toBeVisible();
  21 |       
  22 |       // Check if main content is visible and not overlapped by header (roughly)
  23 |       const title = page.getByRole('heading', { level: 2 }).first();
  24 |       await expect(title).toBeVisible();
  25 |       
  26 |       const titleBox = await title.boundingBox();
  27 |       const headerBox = await header.boundingBox();
  28 |       
  29 |       if (titleBox && headerBox) {
  30 |         // Title should be below header
  31 |         expect(titleBox.y).toBeGreaterThan(headerBox.y + headerBox.height);
  32 |         
  33 |         // The gap should not be excessive
  34 |         const gap = titleBox.y - (headerBox.y + headerBox.height);
  35 |         const maxGap = viewport.width < 768 ? 80 : 120;
  36 |         expect(gap).toBeLessThan(maxGap);
  37 |       }
  38 | 
  39 |       // Check for text visibility in Spatial Command Center (if active)
  40 |       await page.click('button:has-text("command")');
  41 |       await page.waitForTimeout(500);
  42 |       const commandHeading = page.locator('h4:has-text("Network")');
  43 |       await expect(commandHeading).toBeVisible();
  44 |       
  45 |       // Visual regression for each viewport
  46 |       await page.waitForTimeout(1000);
> 47 |       await expect(page).toHaveScreenshot(`layout-${viewport.name.toLowerCase()}.png`, {
     |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  48 |         mask: [
  49 |           page.locator('svg'),
  50 |           page.getByTestId('training-feed')
  51 |         ], 
  52 |         animations: 'disabled'
  53 |       });
  54 |     });
  55 |   }
  56 | });
  57 | 
```