/**
 * Tests for validation utility functions
 */

import { describe, it, expect } from 'vitest';
import {
  createPasswordSchema,
  emailSchema,
  urlSchema,
} from './validation.utilities';

describe('Validation Utilities', () => {
  describe('emailSchema', () => {
    it('should validate correct email addresses', () => {
      const result = emailSchema.safeParse('test@example.com');
      expect(result.success).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      const result = emailSchema.safeParse('invalid-email');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email format');
      }
    });

    it('should reject empty string', () => {
      const result = emailSchema.safeParse('');
      expect(result.success).toBe(false);
    });
  });

  describe('urlSchema', () => {
    it('should validate correct URLs', () => {
      const result = urlSchema.safeParse('https://example.com');
      expect(result.success).toBe(true);

      const result2 = urlSchema.safeParse('http://test.com/path');
      expect(result2.success).toBe(true);
    });

    it('should reject invalid URLs', () => {
      const result = urlSchema.safeParse('not-a-url');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid URL format');
      }
    });
  });

  describe('createPasswordSchema', () => {
    it('should create schema with default options', () => {
      const schema = createPasswordSchema();
      const validResult = schema.safeParse('Password123!');
      const invalidResult = schema.safeParse('weak');

      expect(validResult.success).toBe(true);
      expect(invalidResult.success).toBe(false);
    });

    it('should respect custom minimum length', () => {
      const schema = createPasswordSchema({ minLength: 12 });
      const validResult = schema.safeParse('Password123!');
      const invalidResult = schema.safeParse('Short1!');

      expect(validResult.success).toBe(true);
      expect(invalidResult.success).toBe(false);
      if (!invalidResult.success) {
        expect(invalidResult.error.issues[0].message).toContain(
          'at least 12 characters'
        );
      }
    });

    it('should validate uppercase requirement', () => {
      const schema = createPasswordSchema({ requireUppercase: true });
      const validResult = schema.safeParse('Password123!');
      const invalidResult = schema.safeParse('password123!');

      expect(validResult.success).toBe(true);
      expect(invalidResult.success).toBe(false);
      if (!invalidResult.success) {
        expect(invalidResult.error.issues[0].message).toContain(
          'uppercase letter'
        );
      }
    });

    it('should validate lowercase requirement', () => {
      const schema = createPasswordSchema({ requireLowercase: true });
      const validResult = schema.safeParse('Password123!');
      const invalidResult = schema.safeParse('PASSWORD123!');

      expect(validResult.success).toBe(true);
      expect(invalidResult.success).toBe(false);
      if (!invalidResult.success) {
        expect(invalidResult.error.issues[0].message).toContain(
          'lowercase letter'
        );
      }
    });

    it('should validate number requirement', () => {
      const schema = createPasswordSchema({ requireNumbers: true });
      const validResult = schema.safeParse('Password123!');
      const invalidResult = schema.safeParse('Password!');

      expect(validResult.success).toBe(true);
      expect(invalidResult.success).toBe(false);
      if (!invalidResult.success) {
        expect(invalidResult.error.issues[0].message).toContain('number');
      }
    });

    it('should validate special character requirement', () => {
      const schema = createPasswordSchema({ requireSpecialChars: true });
      const validResult = schema.safeParse('Password123!');
      const invalidResult = schema.safeParse('Password123');

      expect(validResult.success).toBe(true);
      expect(invalidResult.success).toBe(false);
      if (!invalidResult.success) {
        expect(invalidResult.error.issues[0].message).toContain(
          'special character'
        );
      }
    });
  });
});
