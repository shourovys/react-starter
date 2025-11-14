// Re-export centralized auth store for backward compatibility
export { useAuthStore } from '@/store/slices/auth-slice';
export { default } from '@/store/slices/auth-slice';

// Re-export types for convenience
export type {
  AuthState,
  User,
  LoginRequest,
  RegisterRequest,
} from '@/features/auth/types/auth.types';
