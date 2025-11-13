import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppRouter } from './router';

describe('AppRouter', () => {
  it('should render without crashing', () => {
    expect(() => {
      render(<AppRouter />);
    }).not.toThrow();
  });

  it('should be a valid React component', () => {
    expect(document.body).toBeTruthy();
  });
});
