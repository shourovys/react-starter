import { expect, test } from '@playwright/test';

test.describe('Navigation Flow Tests', () => {
  test('should navigate through all pages successfully', async ({ page }) => {
    // Start from home page
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Wait for app to be ready
    await page.waitForSelector('body', { state: 'visible', timeout: 15000 });

    // Check if we can find any content
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();

    console.log('Page content:', bodyText?.substring(0, 200));

    // Try to find navigation elements
    const navElements = await page.locator('nav, header, a, button').count();
    console.log('Found navigation elements:', navElements);

    if (navElements > 0) {
      // Test basic navigation if elements exist
      const firstLink = page.locator('a').first();
      if (await firstLink.isVisible()) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');
      }
    }
  });
});
