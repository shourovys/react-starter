import { ThemeProvider } from '@/components/theme-provider';
import { useTheme } from '@/hooks/use-theme';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock the useTheme hook
vi.mock('@/hooks/use-theme', () => ({
  useTheme: vi.fn(),
}));

const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme-display">Current theme: {theme}</div>;
};

describe('ThemeProvider Component', () => {
  it('should render children correctly', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });

    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-display')).toBeInTheDocument();
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('should provide theme context to children', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
    });

    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });

  it('should use system theme as default', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      setTheme: vi.fn(),
    });

    render(
      <ThemeProvider defaultTheme="system" storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: system')).toBeInTheDocument();
  });

  it('should handle different storage keys', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });

    render(
      <ThemeProvider defaultTheme="light" storageKey="different-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-display')).toBeInTheDocument();
  });
});
