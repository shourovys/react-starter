/**
 * Tests for application constants
 */

import { describe, expect, it } from 'vitest';
import {
  DATE_FORMATS,
  HTTP_STATUS,
  LANGUAGES,
  PAGINATION,
  STORAGE_KEYS,
  THEME,
} from './constants';

describe('Constants', () => {
  describe('HTTP_STATUS', () => {
    it('should have correct HTTP status codes', () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.CREATED).toBe(201);
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
      expect(HTTP_STATUS.UNAUTHORIZED).toBe(401);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500);
    });

    it('should be readonly', () => {
      // @ts-expect-error - should be readonly
      HTTP_STATUS.OK = 999;
    });
  });

  describe('STORAGE_KEYS', () => {
    it('should have correct storage key values', () => {
      expect(STORAGE_KEYS.AUTH_TOKEN).toBe('auth_token');
      expect(STORAGE_KEYS.REFRESH_TOKEN).toBe('refresh_token');
      expect(STORAGE_KEYS.THEME).toBe('theme');
    });

    it('should be readonly', () => {
      // @ts-expect-error - should be readonly
      STORAGE_KEYS.AUTH_TOKEN = 'new_key';
    });
  });

  describe('DATE_FORMATS', () => {
    it('should have correct date format strings', () => {
      expect(DATE_FORMATS.SHORT).toBe('MM/dd/yyyy');
      expect(DATE_FORMATS.LONG).toBe('MMMM dd, yyyy');
      expect(DATE_FORMATS.ISO).toBe("yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    });

    it('should be readonly', () => {
      // @ts-expect-error - should be readonly
      DATE_FORMATS.SHORT = 'new_format';
    });
  });

  describe('THEME', () => {
    it('should have correct theme constants', () => {
      expect(THEME.LIGHT).toBe('light');
      expect(THEME.DARK).toBe('dark');
      expect(THEME.SYSTEM).toBe('system');
    });
  });

  describe('LANGUAGES', () => {
    it('should have correct language codes', () => {
      expect(LANGUAGES.EN).toBe('en');
      expect(LANGUAGES.ES).toBe('es');
      expect(LANGUAGES.FR).toBe('fr');
      expect(LANGUAGES.DE).toBe('de');
    });
  });

  describe('PAGINATION', () => {
    it('should have correct pagination settings', () => {
      expect(PAGINATION.DEFAULT_PAGE_SIZE).toBe(10);
      expect(PAGINATION.MAX_PAGE_SIZE).toBe(100);
      expect(PAGINATION.PAGE_SIZE_OPTIONS).toEqual([10, 25, 50, 100]);
    });
  });
});
