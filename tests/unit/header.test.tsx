import { Header } from '@/components/header';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

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
    expect(brand).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderHeader();

    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-about')).toBeInTheDocument();
    expect(screen.getByTestId('nav-dashboard')).toBeInTheDocument();
  });

  it('should render theme toggle', () => {
    renderHeader();

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
    expect(themeToggle).toHaveAttribute('data-testid', 'theme-toggle');
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
    expect(logo).toBeInTheDocument();
  });
});
