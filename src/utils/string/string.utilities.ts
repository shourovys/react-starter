/**
 * String utility functions for formatting, validation, and manipulation
 */

/**
 * Convert string to camelCase
 * @param str - String to convert
 * @returns camelCase string
 */
export function toCamelCase(str: string): string {
  if (!str.trim()) return '';

  return str
    .toLowerCase()
    .replace(/[\s\-_]+/g, ' ')
    .split(' ')
    .filter(word => word.length > 0)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

/**
 * Convert string to PascalCase
 * @param str - String to convert
 * @returns PascalCase string
 */
export function toPascalCase(str: string): string {
  if (!str.trim()) return '';

  return str
    .toLowerCase()
    .replace(/[\s\-_]+/g, ' ')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string to specified length
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}
