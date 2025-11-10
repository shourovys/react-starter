import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

// Simple test wrapper for components
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Custom render function that includes all necessary providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

// Re-export everything from testing-library/react
export * from '@testing-library/react';

// Override render method
export { customRender as render };
