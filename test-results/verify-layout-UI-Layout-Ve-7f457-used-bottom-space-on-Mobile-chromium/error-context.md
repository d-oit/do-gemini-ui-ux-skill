# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verify-layout.spec.ts >> UI Layout Verification >> Verify no unused bottom space on Mobile
- Location: tests/verify-layout.spec.ts:11:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('main') to be visible

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('UI Layout Verification', () => {
  4  |   const viewports = [
  5  |     { name: 'Desktop', width: 1280, height: 720 },
  6  |     { name: 'Tablet', width: 768, height: 1024 },
  7  |     { name: 'Mobile', width: 375, height: 667 },
  8  |   ];
  9  | 
  10 |   for (const vp of viewports) {
  11 |     test(`Verify no unused bottom space on ${vp.name}`, async ({ page }) => {
  12 |       await page.setViewportSize({ width: vp.width, height: vp.height });
  13 |       await page.goto('/');
  14 |       
  15 |       // Wait for app to load with longer timeout
> 16 |       await page.waitForSelector('main', { timeout: 60000 });
     |                  ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  17 | 
  18 |       // Check if body is scrollable
  19 |       const isScrollable = await page.evaluate(() => {
  20 |         return document.body.scrollHeight > window.innerHeight;
  21 |       });
  22 | 
  23 |       const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  24 |       const viewportHeight = await page.evaluate(() => window.innerHeight);
  25 |       const rootHeight = await page.evaluate(() => {
  26 |         const root = document.getElementById('root');
  27 |         return root ? root.getBoundingClientRect().height : 0;
  28 |       });
  29 | 
  30 |       console.log(`${vp.name}: Viewport=${viewportHeight}, ScrollHeight=${scrollHeight}, RootHeight=${rootHeight}`);
  31 | 
  32 |       // If it's scrollable, check how much "empty" space is at the bottom
  33 |       if (isScrollable) {
  34 |         const elements = await page.evaluate(() => {
  35 |           const results = [];
  36 |           const main = document.querySelector('main');
  37 |           if (main) {
  38 |             results.push({ name: 'main', rect: main.getBoundingClientRect() });
  39 |             const children = Array.from(main.children);
  40 |             children.forEach((child, i) => {
  41 |               results.push({ name: `main-child-${i}`, rect: child.getBoundingClientRect(), tag: child.tagName, className: child.className });
  42 |             });
  43 |           }
  44 |           const root = document.getElementById('root');
  45 |           if (root) results.push({ name: 'root', rect: root.getBoundingClientRect() });
  46 |           return results;
  47 |         });
  48 |         
  49 |         console.log(`${vp.name} Elements:`, JSON.stringify(elements, null, 2));
  50 | 
  51 |         // Check if Grid children are visible (sidebar)
  52 |         const gridVisibility = await page.evaluate(() => {
  53 |           const grid = document.querySelector('.grid');
  54 |           if (!grid) return 'Grid not found';
  55 |           const children = Array.from(grid.children);
  56 |           return children.map((child, i) => ({
  57 |             index: i,
  58 |             height: child.getBoundingClientRect().height,
  59 |             visible: child.getBoundingClientRect().height > 0
  60 |           }));
  61 |         });
  62 |         console.log(`${vp.name} Grid Visibility:`, JSON.stringify(gridVisibility, null, 2));
  63 | 
  64 |         // Check if Training Feed is visible
  65 |         const feedVisibility = await page.evaluate(() => {
  66 |           const feed = document.querySelector('[data-testid="training-feed"]');
  67 |           if (!feed) return 'Feed not found';
  68 |           const rect = feed.getBoundingClientRect();
  69 |           return {
  70 |             height: rect.height,
  71 |             visible: rect.height > 0,
  72 |             top: rect.top
  73 |           };
  74 |         });
  75 |         console.log(`${vp.name} Feed Visibility:`, JSON.stringify(feedVisibility, null, 2));
  76 |         
  77 |         const lastElementBottom = await page.evaluate(() => {
  78 |           const main = document.querySelector('main');
  79 |           if (!main) return 0;
  80 |           const rect = main.getBoundingClientRect();
  81 |           return rect.bottom + window.scrollY;
  82 |         });
  83 |         
  84 |         const unusedSpace = scrollHeight - lastElementBottom;
  85 |         console.log(`${vp.name}: Last element bottom=${lastElementBottom}, Unused space=${unusedSpace}`);
  86 |         
  87 |         // We expect unused space to be minimal (just the pb-4 padding)
  88 |         // If it's large (e.g. > 100px), it's a bug
  89 |         expect(unusedSpace).toBeLessThan(100);
  90 |       }
  91 |     });
  92 |   }
  93 | });
  94 | 
```