import { apiClient } from '../../../services';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/auth.types';

const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/api/auth/login',
      credentials
    );
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      '/api/auth/register',
      userData
    );
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    // Optional: call backend logout endpoint
    try {
      await apiClient.post('/api/auth/logout');
    } catch {
      // Handle logout error silently - no logging needed
    }
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<AuthResponse['user']>('/api/auth/me');
    return response.data;
  },

  async refreshToken(): Promise<string> {
    const response = await apiClient.post<{ token: string }>(
      '/api/auth/refresh'
    );
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return token;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },
};

export default authService;
