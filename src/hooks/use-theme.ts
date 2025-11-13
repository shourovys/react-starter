import * as React from 'react';
import { ThemeProviderContext } from '@/components/common/ThemeProvider/ThemeProvider';

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
