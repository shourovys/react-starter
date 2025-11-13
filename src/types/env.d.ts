/// <reference types="vite/client" />

// Environment variable types for Vite
interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}
