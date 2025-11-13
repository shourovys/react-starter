import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import pages
import { AboutPage, DashboardPage, HomePage, NotFoundPage } from '@/pages';

export function AppRouter() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
