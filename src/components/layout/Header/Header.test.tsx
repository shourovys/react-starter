import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

// Mock useTheme
vi.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

import { Header } from './Header';

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('should render brand name', () => {
    renderHeader();

    const brand = screen.getByText('React TypeScript Starter');
    expect(brand).toBeTruthy();
  });

  it('should render navigation links', () => {
    renderHeader();

    expect(screen.getByTestId('nav-home')).toBeTruthy();
    expect(screen.getByTestId('nav-about')).toBeTruthy();
    expect(screen.getByTestId('nav-dashboard')).toBeTruthy();
  });

  it('should render theme toggle', () => {
    renderHeader();

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeTruthy();
  });

  it('should render navigation buttons', () => {
    renderHeader();

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render logo', () => {
    renderHeader();

    const logo = screen.getByRole('link', {
      name: /react typescript starter/i,
    });
    expect(logo).toBeTruthy();
  });
});
