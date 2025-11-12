import { describe, expect, it } from 'vitest';

console.log('example test file loaded');

describe('Example Test', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should handle math', () => {
    expect(2 + 2).toBe(4);
  });
});
