import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from '../../src/store/auth-store';

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set user correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should clear user when set to null', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.setUser(null);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should set token correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockToken = 'mock-jwt-token';

    act(() => {
      result.current.setToken(mockToken);
    });

    expect(result.current.token).toBe(mockToken);
  });

  it('should clear token when set to null', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setToken('mock-token');
    });

    expect(result.current.token).toBe('mock-token');

    act(() => {
      result.current.setToken(null);
    });

    expect(result.current.token).toBeNull();
  });

  it('should set loading state correctly', () => {
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

  it('should handle logout correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setUser(mockUser);
      result.current.setToken('mock-token');
      result.current.setLoading(true);
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle login correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const mockToken = 'mock-jwt-token';

    act(() => {
      result.current.login(mockUser, mockToken);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return all state properties and methods', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('token');
    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('setUser');
    expect(result.current).toHaveProperty('setToken');
    expect(result.current).toHaveProperty('setLoading');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('login');
  });

  it('should set user as authenticated when user exists', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should be unauthenticated when no user exists', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.isAuthenticated).toBe(false);

    act(() => {
      result.current.setUser(null);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
