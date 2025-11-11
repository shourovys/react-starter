import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '../../src/components/theme-toggle';

// Mock the useTheme hook
vi.mock('../../src/hooks/use-theme', () => ({
  useTheme: vi.fn().mockReturnValue({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('ThemeToggle', () => {
  it('renders theme toggle button', async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked', async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(toggleButton);

    // Check for dropdown items
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('calls setTheme when theme option is clicked', async () => {
    const user = userEvent.setup();
    const mockSetTheme = vi.fn();

    // Mock the useTheme hook to return our mock function
    const { useTheme } = await import('../../src/hooks/use-theme');
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(toggleButton);

    const darkOption = screen.getByText('Dark');
    await user.click(darkOption);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('shows appropriate icons for current theme', async () => {
    const user = userEvent.setup();

    // Mock useTheme to return dark theme
    const { useTheme } = await import('../../src/hooks/use-theme');
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
    });

    render(<ThemeToggle />);

    // Should show moon icon for dark theme
    const moonIcon = document.querySelector('.dark\\:rotate-0');
    const sunIcon = document.querySelector('.rotate-0');

    expect(moonIcon).toBeInTheDocument();
  });

  it('has proper accessibility attributes', async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toHaveAttribute('aria-label', 'Toggle theme');
  });
});
