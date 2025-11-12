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
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
    ],
    exclude: [
      'node_modules/',
      'dist/',
      'tests/e2e/**',
      'tests/performance/**',
      'tests/contracts/**',
      'tests/accessibility/**',
      'tests/unit/theme-toggle.test.tsx',
      'tests/unit/accessibility.test.tsx',
      'tests/integration/theme-integration.test.tsx',
      'tests/unit/user-list.test.tsx',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
