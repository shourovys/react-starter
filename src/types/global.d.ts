/// <reference types="vite/client" />

// Global type augmentations and utility types
// This file contains global type definitions that augment the standard library

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

export type ComponentType<P = Record<string, never>> = React.FC<P>;

// Event types for component props
export type ComponentEvent<T = Event> = T;
