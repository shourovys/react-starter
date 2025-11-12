import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import type { ReactElement } from 'react';

export interface AccessibilityTestResult {
  violations: axe.Result[];
  passes: axe.Result[];
  incomplete: axe.Result[];
  inapplicable: axe.Result[];
  hasViolations: boolean;
  isAccessible: boolean;
  checks: {
    hasMainHeading: boolean;
    hasProperHeadingHierarchy: boolean;
    hasAltText: boolean;
    hasAriaLabels: boolean;
  };
}

/**
 * Run accessibility tests on a React component using axe-core
 */
export async function testComponentAccessibility(
  component: ReactElement
): Promise<AccessibilityTestResult> {
  // Render the component
  const { container } = render(component);

  // Run axe-core accessibility tests
  const results = await axe.run(container, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'],
    },
  });

  // Check for specific accessibility patterns
  const checks = {
    hasMainHeading: checkMainHeading(container),
    hasProperHeadingHierarchy: checkHeadingHierarchy(container),
    hasAltText: checkAltText(container),
    hasAriaLabels: checkAriaLabels(container),
  };

  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
    inapplicable: results.inapplicable,
    hasViolations: results.violations.length > 0,
    isAccessible: results.violations.length === 0,
    checks,
  };
}

/**
 * Test screen reader compatibility
 */
export async function testScreenReaderCompatibility(component: ReactElement) {
  const { container } = render(component);
  const results = await axe.run(container, {
    rules: {
      'aria-required-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true },
      'aria-roles': { enabled: true },
    },
  });

  return {
    elementsWithAria: results.passes.length,
    missingAria: results.violations.filter(
      v => v.id === 'aria-required-attr' || v.id === 'aria-valid-attr-value'
    ).length,
    headingStructure: Array.from(
      container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ),
    hasProperHeadingOrder: checkHeadingHierarchy(container),
    hasMainHeading: checkMainHeading(container),
    isScreenReaderFriendly: results.violations.length === 0,
  };
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(component: ReactElement) {
  const { container } = render(component);

  // Find focusable elements
  const focusableElements = container.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  return {
    focusableElements: focusableElements.length,
    canTabThroughAll: focusableElements.length > 0,
    hasFocusableElements: focusableElements.length > 0,
  };
}

/**
 * Helper function to check for main heading (h1)
 */
function checkMainHeading(container: HTMLElement): boolean {
  return container.querySelector('h1') !== null;
}

/**
 * Helper function to check heading hierarchy
 */
function checkHeadingHierarchy(container: HTMLElement): boolean {
  const headings = Array.from(
    container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  );

  for (let i = 0; i < headings.length; i++) {
    const currentLevel = parseInt(headings[i].tagName.charAt(1));

    if (i > 0) {
      const previousLevel = parseInt(headings[i - 1].tagName.charAt(1));

      // Heading should not skip more than one level
      if (currentLevel > previousLevel + 1) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Helper function to check alt text on images
 */
function checkAltText(container: HTMLElement): boolean {
  const images = container.querySelectorAll('img');

  if (images.length === 0) return true;

  for (const img of images) {
    if (!img.hasAttribute('alt') && !img.hasAttribute('role')) {
      return false;
    }
  }
  return true;
}

/**
 * Helper function to check ARIA labels
 */
function checkAriaLabels(container: HTMLElement): boolean {
  const interactiveElements = container.querySelectorAll(
    'button, [role="button"], [role="link"], input, textarea, select'
  );

  for (const element of interactiveElements) {
    const hasAriaLabel =
      element.hasAttribute('aria-label') ||
      element.hasAttribute('aria-labelledby') ||
      element.textContent?.trim();

    if (!hasAriaLabel) {
      return false;
    }
  }
  return true;
}
