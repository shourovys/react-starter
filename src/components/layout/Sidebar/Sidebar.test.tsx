import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';

// Mock the UI store
const mockToggleSidebar = vi.fn();
vi.mock('@/store/ui-store', () => ({
  default: vi.fn(() => ({
    sidebarOpen: false,
    toggleSidebar: mockToggleSidebar,
  })),
}));

// Mock useLocation
const mockUseLocation = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    Link: ({
      children,
      to,
      onClick,
      className,
    }: {
      children: React.ReactNode;
      to: string;
      onClick?: () => void;
      className?: string;
    }) => (
      <a href={to} onClick={onClick} className={className}>
        {children}
      </a>
    ),
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Sidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({ pathname: '/' });
  });

  it('should render navigation items', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
    expect(screen.getByText('Dashboard')).toBeTruthy();
  });

  it('should highlight current page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });

    renderWithRouter(<Sidebar />);

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink?.classList.contains('bg-primary')).toBe(true);
  });

  it('should render logo and title', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('React TypeScript Starter')).toBeTruthy();
  });

  it('should render version in footer', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Version 1.0.0')).toBeTruthy();
  });

  it('should apply custom className', () => {
    renderWithRouter(<Sidebar className="custom-sidebar" />);

    const sidebar = screen.getByText('Home').closest('.fixed');
    expect(sidebar?.classList.contains('custom-sidebar')).toBe(true);
  });

  it('should have correct sidebar positioning classes', () => {
    renderWithRouter(<Sidebar />);

    const sidebar = screen.getByText('Home').closest('.fixed');
    expect(sidebar?.classList.contains('left-0')).toBe(true);
    expect(sidebar?.classList.contains('w-64')).toBe(true);
  });
});
