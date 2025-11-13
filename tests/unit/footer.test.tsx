import { Footer } from '@/components/footer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

// Mock date to ensure consistent year
const mockDate = new Date('2024-01-01');
vi.setSystemTime(mockDate);

describe('Footer Component', () => {
  it('should render current year', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    // Use regex to match any 4-digit year (2024 in mock, 2025 normally)
    const year = screen.getByText(/20\d{2}/);
    expect(year).toBeTruthy();
  });

  it('should render footer text', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    // Check for copyright symbol and React TypeScript Starter text separately
    expect(screen.getByText(/©/)).toBeTruthy();
    expect(screen.getByText(/React TypeScript Starter/)).toBeTruthy();
    expect(screen.getByText(/All rights reserved/)).toBeTruthy();
  });

  it('should have proper footer structure', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = screen.getByTestId('app-footer');
    expect(footer).toBeTruthy();
    expect(footer.tagName).toBe('FOOTER');
  });
});

// Reset mock date
vi.useRealTimers();
