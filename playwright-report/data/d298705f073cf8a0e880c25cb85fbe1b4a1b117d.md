# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: neural.spec.ts >> Neural Brain Visualizer Tests >> Visual regression - Neural Mode
- Location: tests/neural.spec.ts:36:3

# Error details

```
Error: A snapshot doesn't exist at /app/applet/tests/neural.spec.ts-snapshots/neural-visualizer-chromium-linux.png, writing actual.
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
        - button "command" [ref=e16]
        - button "fluid" [ref=e17]
        - button "neural" [active] [ref=e18]: neural
        - button "fitness" [ref=e20]
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e24]: Neural Network
      - heading "Neural Brain Visualizer" [level=2] [ref=e26]
      - paragraph [ref=e27]: Interactive neural network simulation visualizing synaptic load and core processing nodes.
    - generic [ref=e29]:
      - generic [ref=e30]:
        - img
        - button "Central Cortex" [ref=e32]:
          - img [ref=e35]
          - generic [ref=e43]: Central Cortex
        - button "Logic Gate A" [ref=e44]:
          - img [ref=e47]
          - generic [ref=e49]: Logic Gate A
        - button "Logic Gate B" [ref=e50]:
          - img [ref=e53]
          - generic [ref=e55]: Logic Gate B
        - button "Memory Bank 1" [ref=e56]:
          - img [ref=e59]
          - generic [ref=e62]: Memory Bank 1
        - button "Memory Bank 2" [ref=e63]:
          - img [ref=e66]
          - generic [ref=e69]: Memory Bank 2
        - button "Output Buffer" [ref=e70]:
          - img [ref=e73]
          - generic [ref=e81]: Output Buffer
        - generic [ref=e82]:
          - generic [ref=e83]:
            - paragraph [ref=e84]: Neural Status
            - paragraph [ref=e85]: Synchronized
          - generic [ref=e86]:
            - img [ref=e87]
            - textbox "Search neurons..." [ref=e90]
      - generic [ref=e92]:
        - generic [ref=e93]:
          - generic [ref=e94]:
            - img [ref=e96]
            - generic [ref=e98]:
              - paragraph [ref=e99]: Global Sync Rate
              - paragraph [ref=e100]: 98.4%
          - generic [ref=e101]:
            - img [ref=e103]
            - generic [ref=e109]:
              - paragraph [ref=e110]: Active Synapses
              - paragraph [ref=e111]: 1,240
        - generic [ref=e112]:
          - button "Optimize Network" [ref=e113]:
            - img [ref=e114]
            - generic [ref=e116]: Optimize Network
          - generic [ref=e117]:
            - heading "System Logs" [level=4] [ref=e118]
            - generic [ref=e119]:
              - generic [ref=e120]:
                - generic [ref=e121]: "[10:45:02]"
                - generic [ref=e122]: Neural handshake successful.
              - generic [ref=e123]:
                - generic [ref=e124]: "[11:45:02]"
                - generic [ref=e125]: Memory bank 2 optimization complete.
              - generic [ref=e126]:
                - generic [ref=e127]: "[12:45:02]"
                - generic [ref=e128]: Logic gate B load spike detected.
              - generic [ref=e129]:
                - generic [ref=e130]: "[13:45:02]"
                - generic [ref=e131]: Central cortex at peak efficiency.
    - generic [ref=e133]:
      - generic [ref=e134]:
        - heading "Design Token Audit" [level=3] [ref=e135]
        - generic [ref=e136]:
          - generic [ref=e137]: "bg: bg-[#050505]"
          - generic [ref=e138]: "surface: bg-white/[0.03]"
          - generic [ref=e139]: "primary: bg-blue-600"
          - generic [ref=e140]: "text: text-white"
          - generic [ref=e141]: "muted: text-slate-400"
          - generic [ref=e142]: "border: border-white/[0.12]"
          - generic [ref=e143]: "accent: text-blue-400"
      - generic [ref=e144]:
        - heading "Self-Learning Loop" [level=3] [ref=e145]
        - generic [ref=e146]: "LOG: Neural Brain context. RULE: Use SVG pathLength for synapse flow. RESULT: High-fidelity brain visualizer."
      - generic [ref=e147]:
        - heading "Visual Audit (Simulated)" [level=3] [ref=e148]
        - generic [ref=e149]:
          - generic [ref=e150]:
            - generic [ref=e151]: Screen
            - generic [ref=e152]: Status
          - generic [ref=e153]:
            - generic [ref=e154]: Dashboard
            - generic [ref=e155]: ● Verified
          - generic [ref=e156]:
            - generic [ref=e157]: Combat HUD
            - generic [ref=e158]: ● Verified
          - generic [ref=e159]:
            - generic [ref=e160]: Bento Grid
            - generic [ref=e161]: ● Verified
          - generic [ref=e162]:
            - generic [ref=e163]: Spatial UI
            - generic [ref=e164]: ● Verified
          - generic [ref=e165]:
            - generic [ref=e166]: Fluid Motion
            - generic [ref=e167]: ● Verified
          - generic [ref=e168]:
            - generic [ref=e169]: Neural Brain
            - generic [ref=e170]: ● Verified
          - generic [ref=e171]:
            - generic [ref=e172]: Mobile Nav
            - generic [ref=e173]: ● Optimized
          - generic [ref=e174]:
            - generic [ref=e175]: Stitch Tokens
            - generic [ref=e176]: ● Aligned
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Neural Brain Visualizer Tests', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |     // Switch to neural mode
  7  |     await page.click('button:has-text("neural")');
  8  |     await page.waitForTimeout(1000);
  9  |   });
  10 | 
  11 |   test('Search functionality filters neurons', async ({ page }) => {
  12 |     const searchInput = page.locator('input[placeholder="Search neurons..."]');
  13 |     await searchInput.fill('Central');
  14 |     
  15 |     // Should see Central Cortex (use exact match to avoid log entries)
  16 |     await expect(page.getByText('Central Cortex', { exact: true })).toBeVisible();
  17 |     
  18 |     // Should NOT see Logic Gate A
  19 |     await expect(page.getByText('Logic Gate A', { exact: true })).not.toBeVisible();
  20 |   });
  21 | 
  22 |   test('Optimization process updates load values', async ({ page }) => {
  23 |     // Click Optimize button
  24 |     await page.getByRole('button', { name: /Optimize Network/i }).click();
  25 |     
  26 |     // Should show "Optimizing..."
  27 |     await expect(page.getByText('Optimizing...', { exact: true })).toBeVisible();
  28 |     
  29 |     // Wait for optimization to complete (simulated 2s)
  30 |     await page.waitForTimeout(3000);
  31 |     
  32 |     // Should show "Optimization Complete" (use exact match to avoid log entries)
  33 |     await expect(page.getByText('Optimization Complete', { exact: true })).toBeVisible();
  34 |   });
  35 | 
  36 |   test('Visual regression - Neural Mode', async ({ page }) => {
  37 |     // Wait for animations to settle
  38 |     await page.waitForTimeout(2000);
  39 |     // Mask the brain visualizer and logs as they are dynamic/animated
> 40 |     await expect(page).toHaveScreenshot('neural-visualizer.png', {
     |     ^ Error: A snapshot doesn't exist at /app/applet/tests/neural.spec.ts-snapshots/neural-visualizer-chromium-linux.png, writing actual.
  41 |       mask: [
  42 |         page.locator('svg'), 
  43 |         page.locator('.lg\\:col-span-7'), // Brain visualizer container
  44 |         page.locator('font-mono') // System logs
  45 |       ],
  46 |       animations: 'disabled'
  47 |     });
  48 |   });
  49 | });
  50 | 
```