import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('Home Page - App Mode', async ({ page }) => {
    await page.goto('/');
    // Wait for animations to settle
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('home-app-mode.png', {
      mask: [page.locator('.dynamic-content')],
    });
  });

  test('Home Page - Mobile View', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('home-mobile.png');
  });
});
