import HomePage from '@/pages/home-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('HomePage Component', () => {
  it('should render welcome title correctly', () => {
    render(<HomePage />);

    const title = screen.getByTestId('welcome-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Welcome to React TypeScript Starter');
  });

  it('should render welcome description', () => {
    render(<HomePage />);

    const description = screen.getByTestId('welcome-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      'A modern, production-ready boilerplate with testing, accessibility, and performance features.'
    );
  });

  it('should render welcome content', () => {
    render(<HomePage />);

    const content = screen.getByTestId('welcome-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(
      'This is your home page. Start building your amazing application here!'
    );
  });

  it('should render welcome card', () => {
    render(<HomePage />);

    const card = screen.getByTestId('welcome-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

  it('should have proper heading structure', () => {
    render(<HomePage />);

    const title = screen.getByTestId('welcome-title');
    expect(title.tagName).toBe('H3'); // CardTitle is rendered as h3 by default
  });

  it('should have text-muted-foreground class for content', () => {
    render(<HomePage />);

    const content = screen.getByTestId('welcome-content');
    expect(content).toHaveClass('text-muted-foreground');
  });
});
