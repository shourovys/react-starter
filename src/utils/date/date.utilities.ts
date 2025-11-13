/**
 * Date utility functions using date-fns for formatting, parsing, and manipulation
 */

import {
  format as formatDateFns,
  formatDistanceToNow as formatDistanceToNowFns,
  parseISO as parseISOFns,
} from 'date-fns';

/**
 * Format a date to a readable string
 * @param date - Date to format (Date, string, or number)
 * @param format - Format string (default: 'yyyy-MM-dd')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  format: 'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'relative' = 'yyyy-MM-dd'
): string {
  const dateObj = typeof date === 'string' ? parseISOFns(date) : new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided');
  }

  switch (format) {
    case 'MM/dd/yyyy':
      return formatDateFns(dateObj, 'MM/dd/yyyy');
    case 'dd/MM/yyyy':
      return formatDateFns(dateObj, 'dd/MM/yyyy');
    case 'relative':
      return formatDistanceToNowFns(dateObj, { addSuffix: true });
    case 'yyyy-MM-dd':
    default:
      return formatDateFns(dateObj, 'yyyy-MM-dd');
  }
}
