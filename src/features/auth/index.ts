// Auth Feature Public API
// This file exports the public interface for the auth feature module

export { default as authService } from './services/auth-service';
export { useAuthStore } from './store/auth-store';
export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  AuthState,
} from './types/auth.types';

export const authFeatureVersion = '1.0.0';
