/**
 * General helper functions using lodash for common operations
 */

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId';

/**
 * Debounce function using lodash
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export function debounceFunction<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  return debounce(func, wait);
}

/**
 * Generate unique ID using lodash
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateId(prefix: string = 'id'): string {
  return uniqueId(prefix);
}

/**
 * Sleep/delay function
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param fn - Function to retry
 * @param maxAttempts - Maximum number of attempts
 * @param baseDelay - Base delay in milliseconds
 * @returns Promise that resolves with the function result
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }

  throw lastError!;
}

/**
 * Create a range of numbers using lodash
 * @param start - Start number (inclusive)
 * @param end - End number (inclusive)
 * @param step - Step size
 * @returns Array of numbers
 */
export function createRange(
  start: number,
  end: number,
  step: number = 1
): number[] {
  return range(start, end + 1, step);
}

/**
 * Check if value is empty using lodash
 * @param value - Value to check
 * @returns True if value is empty
 */
export function isValueEmpty(value: unknown): boolean {
  return isEmpty(value);
}
