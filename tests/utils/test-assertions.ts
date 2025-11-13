// Simple test utilities to replace jest-dom matchers that aren't properly configured
export const expect = {
  toBeInTheDocument: (element: Element | null) => {
    if (!element) {
      throw new Error(
        'Expected element to be in the document, but it was not found'
      );
    }
  },
  toHaveTextContent: (element: Element | null, text: string) => {
    if (!element) {
      throw new Error('Expected element to exist for text content check');
    }
    const elementText = element.textContent;
    if (!elementText || !elementText.includes(text)) {
      throw new Error(
        `Expected element to have text "${text}", but found "${elementText}"`
      );
    }
  },
  toHaveClass: (element: Element | null, className: string) => {
    if (!element) {
      throw new Error('Expected element to exist for class check');
    }
    const elementClassList = (element as HTMLElement).classList;
    if (!elementClassList || !elementClassList.contains(className)) {
      throw new Error(`Expected element to have class "${className}"`);
    }
  },
  toBeTruthy: (value: unknown) => {
    if (!value) {
      throw new Error(`Expected value to be truthy, but got ${value}`);
    }
  },
  toHaveAttribute: (
    element: Element | null,
    attribute: string,
    value?: string
  ) => {
    if (!element) {
      throw new Error('Expected element to exist for attribute check');
    }
    const attrValue = element.getAttribute(attribute);
    if (value !== undefined && attrValue !== value) {
      throw new Error(
        `Expected attribute "${attribute}" to be "${value}", but got "${attrValue}"`
      );
    }
    if (value === undefined && attrValue === null) {
      throw new Error(`Expected element to have attribute "${attribute}"`);
    }
  },
};

// Export a function to check if element exists
export const checkElementExists = (element: Element | null): boolean => {
  return element !== null;
};

// Export helper for text content
export const checkTextContent = (
  element: Element | null,
  text: string
): boolean => {
  if (!element) return false;
  return element.textContent?.includes(text) || false;
};
