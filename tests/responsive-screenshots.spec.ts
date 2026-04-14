import { test } from '@playwright/test';

test.describe('Responsive Screenshots', () => {
  test('Desktop Screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for animations
    await page.screenshot({ path: 'public/desktop.png', fullPage: true });
  });

  test('Tablet Screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'public/tablet.png', fullPage: true });
  });

  test('Mobile Screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'public/mobile.png', fullPage: true });
  });
});
