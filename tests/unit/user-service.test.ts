import apiClient from '@/services/api-client';
import userService from '@/services/user-service';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock apiClient
vi.mock('@/services/api-client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock localStorage (for auth token if needed)
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockApiClient = apiClient as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getUsers', () => {
    it('should fetch all users successfully', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          createdAt: '2024-01-02T00:00:00Z',
        },
      ];

      mockApiClient.get.mockResolvedValue({ data: mockUsers });

      const result = await userService.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/users');
    });

    it('should handle getUsers errors gracefully', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(userService.getUsers()).rejects.toThrow('Network error');
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/users');
    });

    it('should return empty array when no users exist', async () => {
      mockApiClient.get.mockResolvedValue({ data: [] });

      const result = await userService.getUsers();

      expect(result).toEqual([]);
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/users');
    });
  });

  describe('getUser', () => {
    it('should fetch single user by ID successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockApiClient.get.mockResolvedValue({ data: mockUser });

      const result = await userService.getUser(1);

      expect(result).toEqual(mockUser);
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/users/1');
    });

    it('should handle getUser errors gracefully', async () => {
      mockApiClient.get.mockRejectedValue(new Error('User not found'));

      await expect(userService.getUser(999)).rejects.toThrow('User not found');
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/users/999');
    });

    it('should call API with correct user ID', async () => {
      const mockUser = {
        id: 42,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockApiClient.get.mockResolvedValue({ data: mockUser });

      await userService.getUser(42);

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/users/42');
    });
  });

  describe('createUser', () => {
    it('should create new user successfully', async () => {
      const newUserData = {
        name: 'New User',
        email: 'new@example.com',
      };

      const mockCreatedUser = {
        id: 3,
        name: 'New User',
        email: 'new@example.com',
        createdAt: '2024-01-03T00:00:00Z',
      };

      mockApiClient.post.mockResolvedValue({ data: mockCreatedUser });

      const result = await userService.createUser(newUserData);

      expect(result).toEqual(mockCreatedUser);
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/users',
        newUserData
      );
    });

    it('should handle createUser errors gracefully', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Email already exists'));

      const newUserData = {
        name: 'Test User',
        email: 'existing@example.com',
      };

      await expect(userService.createUser(newUserData)).rejects.toThrow(
        'Email already exists'
      );
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/users',
        newUserData
      );
    });

    it('should create user with minimal data', async () => {
      const newUserData = {
        name: 'Minimal User',
        email: 'minimal@example.com',
      };

      const mockCreatedUser = {
        id: 4,
        name: 'Minimal User',
        email: 'minimal@example.com',
        createdAt: '2024-01-04T00:00:00Z',
      };

      mockApiClient.post.mockResolvedValue({ data: mockCreatedUser });

      const result = await userService.createUser(newUserData);

      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/users',
        newUserData
      );
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const userId = 1;
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const mockUpdatedUser = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockApiClient.put.mockResolvedValue({ data: mockUpdatedUser });

      const result = await userService.updateUser(userId, updateData);

      expect(result).toEqual(mockUpdatedUser);
      expect(mockApiClient.put).toHaveBeenCalledWith(
        '/api/users/1',
        updateData
      );
    });

    it('should handle updateUser errors gracefully', async () => {
      mockApiClient.put.mockRejectedValue(new Error('User not found'));

      const userId = 999;
      const updateData = {
        name: 'Updated Name',
      };

      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        'User not found'
      );
      expect(mockApiClient.put).toHaveBeenCalledWith(
        '/api/users/999',
        updateData
      );
    });

    it('should update user with partial data', async () => {
      const userId = 1;
      const updateData = {
        name: 'Name Only Update',
      };

      const mockUpdatedUser = {
        id: 1,
        name: 'Name Only Update',
        email: 'original@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockApiClient.put.mockResolvedValue({ data: mockUpdatedUser });

      const result = await userService.updateUser(userId, updateData);

      expect(result.name).toBe('Name Only Update');
      expect(result.email).toBe('original@example.com'); // unchanged
      expect(mockApiClient.put).toHaveBeenCalledWith(
        '/api/users/1',
        updateData
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = 1;

      mockApiClient.delete.mockResolvedValue({});

      await userService.deleteUser(userId);

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/users/1');
    });

    it('should handle deleteUser errors gracefully', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('User not found'));

      const userId = 999;

      await expect(userService.deleteUser(userId)).rejects.toThrow(
        'User not found'
      );
      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/users/999');
    });

    it('should call delete with correct user ID', async () => {
      mockApiClient.delete.mockResolvedValue({});

      await userService.deleteUser(42);

      expect(mockApiClient.delete).toHaveBeenCalledWith('/api/users/42');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle network timeouts gracefully', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Request timeout'));

      await expect(userService.getUsers()).rejects.toThrow('Request timeout');
    });

    it('should handle invalid user IDs gracefully', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Invalid ID'));

      await expect(userService.getUser(-1)).rejects.toThrow('Invalid ID');
      await expect(userService.getUser(0)).rejects.toThrow('Invalid ID');
    });

    it('should handle null or undefined user data', async () => {
      mockApiClient.post.mockResolvedValue({ data: null });

      const newUserData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const result = await userService.createUser(newUserData);

      expect(result).toBeNull();
    });
  });

  describe('Data Validation', () => {
    it('should preserve user ID when updating', async () => {
      const userId = 5;
      const updateData = {
        name: 'Updated Name',
      };

      const mockUpdatedUser = {
        id: 5,
        name: 'Updated Name',
        email: 'original@example.com',
        createdAt: '2024-01-05T00:00:00Z',
      };

      mockApiClient.put.mockResolvedValue({ data: mockUpdatedUser });

      const result = await userService.updateUser(userId, updateData);

      expect(result.id).toBe(userId);
    });

    it('should handle large user IDs', async () => {
      const largeId = 999999999;
      const mockUser = {
        id: largeId,
        name: 'Large ID User',
        email: 'large@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockApiClient.get.mockResolvedValue({ data: mockUser });

      const result = await userService.getUser(largeId);

      expect(result.id).toBe(largeId);
      expect(mockApiClient.get).toHaveBeenCalledWith(`/api/users/${largeId}`);
    });
  });
});
