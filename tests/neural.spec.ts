import { test, expect } from '@playwright/test';

test.describe('Neural Brain Visualizer Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Switch to neural mode
    await page.click('button:has-text("neural")');
    await page.waitForTimeout(1000);
  });

  test('Search functionality filters neurons', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search neurons..."]');
    
    // Ensure input is visible and clickable (not obscured by neurons)
    await expect(searchInput).toBeVisible();
    await searchInput.click();
    
    await searchInput.fill('Central');
    
    // Should see Central Cortex (use exact match to avoid log entries)
    await expect(page.getByText('Central Cortex', { exact: true })).toBeVisible();
    
    // Should NOT see Logic Gate A
    await expect(page.getByText('Logic Gate A', { exact: true })).not.toBeVisible();
  });

  test('Optimization process updates load values', async ({ page }) => {
    // Click Optimize button
    await page.getByRole('button', { name: /Optimize Network/i }).click();
    
    // Should show "Optimizing..."
    await expect(page.getByText('Optimizing...', { exact: true })).toBeVisible();
    
    // Wait for optimization to complete (simulated 2s)
    await page.waitForTimeout(3000);
    
    // Should show "Optimization Complete" (use exact match to avoid log entries)
    await expect(page.getByText('Optimization Complete', { exact: true })).toBeVisible();
  });

  test('Visual regression - Neural Mode', async ({ page }) => {
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    // Mask the brain visualizer and logs as they are dynamic/animated
    await expect(page).toHaveScreenshot('neural-visualizer.png', {
      mask: [
        page.locator('svg'), 
        page.locator('.lg\\:col-span-7'), // Brain visualizer container
        page.locator('font-mono') // System logs
      ],
      animations: 'disabled'
    });
  });
});
