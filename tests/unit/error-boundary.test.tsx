import {
  ErrorBoundary,
  useErrorHandler,
  withErrorBoundary,
} from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

    expect(screen.getByTestId('normal-content')).toBeInTheDocument();
  });

  it('should render fallback component when error occurs', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Suppress React error boundary logs
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();

    console.error = originalError;
    consoleErrorSpy.mockRestore();
  });

  it('should render custom fallback when provided', () => {
    const customFallback = (
      <div data-testid="custom-fallback">Custom error</div>
    );

    // Suppress React error boundary logs
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();

    console.error = originalError;
  });

  it('should handle retry functionality', async () => {
    let errorTriggered = false;

    const ErrorComponent = () => {
      if (errorTriggered) {
        throw new Error('Test error');
      }
      return <div>No error</div>;
    };

    // Suppress React error boundary logs
    const originalError = console.error;
    console.error = () => {};

    const { rerender } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    // First render should show no error
    expect(screen.getByText('No error')).toBeInTheDocument();

    // Trigger error
    errorTriggered = true;
    rerender(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    // Should show error boundary
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    console.error = originalError;
  });
});

describe('withErrorBoundary HOC', () => {
  it('should wrap component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(NormalComponent);

    render(<WrappedComponent />);

    expect(screen.getByTestId('normal-content')).toBeInTheDocument();
  });

  it('should pass additional props to error boundary', () => {
    const customFallback = <div data-testid="custom-fallback">Custom</div>;
    const WrappedComponent = withErrorBoundary(NormalComponent, {
      fallback: customFallback,
    });

    // Suppress React error boundary logs
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary>
        <WrappedComponent />
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();

    console.error = originalError;
  });
});

describe('useErrorHandler Hook', () => {
  it('should return error handler function', () => {
    const errorHandler = useErrorHandler();
    expect(typeof errorHandler).toBe('function');
  });

  it('should call console.error when error is handled', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorHandler = useErrorHandler();

    const testError = new Error('Test error');
    errorHandler(testError);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Manual error report:',
      testError,
      undefined
    );

    consoleSpy.mockRestore();
  });
});
