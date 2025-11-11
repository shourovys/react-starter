import { useCallback, useState } from 'react';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  isLoading: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>;
}

export const useUIStore = () => {
  const [state, setState] = useState<UIState>({
    sidebarOpen: true,
    theme: 'system',
    isLoading: false,
    notifications: [],
  });

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen: open }));
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    setState(prev => ({ ...prev, theme }));
  }, []);

  const setIsLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<UIState['notifications'][0], 'id'>) => {
      const id = Date.now().toString();
      setState(prev => ({
        ...prev,
        notifications: [...prev.notifications, { ...notification, id }],
      }));
      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id),
    }));
  }, []);

  const clearNotifications = useCallback(() => {
    setState(prev => ({ ...prev, notifications: [] }));
  }, []);

  return {
    ...state,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setIsLoading,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};

export default useUIStore;
