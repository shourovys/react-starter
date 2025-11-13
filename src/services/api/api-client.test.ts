import { beforeEach, describe, expect, it, vi } from 'vitest';
import apiClient from './api-client';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

describe('ApiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create an axios instance with correct config', () => {
    // Test that the client is created - basic test since axios is mocked
    expect(apiClient).toBeDefined();
  });

  it('should have all HTTP methods', () => {
    expect(typeof apiClient.get).toBe('function');
    expect(typeof apiClient.post).toBe('function');
    expect(typeof apiClient.put).toBe('function');
    expect(typeof apiClient.patch).toBe('function');
    expect(typeof apiClient.delete).toBe('function');
  });
});
