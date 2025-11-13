import apiClient from '@/services/api-client';
import authService from '@/services/auth-service';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock apiClient
vi.mock('@/services/api-client', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockApiClient = apiClient as {
  post: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
};

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        data: {
          user: { id: 1, name: 'John Doe', email: 'john@example.com' },
          token: 'mock-jwt-token',
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const credentials = {
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await authService.login(credentials);

      expect(result).toEqual(mockResponse.data);
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/auth/login',
        credentials
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authToken',
        'mock-jwt-token'
      );
    });

    it('should handle login errors gracefully', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Invalid credentials'));

      const credentials = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      await expect(authService.login(credentials)).rejects.toThrow(
        'Invalid credentials'
      );
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', async () => {
      const mockResponse = {
        data: {
          user: { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
          token: 'mock-register-token',
        },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      };

      const result = await authService.register(userData);

      expect(result).toEqual(mockResponse.data);
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/auth/register',
        userData
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authToken',
        'mock-register-token'
      );
    });

    it('should handle registration errors gracefully', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Email already exists'));

      const userData = {
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'password123',
      };

      await expect(authService.register(userData)).rejects.toThrow(
        'Email already exists'
      );
    });
  });

  describe('logout', () => {
    it('should logout successfully and clear localStorage', async () => {
      localStorageMock.getItem.mockReturnValue('existing-token');
      mockApiClient.post.mockResolvedValue({});

      await authService.logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/logout');
    });

    it('should logout even if backend request fails', async () => {
      localStorageMock.getItem.mockReturnValue('existing-token');
      mockApiClient.post.mockRejectedValue(new Error('Network error'));

      await authService.logout(); // Should not throw

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user data', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      mockApiClient.get.mockResolvedValue({ data: mockUser });

      const result = await authService.getCurrentUser();

      expect(result).toEqual(mockUser);
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/me');
    });

    it('should handle getCurrentUser errors', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Unauthorized'));

      await expect(authService.getCurrentUser()).rejects.toThrow(
        'Unauthorized'
      );
    });
  });

  describe('refreshToken', () => {
    it('should refresh token and return new token', async () => {
      const mockResponse = {
        data: { token: 'new-refreshed-token' },
      };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await authService.refreshToken();

      expect(result).toBe('new-refreshed-token');
      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/refresh');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authToken',
        'new-refreshed-token'
      );
    });

    it('should handle refresh token errors', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Refresh failed'));

      await expect(authService.refreshToken()).rejects.toThrow(
        'Refresh failed'
      );
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when auth token exists', () => {
      localStorageMock.getItem.mockReturnValue('valid-token');

      const result = authService.isAuthenticated();

      expect(result).toBe(true);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('should return false when no auth token exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = authService.isAuthenticated();

      expect(result).toBe(false);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('should return false when auth token is empty string', () => {
      localStorageMock.getItem.mockReturnValue('');

      const result = authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('getToken', () => {
    it('should return the auth token when it exists', () => {
      localStorageMock.getItem.mockReturnValue('stored-token');

      const result = authService.getToken();

      expect(result).toBe('stored-token');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('should return null when no auth token exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = authService.getToken();

      expect(result).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    it('should return the actual token string', () => {
      const mockToken = 'jwt-token-12345';
      localStorageMock.getItem.mockReturnValue(mockToken);

      const result = authService.getToken();

      expect(result).toBe(mockToken);
    });
  });
});
