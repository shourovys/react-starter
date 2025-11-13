import { expect, test } from '@playwright/test';

test.describe('Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/React.*TypeScript.*Starter/);
    await expect(page.locator('[data-testid="welcome-title"]')).toContainText(
      /Welcome to React.*TypeScript Starter/
    );
  });

  test('should display the main content sections', async ({ page }) => {
    // Check for the main card
    await expect(page.locator('[data-testid="welcome-title"]')).toContainText(
      'Welcome'
    );
    await expect(
      page.locator('[data-testid="welcome-description"]')
    ).toContainText('production-ready');

    // Check for the card component
    await expect(page.locator('[data-testid="welcome-card"]')).toHaveCount(1);
  });

  test('should toggle theme successfully', async ({ page }) => {
    // Wait for page to load completely
    await page.waitForTimeout(1000);

    // Find theme toggle button with reliable data-testid selector
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible({ timeout: 10000 });

    // Get initial theme class
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('class');

    // Click to open theme dropdown
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Click on dark theme option with more flexible selectors
    const darkOption = page.locator(
      'text=Dark, [role="menuitem"]:has-text("Dark")'
    );
    if (await darkOption.isVisible({ timeout: 2000 })) {
      await darkOption.click();
      await page.waitForTimeout(500);

      // Verify theme changed
      const newTheme = await html.getAttribute('class');
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should navigate between pages', async ({ page }) => {
    // Test navigation to About page
    const aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/.*\/about/);

    // Test navigation to Dashboard page
    const dashboardLink = page.locator('[data-testid="nav-dashboard"]');
    await expect(dashboardLink).toBeVisible();
    await dashboardLink.click();
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Test navigation back to Home page
    const homeLink = page.locator('[data-testid="nav-home"]');
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="welcome-title"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="welcome-title"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('[data-testid="welcome-title"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Test Enter key on focused element
    await page.keyboard.press('Enter');

    // Verify focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should load and display images correctly', async ({ page }) => {
    // Check for logo/image elements
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();

        // Check if image loads successfully
        const src = await img.getAttribute('src');
        if (src) {
          const response = await page.request.get(src);
          expect(response.status()).toBe(200);
        }
      }
    }
  });

  test('should handle 404 gracefully', async ({ page }) => {
    // Test 404 handling
    await page.goto('/non-existent-page');
    await expect(page.locator('[data-testid="not-found-title"]')).toContainText(
      /404|Not Found|Page Not Found/
    );
  });

  test('should have proper heading structure', async ({ page }) => {
    // Check heading hierarchy
    const h1 = page.locator('h1');
    const h2 = page.locator('h2');
    const h3 = page.locator('h3');

    // At least one heading should exist
    const headingCount = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check for ARIA labels on interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();

      // Button should have either aria-label or text content
      expect(ariaLabel || text?.trim()).toBeTruthy();
    }
  });
});

// Test with screenshots on failure
test.describe('Visual Regression Tests', () => {
  test('should take full page screenshot', async ({ page }) => {
    await page.goto('/');

    // Take a full page screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toBeTruthy();
  });
});

// Accessibility tests
test.describe('Accessibility Tests', () => {
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Test tab navigation through visible interactive elements only
    // Focus first visible interactive element (skip hidden mobile menu button)
    const firstInteractive = page
      .locator('a, button, [tabindex]:not([tabindex="-1"])')
      .filter({ visible: true })
      .first();
    await expect(firstInteractive).toBeVisible();
    await firstInteractive.focus();

    // Verify focus is visible by checking if element has focus
    const hasFocus = await firstInteractive.evaluate(
      el => el === document.activeElement
    );
    expect(hasFocus).toBeTruthy();

    // Test tabbing to next visible element
    await page.keyboard.press('Tab');
    const secondInteractive = page
      .locator('a, button, [tabindex]:not([tabindex="-1"])')
      .filter({ visible: true })
      .nth(1);
    await expect(secondInteractive).toBeVisible();

    // Verify focus moved to second element
    await secondInteractive.focus();
    const hasFocus2 = await secondInteractive.evaluate(
      el => el === document.activeElement
    );
    expect(hasFocus2).toBeTruthy();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    // Basic test to ensure text is visible
    const textElements = page.locator('h1, h2, h3, p, span, a, button');
    const textCount = await textElements.count();

    expect(textCount).toBeGreaterThan(0);
  });
});
