import { Footer } from '@/components/footer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Footer Component', () => {
  it('should render current year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    const year = screen.getByText(currentYear.toString());
    expect(year).toBeInTheDocument();
  });

  it('should render footer text', () => {
    render(<Footer />);

    const footerText = screen.getByText(/© .* React TypeScript Starter/i);
    expect(footerText).toBeInTheDocument();
  });

  it('should have proper footer structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
