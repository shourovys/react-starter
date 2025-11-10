/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_DEBUG: string;
  readonly VITE_MOCK_API: string;
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend the Window interface for environment variables
declare global {
  interface Window {
    ENV?: ImportMetaEnv;
  }
}

export {};
