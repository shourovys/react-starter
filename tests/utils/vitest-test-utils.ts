import { screen } from '@testing-library/react';
import { expect } from 'vitest';

// Vitest-compatible test utilities to replace jest-dom matchers

export const testUtils = {
  // Replace toBeInTheDocument
  toBeInTheDocument(element: Element | null) {
    expect(element).toBeTruthy();
  },

  // Replace toHaveTextContent
  toHaveTextContent(element: Element | null, text: string) {
    expect(element?.textContent).toBe(text);
  },

  // Replace toHaveClass
  toHaveClass(element: Element | null, className: string) {
    expect(element?.className).toContain(className);
  },

  // Helper for finding elements by text and checking existence
  findByText(text: string) {
    const element = screen.getByText(text);
    this.toBeInTheDocument(element);
    return element;
  },

  // Helper for checking if element has specific text
  checkTextContent(element: Element | null, expectedText: string) {
    this.toHaveTextContent(element, expectedText);
  },

  // Helper for checking if element has specific class
  checkHasClass(element: Element | null, expectedClass: string) {
    this.toHaveClass(element, expectedClass);
  },
};

export default testUtils;
