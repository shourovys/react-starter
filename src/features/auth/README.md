# Auth Feature

This feature module handles all authentication-related functionality including login, logout, user session management, and authentication state.

## Structure

```
src/features/auth/
├── components/     # Auth-specific UI components
├── hooks/         # Auth-specific hooks
├── services/      # Authentication API services
├── store/         # Authentication state management
├── types/         # Auth-related TypeScript types
├── utils/         # Auth utility functions
├── __tests__/     # Feature integration tests
├── index.ts       # Public API exports
└── README.md      # This file
```

## Public API

```typescript
import { useAuth, LoginForm, authService } from '@/features/auth';

// Hook for accessing auth state
const { user, isAuthenticated, login, logout } = useAuth();

// Component for login UI
<LoginForm onSuccess={handleLoginSuccess} />

// Service for direct API calls
await authService.login(credentials);
```

## Components

- `LoginForm` - User login form component
- `LogoutButton` - Logout button component
- `AuthGuard` - Route protection component

## Hooks

- `useAuth` - Main auth state hook
- `useAuthUser` - User data hook
- `useAuthActions` - Auth action hooks

## Services

- `authService` - Authentication API client
- `tokenService` - JWT token management

## Store

Uses Zustand for state management with the following slices:

- Auth state (user, tokens, loading states)
- Auth actions (login, logout, refresh)

## Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

## Testing

Run feature tests:

```bash
npm test src/features/auth/__tests__/
```

## Usage Examples

### Basic Login Flow

```tsx
import { useAuth } from '@/features/auth';

function LoginPage() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async credentials => {
    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (err) {
      // Handle error
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} loading={isLoading} error={error} />
  );
}
```

### Route Protection

```tsx
import { AuthGuard } from '@/features/auth';

function ProtectedRoute() {
  return (
    <AuthGuard fallback={<LoginPage />}>
      <Dashboard />
    </AuthGuard>
  );
}
```
