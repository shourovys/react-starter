/**
 * Validation utility functions using Zod for type-safe validation
 */

import { z } from 'zod';

/**
 * Common validation schemas
 */

// Email validation schema
export const emailSchema = z.string().email('Invalid email format');

// URL validation schema
export const urlSchema = z.string().url('Invalid URL format');

// Password validation schema (customizable)
export const createPasswordSchema = (options?: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options || {};

  let passwordSchema = z
    .string()
    .min(minLength, `Password must be at least ${minLength} characters`);

  if (requireUppercase) {
    passwordSchema = passwordSchema.regex(
      /[A-Z]/,
      'Password must contain at least one uppercase letter'
    );
  }

  if (requireLowercase) {
    passwordSchema = passwordSchema.regex(
      /[a-z]/,
      'Password must contain at least one lowercase letter'
    );
  }

  if (requireNumbers) {
    passwordSchema = passwordSchema.regex(
      /\d/,
      'Password must contain at least one number'
    );
  }

  if (requireSpecialChars) {
    passwordSchema = passwordSchema.regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    );
  }

  return passwordSchema;
};
