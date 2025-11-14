import { render, screen } from '@testing-library/react';
import { Label } from './label';
import { describe, expect, it } from 'vitest';

describe('Label Component', () => {
  it('should render label with default styling', () => {
    render(<Label>Default Label</Label>);

    const label = screen.getByText('Default Label');
    expect(label).toBeTruthy();
  });

  it('should render label with custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>);

    const label = screen.getByText('Custom Label');
    expect(label).toBeTruthy();
  });

  it('should render label with htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Input Label</Label>);

    const label = screen.getByText('Input Label');
    expect(label).toBeTruthy();
  });

  it('should render label with id attribute', () => {
    render(<Label id="test-label">Label with ID</Label>);

    const label = screen.getByText('Label with ID');
    expect(label).toBeTruthy();
  });

  it('should render label with custom data attributes', () => {
    render(<Label data-testid="custom-label">Custom Label</Label>);

    const label = screen.getByTestId('custom-label');
    expect(label).toBeTruthy();
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    render(
      <Label ref={ref} data-testid="label-ref">
        Ref Label
      </Label>
    );

    const label = screen.getByTestId('label-ref');
    expect(ref.current).toBe(label);
  });

  it('should render with proper semantic structure', () => {
    render(
      <div>
        <Label htmlFor="test-input" data-testid="semantic-label">
          Semantic Label
        </Label>
        <input id="test-input" type="text" />
      </div>
    );

    const label = screen.getByTestId('semantic-label');
    const input = screen.getByText('Semantic Label');

    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('should render with custom styling variants', () => {
    render(
      <div>
        <Label className="text-sm">Small Label</Label>
        <Label className="text-lg">Large Label</Label>
        <Label className="font-bold">Bold Label</Label>
      </div>
    );

    expect(screen.getByText('Small Label')).toBeTruthy();
    expect(screen.getByText('Large Label')).toBeTruthy();
    expect(screen.getByText('Bold Label')).toBeTruthy();
  });

  it('should render with additional props', () => {
    render(
      <Label
        data-testid="additional-props"
        role="label"
        aria-required="true"
        tabIndex={0}
      >
        Additional Props Label
      </Label>
    );

    const label = screen.getByTestId('additional-props');
    expect(label).toBeTruthy();
  });

  it('should render with children', () => {
    render(
      <Label>
        <span>Child span</span>
        <strong>Child strong</strong>
      </Label>
    );

    expect(screen.getByText('Child span')).toBeTruthy();
    expect(screen.getByText('Child strong')).toBeTruthy();
  });
});
