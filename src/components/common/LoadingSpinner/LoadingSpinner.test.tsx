import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  FullPageLoading,
  InlineLoading,
  LoadingSpinner,
} from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('should render with default size (md)', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByLabelText('Loading');
    expect(spinner).toBeTruthy();
    expect(spinner.classList.contains('w-6')).toBe(true);
    expect(spinner.classList.contains('h-6')).toBe(true);
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByLabelText('Loading').classList.contains('w-4')).toBe(
      true
    );
    expect(screen.getByLabelText('Loading').classList.contains('h-4')).toBe(
      true
    );

    rerender(<LoadingSpinner size="md" />);
    expect(screen.getByLabelText('Loading').classList.contains('w-6')).toBe(
      true
    );
    expect(screen.getByLabelText('Loading').classList.contains('h-6')).toBe(
      true
    );

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByLabelText('Loading').classList.contains('w-8')).toBe(
      true
    );
    expect(screen.getByLabelText('Loading').classList.contains('h-8')).toBe(
      true
    );

    rerender(<LoadingSpinner size="xl" />);
    expect(screen.getByLabelText('Loading').classList.contains('w-12')).toBe(
      true
    );
    expect(screen.getByLabelText('Loading').classList.contains('h-12')).toBe(
      true
    );
  });

  it('should render with custom text', () => {
    render(<LoadingSpinner text="Please wait..." />);

    expect(screen.getByText('Please wait...')).toBeTruthy();
  });

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />);

    const container = screen.getByLabelText('Loading').parentElement;
    expect(container?.classList.contains('custom-class')).toBe(true);
  });

  it('should have correct animation classes', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByLabelText('Loading');
    expect(spinner.classList.contains('animate-spin')).toBe(true);
    expect(spinner.classList.contains('rounded-full')).toBe(true);
    expect(spinner.classList.contains('border-2')).toBe(true);
    expect(spinner.classList.contains('border-current')).toBe(true);
    expect(spinner.classList.contains('border-t-transparent')).toBe(true);
  });
});

describe('FullPageLoading Component', () => {
  it('should render full page loading with default text', () => {
    render(<FullPageLoading />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });

  it('should render full page loading with custom text', () => {
    render(<FullPageLoading text="Fetching data..." />);

    expect(screen.getByText('Fetching data...')).toBeTruthy();
  });

  it('should have full page container classes', () => {
    render(<FullPageLoading />);

    const container = document.querySelector('.min-h-screen');
    expect(container?.classList.contains('min-h-screen')).toBe(true);
    expect(container?.classList.contains('flex')).toBe(true);
    expect(container?.classList.contains('items-center')).toBe(true);
    expect(container?.classList.contains('justify-center')).toBe(true);
  });
});

describe('InlineLoading Component', () => {
  it('should render inline loading with default text', () => {
    render(<InlineLoading />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });

  it('should render inline loading with custom text', () => {
    render(<InlineLoading text="Saving..." />);

    expect(screen.getByText('Saving...')).toBeTruthy();
  });

  it('should have inline container classes', () => {
    render(<InlineLoading />);

    const container = document.querySelector('.p-4');
    expect(container?.classList.contains('flex')).toBe(true);
    expect(container?.classList.contains('items-center')).toBe(true);
    expect(container?.classList.contains('justify-center')).toBe(true);
    expect(container?.classList.contains('p-4')).toBe(true);
  });
});
