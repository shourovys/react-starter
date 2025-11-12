/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig(configEnv =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        css: true,
        typecheck: {
          enabled: false,
        },
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
        },
        include: [
          'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
          'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        exclude: [
          'node_modules/',
          'dist/',
          'tests/e2e/**',
          'tests/performance/**',
          'tests/contracts/**',
          'tests/accessibility/**',
          '**/node_modules/**',
          '**/dist/**',
        ],
        testTimeout: 10000,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      define: {
        'import.meta.vitest': 'undefined',
      },
    })
  )
);
