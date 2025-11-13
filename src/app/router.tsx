import { ErrorBoundary } from '@/components/error-boundary';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import pages
import AboutPage from '@/pages/about-page';
import DashboardPage from '@/pages/dashboard-page';
import HomePage from '@/pages/home-page';
import NotFoundPage from '@/pages/not-found-page';

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

        <Toaster />
      </div>
    </BrowserRouter>
  );
}
