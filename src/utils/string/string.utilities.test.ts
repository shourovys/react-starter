/**
 * Tests for string utility functions
 */

import { describe, expect, it } from 'vitest';
import { capitalize, toCamelCase, truncate } from './string.utilities';

describe('String Utilities', () => {
  describe('toCamelCase', () => {
    it('should convert string to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('HELLO WORLD')).toBe('helloWorld');
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('should handle single words', () => {
      expect(toCamelCase('hello')).toBe('hello');
      expect(toCamelCase('HELLO')).toBe('hello');
    });

    it('should handle empty and edge cases', () => {
      expect(toCamelCase('')).toBe('');
      expect(toCamelCase('  ')).toBe('');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('HELLO');
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character strings', () => {
      expect(capitalize('h')).toBe('H');
      expect(capitalize('H')).toBe('H');
    });
  });

  describe('truncate', () => {
    it('should truncate string to specified length', () => {
      expect(truncate('Hello World', 5)).toBe('He...');
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should use custom suffix', () => {
      expect(truncate('Hello World', 5, '[+]')).toBe('He[+]');
    });

    it('should handle edge cases', () => {
      expect(truncate('', 5)).toBe('');
      expect(truncate('Hi', 10)).toBe('Hi');
      expect(truncate('Hello', 2)).toBe('...');
    });
  });
});
