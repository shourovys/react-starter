import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  ErrorBoundary,
  useErrorHandler,
  withErrorBoundary,
} from './ErrorBoundary';

// Mock console methods to avoid noise in tests
vi.spyOn(console, 'error').mockImplementation(() => {});

const ThrowError = () => {
  throw new Error('Test error');
};

const NormalComponent = () => {
  return <div data-testid="normal-content">Normal content</div>;
};

describe('ErrorBoundary Component', () => {
  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('normal-content')).toBeTruthy();
  });

  it('should render fallback component when error occurs', () => {
    // Suppress React error boundary logs
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();

    console.error = originalError;
  });
});

describe('withErrorBoundary HOC', () => {
  it('should wrap component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(NormalComponent);

    render(<WrappedComponent />);

    expect(screen.getByTestId('normal-content')).toBeTruthy();
  });
});

describe('useErrorHandler Hook', () => {
  it('should return error handler function', () => {
    const errorHandler = useErrorHandler();
    expect(typeof errorHandler).toBe('function');
  });
});
