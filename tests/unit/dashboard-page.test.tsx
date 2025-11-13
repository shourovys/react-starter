import DashboardPage from '@/pages/dashboard-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('DashboardPage Component', () => {
  it('should render dashboard title', () => {
    render(<DashboardPage />);

    const title = screen.getByRole('heading', { name: /dashboard/i });
    expect(title).toBeInTheDocument();
  });

  it('should render dashboard content', () => {
    render(<DashboardPage />);

    const content = screen.getByText(/your dashboard content goes here/i);
    expect(content).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<DashboardPage />);

    const description = screen.getByText(/this is the dashboard page/i);
    expect(description).toBeInTheDocument();
  });

  it('should have proper heading structure', () => {
    render(<DashboardPage />);

    const title = screen.getByRole('heading');
    expect(title.tagName).toBe('H1');
  });
});
