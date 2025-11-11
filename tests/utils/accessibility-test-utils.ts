import { axe, toHaveNoViolations } from 'axe-core';
import { render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

// Extend expect to include accessibility matchers
expect.extend(toHaveNoViolations);

/**
 * Run accessibility tests on a React component
 */
export async function testComponentAccessibility(
  component: React.ReactElement
) {
  const { container } = render(component);

  try {
    const results = await axe(container);
    return {
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable,
      hasViolations: results.violations.length > 0,
    };
  } catch (error) {
    return {
      violations: [],
      passes: [],
      incomplete: [],
      inapplicable: [],
      hasViolations: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test screen reader compatibility
 */
export async function testScreenReaderCompatibility(
  component: React.ReactElement
) {
  const { container } = render(component);

  // Check for proper ARIA labels
  const elementsWithAria = container.querySelectorAll(
    '[aria-label], [aria-labelledby], [aria-describedby]'
  );
  const missingAria = Array.from(
    container.querySelectorAll(
      'button, input, select, textarea, [role="button"], [role="textbox"]'
    )
  ).filter(
    el => !el.hasAttribute('aria-label') && !el.getAttribute('aria-labelledby')
  );

  // Check for proper heading structure
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingStructure = Array.from(headings).map((h: Element) => ({
    level: parseInt(h.tagName.charAt(1)),
    text: h.textContent?.trim() || '',
  }));

  return {
    elementsWithAria: elementsWithAria.length,
    missingAria: missingAria.length,
    headingStructure,
    hasProperHeadingOrder: checkHeadingOrder(headingStructure),
  };
}

/**
 * Helper function to check heading order
 */
function checkHeadingOrder(
  headings: Array<{ level: number; text: string }>
): boolean {
  for (let i = 1; i < headings.length; i++) {
    const current = headings[i];
    const previous = headings[i - 1];

    // Heading should not skip more than one level
    if (current.level > previous.level + 1) {
      return false;
    }
  }
  return true;
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(component: React.ReactElement) {
  const { container } = render(component);

  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"]'
  ) as NodeListOf<HTMLElement>;

  const results = {
    focusableElements: focusableElements.length,
    canTabThroughAll: true,
  };

  // Test tab navigation
  for (const element of focusableElements) {
    element.focus();
    if (document.activeElement !== element) {
      results.canTabThroughAll = false;
      break;
    }
  }

  return results;
}
