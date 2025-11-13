import AboutPage from '@/pages/about-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('AboutPage Component', () => {
  it('should render about title', () => {
    render(<AboutPage />);

    const title = screen.getByRole('heading', { name: /about/i });
    expect(title).toBeInTheDocument();
  });

  it('should render about content', () => {
    render(<AboutPage />);

    const content = screen.getByText(/learn more about this project/i);
    expect(content).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<AboutPage />);

    const description = screen.getByText(/this is the about page/i);
    expect(description).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    render(<AboutPage />);

    const title = screen.getByRole('heading');
    expect(title.tagName).toBe('H1');
  });
});
