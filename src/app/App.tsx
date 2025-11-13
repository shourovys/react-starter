import { ThemeProvider } from '@/components/theme-provider';
import { AppRouter } from './router';

import '../App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
