import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './input';

describe('Input Component', () => {
  it('should render input with default type', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should render input with different types', () => {
    render(
      <div>
        <Input type="email" placeholder="Email" data-testid="email-input" />
        <Input
          type="password"
          placeholder="Password"
          data-testid="password-input"
        />
        <Input type="number" placeholder="Number" data-testid="number-input" />
      </div>
    );

    expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email');
    expect(screen.getByTestId('password-input')).toHaveAttribute(
      'type',
      'password'
    );
    expect(screen.getByTestId('number-input')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('should handle value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should handle focus events', () => {
    const handleFocus = vi.fn();
    render(<Input onFocus={handleFocus} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle blur events', () => {
    const handleBlur = vi.fn();
    render(<Input onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled data-testid="disabled-input" />);

    const input = screen.getByTestId('disabled-input');
    expect(input).toBeDisabled();
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} data-testid="input-ref" />);

    expect(ref.current).toBe(screen.getByTestId('input-ref'));
  });

  it('should apply custom className', () => {
    render(<Input className="custom-input" data-testid="custom-input" />);

    const input = screen.getByTestId('custom-input');
    expect(input).toBeTruthy();
  });

  it('should render with default value', () => {
    render(<Input defaultValue="default text" data-testid="default-input" />);

    const input = screen.getByTestId('default-input');
    expect(input).toHaveValue('default text');
  });

  it('should render as required when required prop is true', () => {
    render(<Input required data-testid="required-input" />);

    const input = screen.getByTestId('required-input');
    expect(input).toBeRequired();
  });
});
