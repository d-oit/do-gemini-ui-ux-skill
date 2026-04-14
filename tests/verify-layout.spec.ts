import { test, expect } from '@playwright/test';

test.describe('UI Layout Verification', () => {
  const viewports = [
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
  ];

  for (const vp of viewports) {
    test(`Verify no unused bottom space on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      
      // Wait for app to load
      await page.waitForTimeout(3000);
      await page.waitForLoadState('networkidle');

      // Check if body is scrollable
      const isScrollable = await page.evaluate(() => {
        return document.body.scrollHeight > window.innerHeight;
      });

      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const rootHeight = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root ? root.getBoundingClientRect().height : 0;
      });

      console.log(`${vp.name}: Viewport=${viewportHeight}, ScrollHeight=${scrollHeight}, RootHeight=${rootHeight}`);

      // If it's scrollable, check how much "empty" space is at the bottom
      if (isScrollable) {
        const elements = await page.evaluate(() => {
          const results = [];
          const main = document.querySelector('main');
          if (main) {
            results.push({ name: 'main', rect: main.getBoundingClientRect() });
            const children = Array.from(main.children);
            children.forEach((child, i) => {
              results.push({ name: `main-child-${i}`, rect: child.getBoundingClientRect(), tag: child.tagName, className: child.className });
            });
          }
          const root = document.getElementById('root');
          if (root) results.push({ name: 'root', rect: root.getBoundingClientRect() });
          return results;
        });
        
        console.log(`${vp.name} Elements:`, JSON.stringify(elements, null, 2));

        // Check if Grid children are visible (sidebar)
        const gridVisibility = await page.evaluate(() => {
          const grid = document.querySelector('.grid');
          if (!grid) return 'Grid not found';
          const children = Array.from(grid.children);
          return children.map((child, i) => ({
            index: i,
            height: child.getBoundingClientRect().height,
            visible: child.getBoundingClientRect().height > 0
          }));
        });
        console.log(`${vp.name} Grid Visibility:`, JSON.stringify(gridVisibility, null, 2));

        // Check if Training Feed is visible
        const feedVisibility = await page.evaluate(() => {
          const feed = document.querySelector('[data-testid="training-feed"]');
          if (!feed) return 'Feed not found';
          const rect = feed.getBoundingClientRect();
          return {
            height: rect.height,
            visible: rect.height > 0,
            top: rect.top
          };
        });
        console.log(`${vp.name} Feed Visibility:`, JSON.stringify(feedVisibility, null, 2));
        
        const lastElementBottom = await page.evaluate(() => {
          const main = document.querySelector('main');
          if (!main) return 0;
          const rect = main.getBoundingClientRect();
          return rect.bottom + window.scrollY;
        });
        
        const unusedSpace = scrollHeight - lastElementBottom;
        console.log(`${vp.name}: Last element bottom=${lastElementBottom}, Unused space=${unusedSpace}`);
        
        // We expect unused space to be minimal (just the pb-4 padding)
        // If it's large (e.g. > 100px), it's a bug
        expect(unusedSpace).toBeLessThan(100);
      }
    });
  }
});
