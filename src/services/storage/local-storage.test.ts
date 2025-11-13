import { beforeEach, describe, expect, it } from 'vitest';
import localStorageService from './local-storage';

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

describe('LocalStorageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get an item from localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('test-value'));
    const result = localStorageService.get('test-key');
    expect(result).toBe('test-value');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
  });

  it('should return null for non-existent item', () => {
    localStorageMock.getItem.mockReturnValue(null);
    const result = localStorageService.get('non-existent');
    expect(result).toBeNull();
  });

  it('should set an item in localStorage', () => {
    localStorageService.set('test-key', 'test-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('test-value')
    );
  });

  it('should remove an item from localStorage', () => {
    localStorageService.remove('test-key');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('should clear localStorage', () => {
    localStorageService.clear();
    expect(localStorageMock.clear).toHaveBeenCalled();
  });

  it('should check if an item exists', () => {
    localStorageMock.getItem.mockReturnValue('value');
    expect(localStorageService.has('test-key')).toBe(true);
    localStorageMock.getItem.mockReturnValue(null);
    expect(localStorageService.has('test-key')).toBe(false);
  });
});
