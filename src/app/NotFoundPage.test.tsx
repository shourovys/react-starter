import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFoundPage from './NotFoundPage';

// Mock window.location
const mockLocation = { href: '' };
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('NotFoundPage', () => {
  it('renders the 404 card', () => {
    render(<NotFoundPage />);

    expect(screen.getByTestId('not-found-card')).toBeTruthy();
    expect(screen.getByTestId('not-found-title').textContent).toBe(
      '404 - Page Not Found'
    );
    expect(screen.getByTestId('not-found-description').textContent).toBe(
      'The page you are looking for does not exist.'
    );
  });

  it('displays the error message', () => {
    render(<NotFoundPage />);

    expect(screen.getByTestId('not-found-content').textContent).toBe(
      'The page you are looking for has been moved, deleted, or never existed.'
    );
  });

  it('has a go home button', () => {
    render(<NotFoundPage />);

    const button = screen.getByTestId('go-home-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Go Home');
  });

  it('navigates to home when go home button is clicked', () => {
    render(<NotFoundPage />);

    const button = screen.getByTestId('go-home-button');
    fireEvent.click(button);

    expect(window.location.href).toBe('/');
  });
});
