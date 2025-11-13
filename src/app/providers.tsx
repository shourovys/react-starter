import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

export function Providers({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
}: ProvidersProps) {
  // These props are for future use - placeholder for global providers
  void defaultTheme;
  void storageKey;

  return <>{children}</>;
}

export default Providers;
