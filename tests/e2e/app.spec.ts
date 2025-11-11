import { expect, test } from '@playwright/test';

test.describe('Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/React.*TypeScript.*Starter/);
    await expect(page.locator('h1')).toContainText(
      'React + TypeScript + Tailwind + shadcn/ui'
    );
  });

  test('should display the main content sections', async ({ page }) => {
    // Check for main sections
    await expect(page.locator('text=Features')).toBeVisible();
    await expect(page.locator('text=Getting Started')).toBeVisible();
    await expect(page.locator('text=Documentation')).toBeVisible();

    // Check for cards
    await expect(page.locator('[data-testid="feature-card"]')).toHaveCount(3);
  });

  test('should toggle theme successfully', async ({ page }) => {
    // Find and click the theme toggle button
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();

    // Get initial theme class
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('class');

    // Click to toggle theme
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify theme changed
    const newTheme = await html.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);

    // Test dark theme
    if (newTheme?.includes('dark')) {
      await expect(page.locator('body')).toHaveClass(/dark/);
    }
  });

  test('should handle form interactions', async ({ page }) => {
    // Test the form section
    await expect(page.locator('text=Contact Form')).toBeVisible();

    // Fill out the form
    await page.fill('input[placeholder="Enter your name"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@example.com');
    await page.fill(
      'textarea[placeholder="Your message"]',
      'This is a test message'
    );

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify form submission (you might want to add a success message in the actual app)
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

  test('should navigate between tabs', async ({ page }) => {
    // Find tab navigation
    const tabs = page.locator('[role="tab"]');
    await expect(tabs).toHaveCount(3);

    // Click on different tabs
    await tabs.nth(1).click();
    await expect(page.locator('[role="tabpanel"]').nth(1)).toBeVisible();

    await tabs.nth(2).click();
    await expect(page.locator('[role="tabpanel"]').nth(2)).toBeVisible();

    // Return to first tab
    await tabs.first().click();
    await expect(page.locator('[role="tabpanel"]').first()).toBeVisible();
  });

  test('should handle dialog interactions', async ({ page }) => {
    // Open dialog
    await page.click('text=Open Dialog');

    // Verify dialog is open
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Dialog Title');

    // Close dialog
    await page.click('button[aria-label="Close"]');
    await expect(dialog).not.toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
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
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Test 404 handling (if implemented)
    await page.goto('/non-existent-page');
    await expect(page.locator('text=404')).toBeVisible();
  });

  test('should maintain state across page interactions', async ({ page }) => {
    // Set a form value
    await page.fill('input[placeholder="Enter your name"]', 'Test User');

    // Navigate away and back (if you have routing)
    await page.reload();

    // Check if state is maintained or properly reset
    const inputValue = await page.inputValue(
      'input[placeholder="Enter your name"]'
    );
    expect(inputValue).toBe('');
  });
});

// Test with screenshots on failure
test.describe('Visual Regression Tests', () => {
  test('should match visual snapshots', async ({ page }) => {
    await page.goto('/');

    // Take a full page screenshot
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
    });
  });

  test('should capture screenshots on test failures', async ({ page }) => {
    // This test is designed to fail for demonstration
    await page.goto('/');

    // Force a failure to demonstrate screenshot capture
    await expect(page.locator('text=Non-existent text')).toBeVisible();
  });
});

// Accessibility tests
test.describe('Accessibility Tests', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check heading hierarchy
    const h1 = page.locator('h1');
    const h2 = page.locator('h2');
    const h3 = page.locator('h3');

    await expect(h1).toHaveCount(1);
    await expect(h2).toHaveCount(3); // Features, Getting Started, Documentation
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check for ARIA labels on interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();

      // Button should have either aria-label or text content
      expect(ariaLabel || text).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    await page.keyboard.press('Tab');
    focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
