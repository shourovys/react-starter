import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUIStore } from '../../src/store/ui-store';

describe('UIStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current.sidebarOpen).toBe(true);
    expect(result.current.theme).toBe('system');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.notifications).toEqual([]);
  });

  it('should toggle sidebar correctly', () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current.sidebarOpen).toBe(true);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.sidebarOpen).toBe(false);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.sidebarOpen).toBe(true);
  });

  it('should set sidebar open state correctly', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setSidebarOpen(false);
    });

    expect(result.current.sidebarOpen).toBe(false);

    act(() => {
      result.current.setSidebarOpen(true);
    });

    expect(result.current.sidebarOpen).toBe(true);
  });

  it('should set theme correctly', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.setTheme('system');
    });

    expect(result.current.theme).toBe('system');
  });

  it('should set loading state correctly', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should add notification correctly', () => {
    const { result } = renderHook(() => useUIStore());
    const notification = {
      message: 'Test notification',
      type: 'success' as const,
    };

    act(() => {
      const id = result.current.addNotification(notification);
      expect(typeof id).toBe('string');
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0]).toMatchObject({
      ...notification,
      id: expect.any(String),
    });
  });

  it('should generate IDs for notifications', () => {
    const { result } = renderHook(() => useUIStore());

    let id: string;

    act(() => {
      id = result.current.addNotification({
        message: 'Test notification 1',
        type: 'success' as const,
      });
    });

    // Wait for state update to complete
    act(() => {
      expect(id).toBeDefined();
      expect(id).toBeTypeOf('string');
      expect(result.current.notifications).toHaveLength(1);

      const notification = result.current.notifications[0];
      expect(notification).toBeDefined();
      if (notification) {
        expect(notification.message).toBe('Test notification 1');
        expect(notification.type).toBe('success');
        expect(notification.id).toBe(id);
      }
    });
  });

  it('should remove notification correctly', () => {
    const { result } = renderHook(() => useUIStore());
    const notification = {
      message: 'Test notification',
      type: 'success' as const,
    };

    let notificationId: string;

    act(() => {
      notificationId = result.current.addNotification(notification);
    });

    expect(result.current.notifications).toHaveLength(1);

    act(() => {
      result.current.removeNotification(notificationId);
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('should clear all notifications', () => {
    const { result } = renderHook(() => useUIStore());
    const notification = {
      message: 'Test notification',
      type: 'success' as const,
    };

    act(() => {
      result.current.addNotification(notification);
      result.current.addNotification(notification);
    });

    expect(result.current.notifications).toHaveLength(2);

    act(() => {
      result.current.clearNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('should handle different notification types', () => {
    const { result } = renderHook(() => useUIStore());
    const notificationTypes = ['success', 'error', 'warning', 'info'] as const;

    act(() => {
      notificationTypes.forEach(type => {
        result.current.addNotification({
          message: `${type} notification`,
          type,
        });
      });
    });

    expect(result.current.notifications).toHaveLength(4);
    expect(result.current.notifications[0]?.type).toBe('success');
    expect(result.current.notifications[1]?.type).toBe('error');
    expect(result.current.notifications[2]?.type).toBe('warning');
    expect(result.current.notifications[3]?.type).toBe('info');
  });

  it('should return all state properties and methods', () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current).toHaveProperty('sidebarOpen');
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('notifications');
    expect(result.current).toHaveProperty('toggleSidebar');
    expect(result.current).toHaveProperty('setSidebarOpen');
    expect(result.current).toHaveProperty('setTheme');
    expect(result.current).toHaveProperty('setIsLoading');
    expect(result.current).toHaveProperty('addNotification');
    expect(result.current).toHaveProperty('removeNotification');
    expect(result.current).toHaveProperty('clearNotifications');
  });

  it('should preserve state when updating different properties', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setSidebarOpen(false);
      result.current.setTheme('light');
      result.current.setIsLoading(true);
    });

    expect(result.current.sidebarOpen).toBe(false);
    expect(result.current.theme).toBe('light');
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.toggleSidebar();
      result.current.setTheme('dark');
      result.current.setIsLoading(false);
    });

    expect(result.current.sidebarOpen).toBe(true);
    expect(result.current.theme).toBe('dark');
    expect(result.current.isLoading).toBe(false);
  });
});
