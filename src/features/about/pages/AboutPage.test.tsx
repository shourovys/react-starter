import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders the about card', () => {
    render(<AboutPage />);

    expect(screen.getByText('About This Project')).toBeTruthy();
    expect(
      screen.getByText('A comprehensive React + TypeScript starter boilerplate')
    ).toBeTruthy();
  });

  it('displays the project features list', () => {
    render(<AboutPage />);

    expect(screen.getByText('React 19 with TypeScript')).toBeTruthy();
    expect(
      screen.getByText('Tailwind CSS with shadcn/ui components')
    ).toBeTruthy();
    expect(screen.getByText(/Comprehensive testing setup/)).toBeTruthy();
    expect(screen.getByText('Contract testing with Pact')).toBeTruthy();
    expect(
      screen.getByText('Git hooks and pre-commit validation')
    ).toBeTruthy();
    expect(screen.getByText('CI/CD pipeline ready')).toBeTruthy();
  });

  it('has proper structure', () => {
    render(<AboutPage />);

    const card = screen.getByText('About This Project').closest('div');
    expect(card).toBeTruthy();
    expect(card?.tagName).toBe('DIV');
  });
});
