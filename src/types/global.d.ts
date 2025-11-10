// Global type definitions for the React TypeScript boilerplate

// Global utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

// Common React types
export type ComponentProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

export type HookResult<T> = T extends () => infer R ? R : never;

export type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

// API response types
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

// Performance monitoring types
export interface PerformanceMetrics {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'fps' | 'percent';
  timestamp: number;
}

// Accessibility types
export interface AccessibilityConfig {
  announceChanges: boolean;
  focusManagement: boolean;
  keyboardNavigation: boolean;
  highContrast: boolean;
}

// Testing types
export interface TestConfiguration {
  environment: 'jsdom' | 'node' | 'browser';
  coverage: {
    threshold: {
      global: number;
      branches: number;
      functions: number;
      lines: number;
      statements: number;
    };
  };
  setupFiles?: string[];
}

// Environment types
export type Environment = 'development' | 'staging' | 'production';

export interface BuildConfig {
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Global event types
export interface GlobalEventMap extends WindowEventMap {
  'app:error': CustomEvent<AppError>;
  'app:theme-change': CustomEvent<{ theme: Theme }>;
  'app:locale-change': CustomEvent<{ locale: string }>;
}

// Utility function types
export type EventHandler<T = Event> = (event: T) => void;

export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

export type ComponentType<P = Record<string, never>> = React.FC<P>;

// Re-export React types for convenience
export * from '@types/react';
export * from 'react';

export {};
