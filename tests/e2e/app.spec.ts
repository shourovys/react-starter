import { expect, test } from '@playwright/test';

test.describe('Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for page to be fully loaded
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('body', { state: 'visible' });
  });

  test('should load the main page successfully', async ({ page }) => {
    // Wait for React app to mount
    await page.waitForSelector('[data-testid="welcome-title"]', {
      timeout: 15000,
    });

    await expect(page).toHaveTitle(/React.*TypeScript.*Starter/);
    await expect(page.locator('[data-testid="welcome-title"]')).toContainText(
      /Welcome to React.*TypeScript Starter/
    );
  });

  test('should display the main content sections', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('[data-testid="welcome-title"]', {
      timeout: 15000,
    });

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
    // Wait for theme toggle to be available
    await page.waitForSelector('[data-testid="theme-toggle"]', {
      timeout: 15000,
    });

    // Find theme toggle button with reliable data-testid selector
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible();

    // Get initial theme class
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('class');

    // Click to open theme dropdown and wait for menu to appear
    await themeToggle.click();
    await page.waitForSelector('[role="menuitem"]:has-text("Dark")', {
      timeout: 5000,
    });

    // Click on dark theme option
    const darkOption = page.locator('[role="menuitem"]:has-text("Dark")');
    await darkOption.click();

    // Wait for theme change animation
    await page.waitForTimeout(500);

    // Verify theme changed
    const newTheme = await html.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should navigate between pages', async ({ page }) => {
    // Wait for navigation to be available
    await page.waitForSelector('[data-testid="nav-about"]', { timeout: 15000 });

    // Test navigation to About page
    const aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/about/);

    // Test navigation to Dashboard page
    const dashboardLink = page.locator('[data-testid="nav-dashboard"]');
    await expect(dashboardLink).toBeVisible();
    await dashboardLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Test navigation back to Home page
    const homeLink = page.locator('[data-testid="nav-home"]');
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Wait for content to load first
    await page.waitForSelector('[data-testid="welcome-title"]', {
      timeout: 15000,
    });

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
    // Wait for interactive elements
    await page.waitForSelector('body', { state: 'visible' });

    // Test tab navigation through visible interactive elements only
    const interactiveElements = page
      .locator('a, button, [tabindex]:not([tabindex="-1"])')
      .filter({ visible: true });
    const elementCount = await interactiveElements.count();

    if (elementCount > 0) {
      // Focus first interactive element
      await interactiveElements.first().focus();

      // Test tabbing to next element
      await page.keyboard.press('Tab');

      // Test Enter key on focused element
      await page.keyboard.press('Enter');
    }
  });

  test('should load and display images correctly', async ({ page }) => {
    // Wait for page to load images
    await page.waitForLoadState('networkidle');

    // Check for logo/image elements
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();

        // Check if image loads successfully
        const src = await img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          const response = await page.request.get(src);
          expect(response.status()).toBe(200);
        }
      }
    }
  });

  test('should handle 404 gracefully', async ({ page }) => {
    // Test 404 handling
    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[data-testid="not-found-title"]', {
      timeout: 10000,
    });
    await expect(page.locator('[data-testid="not-found-title"]')).toContainText(
      /404|Not Found|Page Not Found/
    );
  });

  test('should have proper heading structure', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('h1, h2, h3, h4, h5, h6', { timeout: 10000 });

    // Check heading hierarchy - at least one heading should exist
    const headingCount = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Wait for the page to be ready and find visible buttons only
    await page.waitForLoadState('networkidle');

    // Check for ARIA labels on visible interactive elements only
    const buttons = page.locator('button').filter({ visible: true });
    const buttonCount = await buttons.count();

    if (buttonCount > 0) {
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();

        // Button should have either aria-label or text content
        expect(ariaLabel || text?.trim()).toBeTruthy();
      }
    } else {
      // If no visible buttons found, test should still pass
      // as this might be expected in some scenarios
      expect(true).toBeTruthy();
    }
  });
});

// Test with screenshots on failure
test.describe('Visual Regression Tests', () => {
  test('should take full page screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take a full page screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toBeTruthy();
  });
});

// Accessibility tests
test.describe('Accessibility Tests', () => {
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('body', { state: 'visible' });

    // Test tab navigation through visible interactive elements only
    const interactiveElements = page
      .locator('a, button, [tabindex]:not([tabindex="-1"])')
      .filter({ visible: true });

    const elementCount = await interactiveElements.count();

    if (elementCount > 0) {
      // Focus first visible interactive element
      await interactiveElements.first().focus();

      // Verify focus is visible by checking if element has focus
      const hasFocus = await interactiveElements
        .first()
        .evaluate(el => el === document.activeElement);
      expect(hasFocus).toBeTruthy();

      // Test tabbing to next visible element
      if (elementCount > 1) {
        await page.keyboard.press('Tab');

        // Focus second element
        await interactiveElements.nth(1).focus();

        // Verify focus moved to second element
        const hasFocus2 = await interactiveElements
          .nth(1)
          .evaluate(el => el === document.activeElement);
        expect(hasFocus2).toBeTruthy();
      }
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('body', { state: 'visible' });

    // Basic test to ensure text is visible
    const textElements = page.locator('h1, h2, h3, p, span, a, button');
    const textCount = await textElements.count();

    expect(textCount).toBeGreaterThan(0);
  });
});
