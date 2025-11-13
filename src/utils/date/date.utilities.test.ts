/**
 * Tests for date utility functions
 */

import { describe, it, expect } from 'vitest';
import { formatDate } from './date.utilities';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    const mockDate = new Date('2023-12-25T10:30:00Z');

    it('should format date in yyyy-MM-dd format by default', () => {
      const result = formatDate(mockDate);
      expect(result).toBe('2023-12-25');
    });

    it('should format date in MM/dd/yyyy format', () => {
      const result = formatDate(mockDate, 'MM/dd/yyyy');
      expect(result).toBe('12/25/2023');
    });

    it('should format date in dd/MM/yyyy format', () => {
      const result = formatDate(mockDate, 'dd/MM/yyyy');
      expect(result).toBe('25/12/2023');
    });

    it('should format date relatively', () => {
      const result = formatDate(mockDate, 'relative');
      expect(result).toMatch(/ago$/);
    });

    it('should handle string dates', () => {
      const result = formatDate('2023-12-25T10:30:00Z');
      expect(result).toBe('2023-12-25');
    });

    it('should handle number timestamps', () => {
      const timestamp = mockDate.getTime();
      const result = formatDate(timestamp);
      expect(result).toBe('2023-12-25');
    });

    it('should throw error for invalid date', () => {
      expect(() => formatDate('invalid-date')).toThrow('Invalid date provided');
    });
  });
});
