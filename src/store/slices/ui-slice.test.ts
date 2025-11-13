import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUIStore } from './ui-slice';

describe('UI Slice', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current.sidebarOpen).toBe(true);
    expect(result.current.theme).toBe('system');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.notifications).toEqual([]);
  });

  it('should toggle sidebar', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.sidebarOpen).toBe(false);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.sidebarOpen).toBe(true);
  });

  it('should set sidebar open state', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setSidebarOpen(false);
    });

    expect(result.current.sidebarOpen).toBe(false);
  });

  it('should set theme', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should manage loading state', () => {
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

  it('should add and remove notifications', () => {
    const { result } = renderHook(() => useUIStore());

    let notificationId: string;

    act(() => {
      notificationId = result.current.addNotification({
        message: 'Test notification',
        type: 'info',
      });
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].message).toBe('Test notification');
    expect(result.current.notifications[0].type).toBe('info');

    act(() => {
      result.current.removeNotification(notificationId!);
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('should clear all notifications', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        message: 'Notification 1',
        type: 'success',
      });
      result.current.addNotification({
        message: 'Notification 2',
        type: 'error',
      });
    });

    expect(result.current.notifications).toHaveLength(2);

    act(() => {
      result.current.clearNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });
});
