import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the welcome card', () => {
    render(<HomePage />);

    expect(screen.getByTestId('welcome-card')).toBeTruthy();
    expect(screen.getByTestId('welcome-title').textContent).toBe(
      'Welcome to React TypeScript Starter'
    );
    expect(screen.getByTestId('welcome-description')).toBeTruthy();
    expect(screen.getByTestId('welcome-content')).toBeTruthy();
  });

  it('displays the correct welcome message', () => {
    render(<HomePage />);

    expect(screen.getByTestId('welcome-content').textContent).toBe(
      'This is your home page. Start building your amazing application here!'
    );
  });

  it('has proper accessibility attributes', () => {
    render(<HomePage />);

    const card = screen.getByTestId('welcome-card');
    expect(card).toBeTruthy();
    expect(card.tagName).toBe('DIV');
  });
});
