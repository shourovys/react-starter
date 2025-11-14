import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DashboardPage from './DashboardPage';

describe('DashboardPage', () => {
  it('renders the dashboard card', () => {
    render(<DashboardPage />);

    expect(screen.getByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Your application dashboard')).toBeTruthy();
  });

  it('displays dashboard sections', () => {
    render(<DashboardPage />);

    expect(screen.getByText('Metrics')).toBeTruthy();
    expect(screen.getByText('Reports')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('displays section descriptions', () => {
    render(<DashboardPage />);

    expect(screen.getByText('View your key performance metrics')).toBeTruthy();
    expect(screen.getByText('Generate and view reports')).toBeTruthy();
    expect(screen.getByText('Configure your application')).toBeTruthy();
  });

  it('has proper grid layout', () => {
    render(<DashboardPage />);

    const grid = screen.getByText('Metrics').closest('.grid');
    expect(grid).toBeTruthy();
    expect(grid?.classList.contains('grid-cols-1')).toBe(true);
  });
});
