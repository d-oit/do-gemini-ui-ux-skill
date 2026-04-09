# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: neural.spec.ts >> Neural Brain Visualizer Tests >> Search functionality filters neurons
- Location: tests/neural.spec.ts:11:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Central Cortex')
Expected: visible
Error: strict mode violation: locator('text=Central Cortex') resolved to 2 elements:
    1) <span class="text-[10px] uppercase tracking-[0.3em] absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/60 font-medium">Central Cortex</span> aka getByText('Central Cortex', { exact: true })
    2) <span>Central cortex at peak efficiency.</span> aka getByText('Central cortex at peak')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Central Cortex')

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
        - button "neural" [ref=e18]: neural
        - button "fitness" [ref=e20]
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e24]: Neural Network
      - heading "Neural Brain Visualizer" [level=2] [ref=e26]
      - paragraph [ref=e27]: Interactive neural network simulation visualizing synaptic load and core processing nodes.
    - generic [ref=e29]:
      - generic [ref=e30]:
        - img
        - button "Central Cortex":
          - generic: Central Cortex
        - generic [ref=e32]:
          - generic [ref=e33]:
            - paragraph [ref=e34]: Neural Status
            - paragraph [ref=e35]: Synchronized
          - generic [ref=e36]:
            - img [ref=e37]
            - textbox "Search neurons..." [active] [ref=e40]: Central
      - generic [ref=e42]:
        - generic [ref=e43]:
          - generic [ref=e44]:
            - img [ref=e46]
            - generic [ref=e48]:
              - paragraph [ref=e49]: Global Sync Rate
              - paragraph [ref=e50]: 98.4%
          - generic [ref=e51]:
            - img [ref=e53]
            - generic [ref=e59]:
              - paragraph [ref=e60]: Active Synapses
              - paragraph [ref=e61]: 1,240
        - generic [ref=e62]:
          - button "Optimize Network" [ref=e63]:
            - img [ref=e64]
            - generic [ref=e66]: Optimize Network
          - generic [ref=e67]:
            - heading "System Logs" [level=4] [ref=e68]
            - generic [ref=e69]:
              - generic [ref=e70]:
                - generic [ref=e71]: "[10:45:02]"
                - generic [ref=e72]: Neural handshake successful.
              - generic [ref=e73]:
                - generic [ref=e74]: "[11:45:02]"
                - generic [ref=e75]: Memory bank 2 optimization complete.
              - generic [ref=e76]:
                - generic [ref=e77]: "[12:45:02]"
                - generic [ref=e78]: Logic gate B load spike detected.
              - generic [ref=e79]:
                - generic [ref=e80]: "[13:45:02]"
                - generic [ref=e81]: Central cortex at peak efficiency.
    - generic [ref=e83]:
      - generic [ref=e84]:
        - heading "Design Token Audit" [level=3] [ref=e85]
        - generic [ref=e86]:
          - generic [ref=e87]: "bg: bg-[#050505]"
          - generic [ref=e88]: "surface: bg-white/[0.03]"
          - generic [ref=e89]: "primary: bg-blue-600"
          - generic [ref=e90]: "text: text-white"
          - generic [ref=e91]: "muted: text-slate-400"
          - generic [ref=e92]: "border: border-white/[0.12]"
          - generic [ref=e93]: "accent: text-blue-400"
      - generic [ref=e94]:
        - heading "Self-Learning Loop" [level=3] [ref=e95]
        - generic [ref=e96]: "LOG: Neural Brain context. RULE: Use SVG pathLength for synapse flow. RESULT: High-fidelity brain visualizer."
      - generic [ref=e97]:
        - heading "Visual Audit (Simulated)" [level=3] [ref=e98]
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]: Screen
            - generic [ref=e102]: Status
          - generic [ref=e103]:
            - generic [ref=e104]: Dashboard
            - generic [ref=e105]: ● Verified
          - generic [ref=e106]:
            - generic [ref=e107]: Combat HUD
            - generic [ref=e108]: ● Verified
          - generic [ref=e109]:
            - generic [ref=e110]: Bento Grid
            - generic [ref=e111]: ● Verified
          - generic [ref=e112]:
            - generic [ref=e113]: Spatial UI
            - generic [ref=e114]: ● Verified
          - generic [ref=e115]:
            - generic [ref=e116]: Fluid Motion
            - generic [ref=e117]: ● Verified
          - generic [ref=e118]:
            - generic [ref=e119]: Neural Brain
            - generic [ref=e120]: ● Verified
          - generic [ref=e121]:
            - generic [ref=e122]: Mobile Nav
            - generic [ref=e123]: ● Optimized
          - generic [ref=e124]:
            - generic [ref=e125]: Stitch Tokens
            - generic [ref=e126]: ● Aligned
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
  15 |     // Should see Central Cortex
> 16 |     await expect(page.locator('text=Central Cortex')).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  17 |     
  18 |     // Should NOT see Logic Gate A
  19 |     await expect(page.locator('text=Logic Gate A')).not.toBeVisible();
  20 |   });
  21 | 
  22 |   test('Optimization process updates load values', async ({ page }) => {
  23 |     // Click Optimize button
  24 |     await page.click('button:has-text("Optimize Network")');
  25 |     
  26 |     // Should show "Optimizing..."
  27 |     await expect(page.locator('text=Optimizing...')).toBeVisible();
  28 |     
  29 |     // Wait for optimization to complete (simulated 2s)
  30 |     await page.waitForTimeout(3000);
  31 |     
  32 |     // Should show "Optimization Complete"
  33 |     await expect(page.locator('text=Optimization Complete')).toBeVisible();
  34 |   });
  35 | 
  36 |   test('Visual regression - Neural Mode', async ({ page }) => {
  37 |     // Wait for animations to settle
  38 |     await page.waitForTimeout(2000);
  39 |     await expect(page).toHaveScreenshot('neural-visualizer.png');
  40 |   });
  41 | });
  42 | 
```