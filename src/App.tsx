import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Import pages
import { AboutPage } from '@/features/about';
import { HomePage } from '@/features/home';
import { DashboardPage } from '@/features/dashboard';
import NotFoundPage from '@/app/NotFoundPage';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </main>

            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
