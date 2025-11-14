import { useCallback, useState } from 'react';
import type {
  AuthState,
  User,
  LoginRequest,
  RegisterRequest,
} from '@/features/auth/types/auth.types';

// Auth Store Hook following existing pattern
export const useAuthStore = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Synchronous actions following the existing pattern
  const setUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user, isAuthenticated: !!user }));
  }, []);

  const setToken = useCallback((token: string | null) => {
    setState(prev => ({ ...prev, token }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const login = useCallback((user: User, token: string) => {
    setState(prev => ({
      ...prev,
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }));
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }));
  }, []);

  // Async operations
  const loginUser = useCallback(
    async (credentials: LoginRequest) => {
      try {
        setLoading(true);
        setError(null);

        // Mock API call - replace with actual API service
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        login(data.user, data.token);
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Login failed';
        setError(errorMessage);
        throw error;
      }
    },
    [login, setLoading, setError]
  );

  const registerUser = useCallback(
    async (userData: RegisterRequest) => {
      try {
        setLoading(true);
        setError(null);

        // Mock API call - replace with actual API service
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        login(data.user, data.token);
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Registration failed';
        setError(errorMessage);
        throw error;
      }
    },
    [login, setLoading, setError]
  );

  const refreshToken = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Token refresh failed');
      }

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        if (data.user) {
          setUser(data.user);
        }
      }
      return data;
    } catch (error) {
      // If token refresh fails, logout user
      logout();
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setToken, setUser, setLoading, logout]);

  return {
    ...state,
    setUser,
    setToken,
    setLoading,
    setError,
    clearError,
    logout,
    login,
    updateUser,
    loginUser,
    registerUser,
    refreshToken,
  };
};

export default useAuthStore;
