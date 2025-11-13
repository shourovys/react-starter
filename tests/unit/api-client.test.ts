import { describe, expect, it, vi } from 'vitest';

// Mock axios to prevent actual HTTP requests
const mockAxiosInstance = {
  get: vi.fn().mockResolvedValue({ data: {} }),
  post: vi.fn().mockResolvedValue({ data: {} }),
  put: vi.fn().mockResolvedValue({ data: {} }),
  patch: vi.fn().mockResolvedValue({ data: {} }),
  delete: vi.fn().mockResolvedValue({ data: {} }),
  interceptors: {
    request: {
      use: vi.fn((onFulfilled, onRejected) => {
        // Store the interceptor for later calls
        return 1;
      }),
    },
    response: {
      use: vi.fn((onFulfilled, onRejected) => {
        // Store the interceptor for later calls
        return 1;
      }),
    },
  },
};

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
  },
}));

// Mock globals
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

vi.stubGlobal('location', {
  href: '',
});

describe('apiClient', () => {
  it('should be properly exported and have expected methods', async () => {
    const { default: apiClient } = await import('@/services/api-client');

    expect(apiClient).toBeDefined();
    expect(typeof apiClient.get).toBe('function');
    expect(typeof apiClient.post).toBe('function');
    expect(typeof apiClient.put).toBe('function');
    expect(typeof apiClient.patch).toBe('function');
    expect(typeof apiClient.delete).toBe('function');
  });

  it('should make HTTP requests and return responses', async () => {
    const { default: apiClient } = await import('@/services/api-client');

    // Test that the methods exist and can be called successfully
    const result1 = await apiClient.get('/test');
    expect(result1).toBeDefined();

    const result2 = await apiClient.post('/test', { data: 'test' });
    expect(result2).toBeDefined();

    const result3 = await apiClient.put('/test/1', { data: 'test' });
    expect(result3).toBeDefined();

    const result4 = await apiClient.patch('/test/1', { data: 'test' });
    expect(result4).toBeDefined();

    const result5 = await apiClient.delete('/test/1');
    expect(result5).toBeDefined();
  });

  it('should handle different URL formats', async () => {
    const { default: apiClient } = await import('@/services/api-client');

    // Test various URL patterns that should work
    const urls = [
      '/users',
      '/users/123',
      '/users?page=1',
      '/users/123/comments',
      '/api/v1/users',
      '/api/v1/users/123?include=profile',
    ];

    for (const url of urls) {
      const result = await apiClient.get(url);
      expect(result).toBeDefined();
    }
  });

  it('should handle different data types for POST/PUT/PATCH', async () => {
    const { default: apiClient } = await import('@/services/api-client');

    const testData = [
      { name: 'test' },
      ['item1', 'item2'],
      'simple string',
      123,
      null,
      { nested: { data: 'value' } },
    ];

    for (const data of testData) {
      const result1 = await apiClient.post('/test', data);
      expect(result1).toBeDefined();

      const result2 = await apiClient.put('/test/1', data);
      expect(result2).toBeDefined();

      const result3 = await apiClient.patch('/test/1', data);
      expect(result3).toBeDefined();
    }
  });

  it('should handle configuration objects', async () => {
    const { default: apiClient } = await import('@/services/api-client');

    const configs = [
      { headers: { 'Content-Type': 'application/json' } },
      { timeout: 5000 },
      { headers: { Authorization: 'Bearer token' } },
      { params: { page: 1, limit: 10 } },
    ];

    for (const config of configs) {
      const result = await apiClient.get('/test', config);
      expect(result).toBeDefined();
    }
  });

  it('should be a singleton (same instance across imports)', async () => {
    const { default: apiClient1 } = await import('@/services/api-client');
    const { default: apiClient2 } = await import('@/services/api-client');

    // Both imports should return the same instance
    expect(apiClient1).toBe(apiClient2);
  });
});
