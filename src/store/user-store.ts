import { useCallback, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = () => {
  const [state, setState] = useState<UserState>({
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
  });

  const setUsers = useCallback((users: User[]) => {
    setState(prev => ({ ...prev, users }));
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, currentUser: user }));
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

  return {
    ...state,
    setUsers,
    setCurrentUser,
    setLoading,
    setError,
    clearError,
  };
};

export default useUserStore;
