export interface AccessibilityTestResult {
  violations: Array<{
    id: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor';
    description: string;
    help: string;
    helpUrl: string;
    nodes: Array<{
      html: string;
      target: string[];
    }>;
  }>;
  passes: Array<{
    id: string;
    impact: string | null;
    description: string;
    nodes: Array<{
      html: string;
      target: string[];
    }>;
  }>;
  incomplete: Array<{
    id: string;
    impact: string | null;
    description: string;
    nodes: Array<{
      html: string;
      target: string[];
    }>;
  }>;
  inapplicable: Array<{
    id: string;
    impact: string | null;
    description: string;
  }>;
  hasViolations: boolean;
  error?: string;
}

export interface AccessibilityCheckOptions {
  include?: string[];
  exclude?: string[];
  tags?: string[];
  rules?: Record<string, { enabled: boolean }>;
}

export interface AccessibilityTestConfig {
  include?: string[];
  exclude?: string[];
  tags?: string[];
  rules?: Record<string, { enabled: boolean }>;
}

export interface AccessibilityChecks {
  hasMainHeading: boolean;
  hasProperHeadingHierarchy: boolean;
  hasAltText: boolean;
  hasAriaLabels: boolean;
}

export interface AccessibilityTestResultWithChecks
  extends AccessibilityTestResult {
  checks: AccessibilityChecks;
}
