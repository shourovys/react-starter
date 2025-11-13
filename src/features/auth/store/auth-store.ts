// Simple state management using React hooks
import { useCallback, useState } from 'react';
import type { AuthState, User } from '../types/auth.types';

export const useAuthStore = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const setUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user, isAuthenticated: !!user }));
  }, []);

  const setToken = useCallback((token: string | null) => {
    setState(prev => ({ ...prev, token }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const login = useCallback((user: User, token: string) => {
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  return {
    ...state,
    setUser,
    setToken,
    setLoading,
    logout,
    login,
  };
};

export default useAuthStore;
