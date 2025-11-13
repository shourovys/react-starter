import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUserStore } from '../../src/store/user-store';

describe('UserStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current.users).toEqual([]);
    expect(result.current.currentUser).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should set users correctly', () => {
    const { result } = renderHook(() => useUserStore());
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    act(() => {
      result.current.setUsers(mockUsers);
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.users).toHaveLength(2);
  });

  it('should replace users array when setting new users', () => {
    const { result } = renderHook(() => useUserStore());
    const firstUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    const secondUsers = [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    act(() => {
      result.current.setUsers(firstUsers);
    });

    expect(result.current.users).toHaveLength(1);

    act(() => {
      result.current.setUsers(secondUsers);
    });

    expect(result.current.users).toHaveLength(2);
    expect(result.current.users).toEqual(secondUsers);
  });

  it('should set current user correctly', () => {
    const { result } = renderHook(() => useUserStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setCurrentUser(mockUser);
    });

    expect(result.current.currentUser).toEqual(mockUser);
  });

  it('should clear current user when set to null', () => {
    const { result } = renderHook(() => useUserStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setCurrentUser(mockUser);
    });

    expect(result.current.currentUser).toEqual(mockUser);

    act(() => {
      result.current.setCurrentUser(null);
    });

    expect(result.current.currentUser).toBeNull();
  });

  it('should set loading state correctly', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should set error correctly', () => {
    const { result } = renderHook(() => useUserStore());
    const mockError = 'Something went wrong';

    act(() => {
      result.current.setError(mockError);
    });

    expect(result.current.error).toBe(mockError);
  });

  it('should clear error when set to null', () => {
    const { result } = renderHook(() => useUserStore());
    const mockError = 'Something went wrong';

    act(() => {
      result.current.setError(mockError);
    });

    expect(result.current.error).toBe(mockError);

    act(() => {
      result.current.setError(null);
    });

    expect(result.current.error).toBeNull();
  });

  it('should clear error using clearError method', () => {
    const { result } = renderHook(() => useUserStore());
    const mockError = 'Something went wrong';

    act(() => {
      result.current.setError(mockError);
    });

    expect(result.current.error).toBe(mockError);

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should handle multiple error states', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setError('First error');
    });

    expect(result.current.error).toBe('First error');

    act(() => {
      result.current.setError('Second error');
    });

    expect(result.current.error).toBe('Second error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should update users while preserving other state', () => {
    const { result } = renderHook(() => useUserStore());
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const mockUsers = [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    act(() => {
      result.current.setCurrentUser(mockUser);
      result.current.setLoading(true);
      result.current.setError('Some error');
    });

    expect(result.current.currentUser).toEqual(mockUser);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe('Some error');

    act(() => {
      result.current.setUsers(mockUsers);
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.currentUser).toEqual(mockUser);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe('Some error');
  });

  it('should update current user while preserving other state', () => {
    const { result } = renderHook(() => useUserStore());
    const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    const mockCurrentUser = {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
    };

    act(() => {
      result.current.setUsers(mockUsers);
      result.current.setLoading(true);
      result.current.setError('Some error');
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe('Some error');

    act(() => {
      result.current.setCurrentUser(mockCurrentUser);
    });

    expect(result.current.currentUser).toEqual(mockCurrentUser);
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe('Some error');
  });

  it('should return all state properties and methods', () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current).toHaveProperty('users');
    expect(result.current).toHaveProperty('currentUser');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('setUsers');
    expect(result.current).toHaveProperty('setCurrentUser');
    expect(result.current).toHaveProperty('setLoading');
    expect(result.current).toHaveProperty('setError');
    expect(result.current).toHaveProperty('clearError');
  });

  it('should handle empty users array', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setUsers([]);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.users).toHaveLength(0);
  });

  it('should handle different error message formats', () => {
    const { result } = renderHook(() => useUserStore());
    const errors = [
      'Simple error message',
      'Complex error with details: User not found',
      '',
      'Error with special chars: @#$%',
    ];

    errors.forEach(error => {
      act(() => {
        result.current.setError(error);
      });

      expect(result.current.error).toBe(error);
    });
  });
});
