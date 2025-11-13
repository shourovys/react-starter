import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

const renderFooter = (props = {}) => {
  return render(
    <BrowserRouter>
      <Footer {...props} />
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  it('should render footer content', () => {
    renderFooter();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });

  it('should have proper semantic structure', () => {
    renderFooter();

    const footer = screen.getByTestId('app-footer');
    expect(footer).toBeTruthy();
    expect(footer.tagName).toBe('FOOTER');
  });
});
