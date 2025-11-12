import { ErrorBoundary } from '@/components/error-boundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <header className="border-b">
          <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold">React TypeScript Starter</h1>
          </div>
        </header>

        <main className="flex-1">
          <div className="container mx-auto py-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
              <p className="text-gray-600">
                This is the simplified version of the app for testing.
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t">
          <div className="container mx-auto py-4">
            <p className="text-sm text-gray-500">
              © 2025 React TypeScript Starter
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
