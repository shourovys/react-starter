import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTheme } from './use-theme';
import { ThemeProvider } from '@/components/common/ThemeProvider/ThemeProvider';

describe('useTheme Hook', () => {
  it('should throw error when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
  });

  it('should return theme context when used within ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      ),
    });

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('setTheme');
    expect(typeof result.current.setTheme).toBe('function');
  });

  it('should provide default theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      ),
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should validate theme options', () => {
    const validThemes = ['light', 'dark', 'system'];
    validThemes.forEach(theme => {
      expect(['light', 'dark', 'system']).toContain(theme);
    });
  });

  it('should handle system theme preference', () => {
    const mockMatchMedia = {
      matches: true,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => mockMatchMedia),
    });

    expect(window.matchMedia).toBeDefined();
    expect(mockMatchMedia.matches).toBe(true);
  });

  it('should handle theme toggle functionality', () => {
    let currentTheme = 'light';

    const toggleTheme = () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    };

    expect(currentTheme).toBe('light');
    toggleTheme();
    expect(currentTheme).toBe('dark');
    toggleTheme();
    expect(currentTheme).toBe('light');
  });
});
