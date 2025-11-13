/**
 * Tests for helper utility functions
 */

import { describe, expect, it, vi } from 'vitest';
import {
  createRange,
  debounceFunction,
  generateId,
  retry,
  sleep,
} from './helpers';

describe('Helper Utilities', () => {
  describe('debounceFunction', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const debouncedFn = debounceFunction(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('should use prefix when provided', () => {
      const id = generateId('user');
      expect(id).toMatch(/^user/);
    });
  });

  describe('sleep', () => {
    it('should wait for specified time', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90);
      expect(elapsed).toBeLessThanOrEqual(150);
    });
  });

  describe('retry', () => {
    it('should succeed on first attempt', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retry(fn, 3, 100);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and succeed', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      const result = await retry(fn, 3, 50);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should fail after max attempts', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('always fail'));

      await expect(retry(fn, 2, 50)).rejects.toThrow('always fail');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('createRange', () => {
    it('should create range from start to end', () => {
      expect(createRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should create range with custom step', () => {
      expect(createRange(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    });

    it('should handle negative ranges', () => {
      expect(createRange(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    });
  });
});
