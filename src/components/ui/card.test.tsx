import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';
import { describe, expect, it } from 'vitest';

describe('Card Components', () => {
  it('should render card with all parts', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <button>Footer Button</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeTruthy();
    expect(screen.getByText('Card Description')).toBeTruthy();
    expect(screen.getByText('Card Content')).toBeTruthy();
    expect(screen.getByText('Footer Button')).toBeTruthy();
  });

  it('should render card header independently', () => {
    render(
      <CardHeader>
        <CardTitle>Independent Header</CardTitle>
      </CardHeader>
    );

    expect(screen.getByText('Independent Header')).toBeTruthy();
  });

  it('should render card content independently', () => {
    render(<CardContent>Independent Content</CardContent>);

    expect(screen.getByText('Independent Content')).toBeTruthy();
  });

  it('should render card footer independently', () => {
    render(<CardFooter>Independent Footer</CardFooter>);

    expect(screen.getByText('Independent Footer')).toBeTruthy();
  });

  it('should render card title independently', () => {
    render(<CardTitle>Independent Title</CardTitle>);

    expect(screen.getByText('Independent Title')).toBeTruthy();
  });

  it('should render card description independently', () => {
    render(<CardDescription>Independent Description</CardDescription>);

    expect(screen.getByText('Independent Description')).toBeTruthy();
  });

  it('should have proper semantic structure', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle data-testid="card-title">Test Title</CardTitle>
          <CardDescription data-testid="card-description">
            Test Description
          </CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">
          <p>Test Content</p>
        </CardContent>
        <CardFooter data-testid="card-footer">
          <button>Test Footer</button>
        </CardFooter>
      </Card>
    );

    const card = screen.getByTestId('card');
    const header = screen.getByTestId('card-header');
    const title = screen.getByTestId('card-title');
    const description = screen.getByTestId('card-description');
    const content = screen.getByTestId('card-content');
    const footer = screen.getByTestId('card-footer');

    expect(card).toBeTruthy();
    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(content).toBeTruthy();
    expect(footer).toBeTruthy();
  });
});
