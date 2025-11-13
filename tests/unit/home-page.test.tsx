import HomePage from '@/pages/home-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('HomePage Component', () => {
  it('should render welcome title correctly', () => {
    render(<HomePage />);

    const title = screen.getByText('Welcome to React TypeScript Starter');
    expect(title).toBeInTheDocument();
  });

  it('should render welcome description', () => {
    render(<HomePage />);

    const description = screen.getByText(
      'A modern, production-ready boilerplate with testing, accessibility, and performance features.'
    );
    expect(description).toBeInTheDocument();
  });

  it('should render welcome content', () => {
    render(<HomePage />);

    const content = screen.getByText(
      'This is your home page. Start building your amazing application here!'
    );
    expect(content).toBeInTheDocument();
  });

  it('should render welcome card', () => {
    render(<HomePage />);

    const card = screen.getByTestId('welcome-card');
    expect(card).toBeInTheDocument();
    // Card component has class "rounded-xl border bg-card text-card-foreground shadow", not "card"
    expect(card).toHaveClass('rounded-xl');
  });

  it('should have proper heading structure', () => {
    render(<HomePage />);

    const title = screen.getByTestId('welcome-title');
    // CardTitle is rendered as div, not h3
    expect(title.tagName).toBe('DIV');
  });

  it('should have text-muted-foreground class for content', () => {
    render(<HomePage />);

    const content = screen.getByTestId('welcome-content');
    expect(content).toHaveClass('text-muted-foreground');
  });
});
