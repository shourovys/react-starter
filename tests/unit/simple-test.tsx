import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Simple TSX Test', () => {
  it('should render basic component', () => {
    const { container } = render(<div>Hello World</div>);
    expect(container).toBeInTheDocument();
    expect(container.textContent).toBe('Hello World');
  });

  it('should render button', () => {
    const { container } = render(<button>Click me</button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toBe('Click me');
  });
});
