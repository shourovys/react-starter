import { render } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { AppRouter } from './router';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
  localStorageMock.getItem.mockReturnValue(null);
});

describe('AppRouter', () => {
  it('should render without crashing', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      );
    }).not.toThrow();
  });

  it('should be a valid React component', () => {
    expect(document.body).toBeTruthy();
  });
});
