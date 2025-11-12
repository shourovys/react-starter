import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['./tests/setup.ts'], // Temporarily disabled for debugging
    css: true,
    typecheck: {
      enabled: false,
    },
    // Explicitly configure TypeScript for testing
    deps: {
      inline: [
        // Inline these packages to avoid compilation issues
        '@testing-library/react',
        '@testing-library/user-event',
        '@testing-library/jest-dom',
      ],
    },
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,tsx}',
    ],
    exclude: [
      'node_modules/',
      'dist/',
      'tests/e2e/**',
      'tests/performance/**',
      '**/node_modules/**',
      '**/dist/**',
    ],
    testTimeout: 10000,
    hookTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/**',
        '*.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'tailwind.config.js',
        'postcss.config.js',
        'eslint.config.mjs',
        'commitlint.config.js',
        '.lintstagedrc.json',
        '.prettierrc.json',
        '.editorconfig',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
