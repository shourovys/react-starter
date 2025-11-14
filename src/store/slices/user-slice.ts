import { useCallback, useState } from 'react';

// Types based on existing user feature types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

// User Store Hook following the established pattern
export const useUserStore = () => {
  const [state, setState] = useState<UserState>({
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
  });

  // Synchronous actions following the established pattern
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

  // User management actions
  const addUser = useCallback((user: User) => {
    setState(prev => ({
      ...prev,
      users: [...prev.users, user],
    }));
  }, []);

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      ),
      currentUser:
        prev.currentUser?.id === userId
          ? { ...prev.currentUser, ...updates }
          : prev.currentUser,
    }));
  }, []);

  const removeUser = useCallback((userId: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.filter(user => user.id !== userId),
      currentUser: prev.currentUser?.id === userId ? null : prev.currentUser,
    }));
  }, []);

  const clearUsers = useCallback(() => {
    setState(prev => ({
      ...prev,
      users: [],
      currentUser: null,
    }));
  }, []);

  // Async operations
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock API call - replace with actual API service
      const response = await fetch('/api/users');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || data);
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch users';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading, setError]);

  const fetchUserById = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user');
        }

        const data = await response.json();
        setCurrentUser(data.user || data);
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch user';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setCurrentUser, setLoading, setError]
  );

  const createUser = useCallback(
    async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create user');
        }

        const data = await response.json();
        addUser(data.user || data);
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to create user';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addUser, setLoading, setError]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete user');
        }

        removeUser(userId);
        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to delete user';
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [removeUser, setLoading, setError]
  );

  return {
    ...state,
    // State actions
    setUsers,
    setCurrentUser,
    setLoading,
    setError,
    clearError,
    // User management actions
    addUser,
    updateUser,
    removeUser,
    clearUsers,
    // Async operations
    fetchUsers,
    fetchUserById,
    createUser,
    deleteUser,
  };
};

export default useUserStore;
