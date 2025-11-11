import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';

describe('Basic Test', () => {
  it('should pass basic math test', () => {
    expect(2 + 2).toBe(4);
  });

  it('should pass string test', () => {
    expect('hello').toBe('hello');
  });
});
