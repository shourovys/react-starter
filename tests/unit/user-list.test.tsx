import { UserList } from '@/components/user-list';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('UserList Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should render loading state initially', () => {
    // Mock fetch to never resolve to test loading state
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    const loadingText = screen.getByText('Loading users...');
    expect(loadingText).toBeInTheDocument();
  });

  it('should render users after successful fetch', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });

    // Check if user data is displayed
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('ID: 2')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('should handle fetch error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });

    // Should not show loading state after error
    expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();

    // Should not crash, just show empty state
    const userList = screen.getByRole('region');
    expect(userList).toBeInTheDocument();
  });

  it('should make correct API call', () => {
    const mockUsers = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />);

    expect(mockFetch).toHaveBeenCalledWith('/api/users');
  });
});
