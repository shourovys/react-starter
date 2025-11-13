import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    // Basic smoke test - if this renders without throwing, we're good
    expect(() => {
      render(<App />);
    }).not.toThrow();

    // Verify the document has content
    expect(document.body).toBeTruthy();
  });
});
