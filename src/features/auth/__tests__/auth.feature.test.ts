import { describe, expect, it, beforeEach, vi } from 'vitest';
import { authFeatureVersion, authService, useAuthStore } from '../index';
import { renderHook, act } from '@testing-library/react';
import { apiClient } from '../../../services';

// Mock the services
vi.mock('../../../services', () => ({
  apiClient: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Auth Feature Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should export feature version', () => {
    expect(authFeatureVersion).toBe('1.0.0');
  });

  it('should have proper directory structure', () => {
    // Test that the feature exports expected public API
    expect(authService).toBeDefined();
    expect(useAuthStore).toBeDefined();
    expect(typeof authService.login).toBe('function');
    expect(typeof authService.logout).toBe('function');
  });

  describe('Authentication Flow Integration', () => {
    it('should handle login flow with service and store', async () => {
      const { result } = renderHook(() => useAuthStore());

      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      const mockToken = 'mock-jwt-token';
      const mockResponse = { user: mockUser, token: mockToken };

      // Mock API response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (apiClient.post as any).mockResolvedValue({ data: mockResponse });

      // Perform login
      await act(async () => {
        const response = await authService.login({
          email: 'test@example.com',
          password: 'password123',
        });
        result.current.login(response.user, response.token);
      });

      // Verify store state
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.token).toBe(mockToken);

      // Verify localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authToken',
        mockToken
      );
    });

    it('should handle logout flow', async () => {
      const { result } = renderHook(() => useAuthStore());

      // Set initial authenticated state
      act(() => {
        result.current.login(
          { id: 1, email: 'test@example.com', name: 'Test User' },
          'mock-token'
        );
      });

      // Mock API response for logout
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (apiClient.post as any).mockResolvedValue({});

      // Perform logout
      await act(async () => {
        await authService.logout();
        result.current.logout();
      });

      // Verify store state
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();

      // Verify localStorage
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });

    it('should check authentication status', () => {
      localStorageMock.getItem.mockReturnValue('mock-token');
      expect(authService.isAuthenticated()).toBe(true);

      localStorageMock.getItem.mockReturnValue(null);
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should get stored token', () => {
      localStorageMock.getItem.mockReturnValue('mock-token');
      expect(authService.getToken()).toBe('mock-token');

      localStorageMock.getItem.mockReturnValue(null);
      expect(authService.getToken()).toBeNull();
    });
  });

  describe('Store State Management', () => {
    it('should manage loading state', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.isLoading).toBe(true);

      act(() => {
        result.current.setLoading(false);
      });
      expect(result.current.isLoading).toBe(false);
    });

    it('should manage user state', () => {
      const { result } = renderHook(() => useAuthStore());

      const user = { id: 1, email: 'test@example.com', name: 'Test User' };

      act(() => {
        result.current.setUser(user);
      });
      expect(result.current.user).toEqual(user);
      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.setUser(null);
      });
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
