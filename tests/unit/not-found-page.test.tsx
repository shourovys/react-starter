import NotFoundPage from '@/pages/not-found-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('NotFoundPage Component', () => {
  it('should render 404 title', () => {
    render(<NotFoundPage />);

    const title = screen.getByText('404 - Page Not Found');
    expect(title).toBeInTheDocument();
  });

  it('should render not found description', () => {
    render(<NotFoundPage />);

    const description = screen.getByText(
      'The page you are looking for does not exist.'
    );
    expect(description).toBeInTheDocument();
  });

  it('should render not found content', () => {
    render(<NotFoundPage />);

    const content = screen.getByText(
      'The page you are looking for has been moved, deleted, or never existed.'
    );
    expect(content).toBeInTheDocument();
  });

  it('should render go home button', () => {
    render(<NotFoundPage />);

    const button = screen.getByText('Go Home');
    expect(button).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    render(<NotFoundPage />);

    const title = screen.getByTestId('not-found-title');
    // CardTitle is rendered as div, not h3
    expect(title.tagName).toBe('DIV');
  });

  it('should render not found card', () => {
    render(<NotFoundPage />);

    const card = screen.getByTestId('not-found-card');
    expect(card).toBeInTheDocument();
    // Card component has class "rounded-xl border bg-card text-card-foreground shadow", not "card"
    expect(card).toHaveClass('rounded-xl');
  });
});
