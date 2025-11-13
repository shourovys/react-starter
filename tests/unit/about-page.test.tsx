import AboutPage from '@/pages/about-page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('AboutPage Component', () => {
  it('should render about title', () => {
    render(<AboutPage />);

    const title = screen.getByText('About This Project');
    expect(title).toBeInTheDocument();
  });

  it('should render about content', () => {
    render(<AboutPage />);

    const content = screen.getByText('This project includes:');
    expect(content).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<AboutPage />);

    const description = screen.getByText(
      'A comprehensive React + TypeScript starter boilerplate'
    );
    expect(description).toBeInTheDocument();
  });

  it('should render project features list', () => {
    render(<AboutPage />);

    const reactFeature = screen.getByText('React 19 with TypeScript');
    expect(reactFeature).toBeInTheDocument();

    const tailwindFeature = screen.getByText(
      'Tailwind CSS with shadcn/ui components'
    );
    expect(tailwindFeature).toBeInTheDocument();
  });
});
