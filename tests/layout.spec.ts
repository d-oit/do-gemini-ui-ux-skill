import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 800 },
];

test.describe('Layout Density & Responsive Tests', () => {
  for (const viewport of viewports) {
    test(`Layout is compact and verified on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Check if header is visible
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Check for Live Training Data Feed
      await expect(page.getByText('Neural Training Data Feed')).toBeVisible();
      
      // Check if main content is visible and not overlapped by header (roughly)
      const title = page.getByRole('heading', { level: 2 }).first();
      await expect(title).toBeVisible();
      
      const titleBox = await title.boundingBox();
      const headerBox = await header.boundingBox();
      
      if (titleBox && headerBox) {
        // Title should be below header
        expect(titleBox.y).toBeGreaterThan(headerBox.y + headerBox.height);
        
        // The gap should not be excessive
        const gap = titleBox.y - (headerBox.y + headerBox.height);
        const maxGap = viewport.width < 768 ? 80 : 120;
        expect(gap).toBeLessThan(maxGap);
      }

      // Check for text visibility in Spatial Command Center (if active)
      await page.click('button:has-text("command")');
      await page.waitForTimeout(500);
      const commandHeading = page.locator('h4:has-text("Network")');
      await expect(commandHeading).toBeVisible();
      
      // Visual regression for each viewport
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot(`layout-${viewport.name.toLowerCase()}.png`, {
        mask: [
          page.locator('svg'),
          page.getByTestId('training-feed'),
          page.getByTestId('view-container')
        ], 
        animations: 'disabled'
      });
    });
  }
});
