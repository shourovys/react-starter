import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../src/components/theme-provider';
import { testComponentAccessibility } from '../utils/accessibility-test-utils';
import { describe, expect, it } from 'vitest';

describe('Accessibility Tests - Components', () => {
  it('ThemeProvider should be accessible', async () => {
    const result = await testComponentAccessibility(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(result.isAccessible).toBe(true);
    expect(result.checks.hasMainHeading).toBe(false);
    expect(result.checks.hasProperHeadingHierarchy).toBe(true);
  });

  it('should meet basic accessibility standards', async () => {
    const component = (
      <div role="main">
        <h1>Page Title</h1>
        <p>This is accessible content</p>
        <button aria-label="Accessible button">Click me</button>
      </div>
    );

    const result = await testComponentAccessibility(component);
    expect(result.isAccessible).toBe(true);
    expect(result.checks.hasMainHeading).toBe(true);
  });

  it('should catch accessibility violations', async () => {
    // Component with accessibility issues
    const badComponent = (
      <div>
        <img src="test.jpg" /> {/* Missing alt text */}
        <button>Click</button> {/* Missing accessible name */}
      </div>
    );

    const result = await testComponentAccessibility(badComponent);
    expect(result.isAccessible).toBe(false);
    expect(result.checks.hasAltText).toBe(false);
  });

  it('should test WCAG 2.1 Level AA compliance', async () => {
    // Test a well-structured component
    const accessibleComponent = (
      <main role="main">
        <h1>Main Heading</h1>
        <section>
          <h2>Section Heading</h2>
          <p>Content with proper structure</p>
          <img src="test.jpg" alt="Descriptive alt text" />
          <button aria-label="Descriptive button text">Action</button>
        </section>
      </main>
    );

    const result = await testComponentAccessibility(accessibleComponent);
    expect(result.isAccessible).toBe(true);
  });

  it('should verify heading hierarchy', async () => {
    const component = (
      <div>
        <h1>Main Title</h1>
        <h2>Subtitle</h2>
        <h3>Section Title</h3>
        <h3>Another Section</h3>
        <h2>Another Main Section</h2>
      </div>
    );

    const result = await testComponentAccessibility(component);
    expect(result.checks.hasProperHeadingHierarchy).toBe(true);
  });

  it('should test form accessibility', async () => {
    const formComponent = (
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" aria-required="true" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" aria-required="true" />
        <button type="submit">Submit</button>
      </form>
    );

    const result = await testComponentAccessibility(formComponent);
    expect(result.isAccessible).toBe(true);
    expect(result.checks.hasAriaLabels).toBe(true);
  });

  it('should handle missing alt text violations', async () => {
    const componentWithMissingAlt = (
      <div>
        <img src="important-image.jpg" />
        <img src="decorative-image.jpg" role="presentation" />
      </div>
    );

    const result = await testComponentAccessibility(componentWithMissingAlt);
    expect(result.isAccessible).toBe(false);
    expect(result.checks.hasAltText).toBe(false);
  });
});

describe('Accessibility Integration with Test Suites', () => {
  it('should integrate with existing component tests', async () => {
    // This demonstrates that accessibility tests can run alongside regular tests
    const { container } = render(
      <ThemeProvider>
        <div>Test content</div>
      </ThemeProvider>
    );

    // Regular render assertion
    expect(container.firstChild).toBeInTheDocument();

    // Accessibility assertion
    const accessibilityResult = await testComponentAccessibility(
      <ThemeProvider>
        <div>Test content</div>
      </ThemeProvider>
    );

    expect(accessibilityResult.isAccessible).toBe(true);
  });

  it('should work with test data and fixtures', async () => {
    // Test with various component states
    const states = [
      { theme: 'light' as const, content: 'Light theme' },
      { theme: 'dark' as const, content: 'Dark theme' },
      { theme: 'system' as const, content: 'System theme' },
    ];

    for (const state of states) {
      const result = await testComponentAccessibility(
        <ThemeProvider defaultTheme={state.theme}>
          <div>{state.content}</div>
        </ThemeProvider>
      );

      expect(result.isAccessible).toBe(true);
    }
  });
});
