import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
    typecheck: {
      enabled: false,
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
