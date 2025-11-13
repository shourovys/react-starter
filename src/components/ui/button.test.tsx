import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';
import { describe, expect, it, vi } from 'vitest';

describe('Button Component', () => {
  it('should render button with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('should render button with different variants', () => {
    render(
      <div>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    );

    expect(screen.getByText('Delete')).toHaveClass('bg-destructive');
    expect(screen.getByText('Outline')).toHaveClass('border');
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary');
    expect(screen.getByText('Ghost')).toHaveClass('hover:bg-accent');
    expect(screen.getByText('Link')).toHaveClass('underline-offset-4');
  });

  it('should render button with different sizes', () => {
    render(
      <div>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </div>
    );

    expect(screen.getByText('Small')).toHaveClass('h-8');
    expect(screen.getByText('Default')).toHaveClass('h-9');
    expect(screen.getByText('Large')).toHaveClass('h-10');
    expect(screen.getByText('Icon')).toHaveClass('h-9', 'w-9');
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    render(
      <Button ref={ref} data-testid="button-ref">
        Ref Button
      </Button>
    );

    expect(ref.current).toBe(screen.getByTestId('button-ref'));
  });
});
