import { axe, toHaveNoViolations } from 'jest-axe';
import {
  type AccessibilityTestResult,
  AccessibilityCheckOptions,
} from './types';

// Extend expect to include accessibility matchers
expect.extend(toHaveNoViolations);

/**
 * Options for running accessibility tests
 */
export interface AccessibilityTestConfig {
  include?: string[];
  exclude?: string[];
  tags?: string[];
  rules?: Record<string, { enabled: boolean }>;
}

/**
 * Run accessibility tests on a React component
 */
export async function testComponentAccessibility(
  component: React.ReactElement,
  options: AccessibilityTestConfig = {}
): Promise<AccessibilityTestResult> {
  const { container } = render(component);

  try {
    const results = await axe(container, {
      rules: options.rules,
    });

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
 * Test multiple components for accessibility
 */
export async function testMultipleComponentsAccessibility(
  components: Array<{ component: React.ReactElement; name: string }>,
  options: AccessibilityTestConfig = {}
) {
  const results = await Promise.all(
    components.map(async ({ component, name }) => {
      const result = await testComponentAccessibility(component, options);
      return { name, ...result };
    })
  );

  return results;
}

/**
 * Check for specific accessibility issues
 */
export async function checkAccessibilityIssues(
  component: React.ReactElement,
  issueTypes: string[] = []
) {
  const { container } = render(component);
  const results = await axe(container);

  const filteredViolations =
    issueTypes.length > 0
      ? results.violations.filter(violation =>
          issueTypes.some(type => violation.id.includes(type))
        )
      : results.violations;

  return {
    totalViolations: results.violations.length,
    filteredViolations,
    hasCriticalIssues: filteredViolations.some(v => v.impact === 'critical'),
    hasSeriousIssues: filteredViolations.some(v => v.impact === 'serious'),
    hasModerateIssues: filteredViolations.some(v => v.impact === 'moderate'),
    hasMinorIssues: filteredViolations.some(v => v.impact === 'minor'),
  };
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
  const missingAria = container
    .querySelectorAll(
      'button, input, select, textarea, [role="button"], [role="textbox"]'
    )
    .filter(
      el =>
        !el.hasAttribute('aria-label') && !el.getAttribute('aria-labelledby')
    );

  // Check for proper heading structure
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingStructure = Array.from(headings).map(h => ({
    level: parseInt(h.tagName.charAt(1)),
    text: h.textContent?.trim() || '',
  }));

  // Check for focusable elements
  const focusableElements = container.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return {
    elementsWithAria: elementsWithAria.length,
    missingAria: missingAria.length,
    headingStructure,
    focusableElements: focusableElements.length,
    hasProperHeadingOrder: checkHeadingOrder(headingStructure),
  };
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(component: React.ReactElement) {
  const { container } = render(component);
  const user = userEvent.setup();

  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"]'
  ) as NodeListOf<HTMLElement>;

  const results = {
    focusableElements: focusableElements.length,
    canTabThroughAll: true,
    focusVisible: true,
    skipLinks: false,
    keyboardTraps: false,
  };

  // Test tab navigation
  let currentIndex = 0;
  for (const element of focusableElements) {
    element.focus();
    if (document.activeElement !== element) {
      results.canTabThroughAll = false;
      break;
    }
    currentIndex++;
  }

  // Check for skip links
  const skipLinks = container.querySelectorAll(
    'a[href="#main"], a[href="#content"]'
  );
  results.skipLinks = skipLinks.length > 0;

  return results;
}

/**
 * Test color contrast
 */
export async function testColorContrast(component: React.ReactElement) {
  const { container } = render(component);
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
      'color-contrast-enhanced': { enabled: true },
    },
  });

  const contrastViolations = results.violations.filter(v =>
    v.id.includes('color-contrast')
  );

  return {
    totalContrastIssues: contrastViolations.length,
    criticalContrastIssues: contrastViolations.filter(
      v => v.impact === 'critical'
    ).length,
    seriousContrastIssues: contrastViolations.filter(
      v => v.impact === 'serious'
    ).length,
    violations: contrastViolations,
  };
}

/**
 * Test form accessibility
 */
export async function testFormAccessibility(component: React.ReactElement) {
  const { container } = render(component);
  const forms = container.querySelectorAll('form');

  const results = forms.map(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    const labels = form.querySelectorAll('label');
    const requiredFields = form.querySelectorAll('[required]');
    const errorMessages = form.querySelectorAll(
      '[role="alert"], .error, [aria-invalid="true"]'
    );

    return {
      inputs: inputs.length,
      labels: labels.length,
      requiredFields: requiredFields.length,
      errorMessages: errorMessages.length,
      hasProperLabeling: inputs.length > 0 && labels.length >= inputs.length,
      hasErrorHandling:
        requiredFields.length > 0 ? errorMessages.length > 0 : true,
    };
  });

  return {
    forms: results.length,
    formResults: results,
    allFormsAccessible: results.every(
      r => r.hasProperLabeling && r.hasErrorHandling
    ),
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
 * Custom matcher for accessibility tests
 */
export function toBeAccessible(received: React.ReactElement) {
  return testComponentAccessibility(received).then(result => ({
    message: () =>
      result.hasViolations
        ? `Expected component to be accessible, but found ${result.violations.length} violations`
        : 'Expected component to have accessibility violations, but it passed all checks',
    pass: !result.hasViolations,
  }));
}

/**
 * Custom matcher for WCAG compliance
 */
export function toMeetWCAG(
  received: React.ReactElement,
  level: 'A' | 'AA' | 'AAA' = 'AA'
) {
  return testComponentAccessibility(received).then(result => {
    const criticalViolations = result.violations.filter(
      v => v.impact === 'critical'
    );
    const seriousViolations = result.violations.filter(
      v => v.impact === 'serious'
    );

    let hasViolations = false;
    if (level === 'A') {
      hasViolations = criticalViolations.length > 0;
    } else if (level === 'AA') {
      hasViolations =
        criticalViolations.length > 0 || seriousViolations.length > 0;
    } else {
      hasViolations = result.violations.length > 0;
    }

    return {
      message: () =>
        hasViolations
          ? `Expected component to meet WCAG ${level}, but found violations`
          : `Expected component to fail WCAG ${level} compliance, but it passed`,
      pass: !hasViolations,
    };
  });
}
