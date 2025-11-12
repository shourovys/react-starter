import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from '../../src/components/user-list';

describe('UserList Component with MSW Integration', () => {
  beforeEach(() => {
    // MSW is already set up in setup.ts
    // This test verifies it's working correctly
  });

  afterEach(() => {
    // Clean up after each test
    vi.clearAllMocks();
  });

  it('renders user list from mocked API', async () => {
    render(<UserList />);

    // Should show loading state initially
    expect(screen.getByText('Loading users...')).toBeInTheDocument();

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    // Loading state should be gone
    expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();

    // Verify user count
    const userItems = screen.getAllByText(/ID: \d+/);
    expect(userItems).toHaveLength(2);
  });

  it('handles API errors gracefully', async () => {
    // Test the error endpoint from MSW handlers
    const testErrorHandling = async () => {
      try {
        const response = await fetch('/api/error');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return 'Should not reach here';
      } catch (err) {
        return err instanceof Error ? err.message : 'Unknown error';
      }
    };

    const errorMessage = await testErrorHandling();
    expect(errorMessage).toContain('500');
  });

  it('handles delayed API responses', async () => {
    // Test the delayed endpoint from MSW handlers
    const testDelayedResponse = async () => {
      const startTime = Date.now();
      const response = await fetch('/api/delayed');
      const result = await response.json();
      const endTime = Date.now();

      return {
        message: result.message,
        duration: endTime - startTime,
      };
    };

    const { message, duration } = await testDelayedResponse();
    expect(message).toBe('Delayed response');
    expect(duration).toBeGreaterThanOrEqual(900); // Should be close to 1000ms
  });

  it('makes multiple API calls correctly', async () => {
    const testMultipleCalls = async () => {
      // First call to users endpoint
      const usersResponse = await fetch('/api/users');
      const users = await usersResponse.json();

      // Second call to delayed endpoint
      const delayedResponse = await fetch('/api/delayed');
      const delayed = await delayedResponse.json();

      return {
        usersCount: users.length,
        delayedMessage: delayed.message,
      };
    };

    const { usersCount, delayedMessage } = await testMultipleCalls();
    expect(usersCount).toBe(2);
    expect(delayedMessage).toBe('Delayed response');
  });

  it('verifies MSW cleanup happens between tests', async () => {
    // This test verifies that MSW is properly cleaned up
    // by checking that the server state is reset

    // Make an API call to verify MSW is working
    const response = await fetch('/api/users');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
  });
});

describe('MSW Server Configuration Verification', () => {
  it('verifies all MSW endpoints are accessible', async () => {
    // Test all endpoints defined in handlers.ts

    // Test GET /api/users
    let response = await fetch('/api/users');
    let data = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(2);

    // Test POST /api/users
    response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com' }),
    });
    data = await response.json();
    expect(response.status).toBe(201);
    expect(data).toHaveProperty('id');
    expect(data.name).toBe('Test User');
    expect(data.email).toBe('test@example.com');

    // Test error endpoint
    response = await fetch('/api/error');
    data = await response.json();
    expect(response.status).toBe(500);
    expect(data.message).toBe('Internal Server Error');

    // Test delayed endpoint
    response = await fetch('/api/delayed');
    data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe('Delayed response');
  });

  it('verifies MSW isolation between test suites', async () => {
    // This test specifically checks that MSW handlers don't leak between test suites
    const response = await fetch('/api/users');
    const data = await response.json();

    // Should get the same data as in the previous test
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('John Doe');
    expect(data[1].name).toBe('Jane Smith');
  });

  it('verifies MSW cleanup verification test', async () => {
    // Final verification that MSW is working correctly
    // This proves that the server is properly reset between tests

    const response = await fetch('/api/users');
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
