import NotFoundPage from '@/pages/not-found-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('NotFoundPage Component', () => {
  it('should render 404 title', () => {
    render(<NotFoundPage />);

    const title = screen.getByTestId('not-found-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('404 - Page Not Found');
  });

  it('should render not found description', () => {
    render(<NotFoundPage />);

    const description = screen.getByTestId('not-found-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      'The page you are looking for does not exist.'
    );
  });

  it('should render not found content', () => {
    render(<NotFoundPage />);

    const content = screen.getByTestId('not-found-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(
      'The page you are looking for has been moved, deleted, or never existed.'
    );
  });

  it('should render go home button', () => {
    render(<NotFoundPage />);

    const button = screen.getByTestId('go-home-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Go Home');
  });

  it('should have proper heading structure', () => {
    render(<NotFoundPage />);

    const title = screen.getByTestId('not-found-title');
    expect(title.tagName).toBe('H3'); // CardTitle is rendered as h3 by default
  });

  it('should render not found card', () => {
    render(<NotFoundPage />);

    const card = screen.getByTestId('not-found-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });
});
