import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      // React plugin with SWC for faster builds
      react(),

      // TypeScript path mapping support
      viteTsconfigPaths(),

      // TypeScript checking in Vite during development and build
      checker({
        typescript: {
          // Enable type checking in development
          tsconfigPath: 'tsconfig.json',
        },
        // TypeScript checking only - ESLint disabled due to compatibility issues
        // eslint integration can be added back when vite-plugin-checker supports ESLint 9+
      }),
    ],

    // Build configuration
    build: {
      // Target for transpilation
      target: env.VITE_BUILD_TARGET || 'es2020',

      // Source maps
      sourcemap: env.VITE_SOURCEMAP !== 'false',

      // Minification
      minify: 'esbuild',

      // Rollup options
      rollupOptions: {
        output: {
          // Code splitting optimization
          manualChunks: {
            // Vendor chunk
            vendor: ['react', 'react-dom'],
          },

          // File names with hashes
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },

      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
    },

    // Development server configuration
    server: {
      // Port configuration
      port: 3000,
      host: true,

      // Open browser automatically
      open: false,

      // CORS enabled
      cors: true,

      // Proxy configuration for API
      proxy: {
        // API proxy for development
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        // WebSocket proxy (for hot reload in some cases)
        '/ws': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          ws: true,
          changeOrigin: true,
        },
      },

      // HMR configuration for better performance
      hmr: {
        overlay: true,
        port: 24678,
      },
    },

    // Preview server configuration (for production builds)
    preview: {
      port: 3000,
      host: true,
    },

    // Path resolution
    resolve: {
      alias: {
        // TypeScript path mapping - these are handled by vite-tsconfig-paths
        // but we can add custom aliases here if needed
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@lib': resolve(__dirname, './src/lib'),
        '@types': resolve(__dirname, './src/types'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@services': resolve(__dirname, './src/services'),
      },
    },

    // CSS configuration
    css: {
      // PostCSS configuration
      devSourcemap: true,

      // CSS modules configuration
      modules: {
        localsConvention: 'camelCase',
      },

      // Preprocessor options
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },

    // Optimization
    optimizeDeps: {
      // Pre-bundle dependencies
      include: ['react', 'react-dom', 'react-router-dom'],
      // Exclude specific dependencies
      exclude: [
        // Add any problematic dependencies here
      ],
    },

    // Environment variables
    define: {
      // Define build-time environment variables
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // Worker configuration
    worker: {
      format: 'es',
    },

    // JSON configuration
    json: {
      // Enable JSON imports
      namedExports: true,
    },

    // Asset configuration
    assetsInclude: ['**/*.md'],
  };
});
