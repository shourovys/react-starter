import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuthStore } from '@/store/auth-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

// Mock MSW handlers for integration tests
import { server } from '../mocks/server';

// Set up MSW for integration tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Theme Integration Tests', () => {
  it('ThemeToggle should interact properly with ThemeProvider', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );

    // Toggle button should be accessible
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();

    // Click should open dropdown
    await user.click(toggleButton);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('should persist theme choice across component boundaries', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const { theme } = useAuthStore();
      return (
        <div>
          <p data-testid="theme-display">Current theme: {theme}</p>
          <ThemeToggle />
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initial theme should be system
    expect(screen.getByTestId('theme-display')).toHaveTextContent(
      'Current theme: system'
    );

    // Change theme via toggle
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(toggleButton);

    const darkOption = screen.getByText('Dark');
    await user.click(darkOption);

    // Theme should update
    expect(screen.getByTestId('theme-display')).toHaveTextContent(
      'Current theme: dark'
    );
  });
});
