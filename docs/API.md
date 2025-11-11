# API Documentation

This document provides comprehensive information about the API services, types, and interfaces used in the React TypeScript Starter project.

## 📚 Table of Contents

- [Services](#services)
  - [AuthService](#authservice)
  - [UserService](#userservice)
  - [APIClient](#apiclient)
- [Types](#types)
  - [User Types](#user-types)
  - [Auth Types](#auth-types)
  - [API Response Types](#api-response-types)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)

## 🏗️ Services

### AuthService

Handles all authentication-related API calls.

```typescript
class AuthService {
  // Login user with email and password
  async login(credentials: LoginCredentials): Promise<AuthResponse>;

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse>;

  // Logout current user
  async logout(): Promise<void>;

  // Refresh authentication token
  async refreshToken(): Promise<AuthResponse>;

  // Get current user profile
  async getCurrentUser(): Promise<User>;

  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<User>;
}
```

#### Methods

##### `login(credentials: LoginCredentials): Promise<AuthResponse>`

Authenticates a user with email and password.

**Parameters:**

- `credentials: LoginCredentials`
  - `email: string` - User's email address
  - `password: string` - User's password

**Returns:** `Promise<AuthResponse>`

- `user: User` - User object
- `token: string` - JWT authentication token
- `refreshToken: string` - Token for refreshing authentication

**Example:**

```typescript
const authService = new AuthService();

try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123',
  });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error('Login failed:', error);
}
```

##### `register(userData: RegisterData): Promise<AuthResponse>`

Creates a new user account.

**Parameters:**

- `userData: RegisterData`
  - `email: string` - User's email address
  - `password: string` - User's password
  - `firstName: string` - User's first name
  - `lastName: string` - User's last name

**Returns:** `Promise<AuthResponse>`

##### `logout(): Promise<void>`

Logs out the current user and invalidates the session.

##### `refreshToken(): Promise<AuthResponse>`

Refreshes the authentication token using the refresh token.

##### `getCurrentUser(): Promise<User>`

Retrieves the current user's profile information.

##### `updateProfile(data: UpdateProfileData): Promise<User>`

Updates the current user's profile information.

**Parameters:**

- `data: UpdateProfileData`
  - `firstName?: string` - First name
  - `lastName?: string` - Last name
  - `bio?: string` - User biography
  - `avatar?: string` - Avatar URL

### UserService

Handles user-related API operations.

```typescript
class UserService {
  // Get all users (with pagination)
  async getUsers(params?: UserListParams): Promise<PaginatedResponse<User>>;

  // Get user by ID
  async getUserById(id: string): Promise<User>;

  // Search users
  async searchUsers(query: string): Promise<User[]>;

  // Update user
  async updateUser(id: string, data: UpdateUserData): Promise<User>;

  // Delete user
  async deleteUser(id: string): Promise<void>;

  // Get user statistics
  async getUserStats(id: string): Promise<UserStats>;
}
```

#### Methods

##### `getUsers(params?: UserListParams): Promise<PaginatedResponse<User>>`

Retrieves a paginated list of users.

**Parameters:**

- `params?: UserListParams`
  - `page?: number` - Page number (default: 1)
  - `limit?: number` - Items per page (default: 10)
  - `sortBy?: string` - Sort field
  - `sortOrder?: 'asc' | 'desc'` - Sort order

**Returns:** `Promise<PaginatedResponse<User>>`

- `data: User[]` - Array of users
- `pagination: PaginationInfo` - Pagination metadata

##### `getUserById(id: string): Promise<User>`

Retrieves a specific user by their ID.

##### `searchUsers(query: string): Promise<User[]>`

Searches for users by name or email.

**Parameters:**

- `query: string` - Search query string

##### `updateUser(id: string, data: UpdateUserData): Promise<User>`

Updates user information.

**Parameters:**

- `id: string` - User ID
- `data: UpdateUserData` - Update data object

##### `deleteUser(id: string): Promise<void>`

Deletes a user account.

##### `getUserStats(id: string): Promise<UserStats>`

Retrieves user statistics and metrics.

### APIClient

Base HTTP client for making API requests.

```typescript
class APIClient {
  constructor(config: APIClientConfig);

  // GET request
  async get<T>(url: string, config?: RequestConfig): Promise<T>;

  // POST request
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;

  // PUT request
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;

  // PATCH request
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;

  // DELETE request
  async delete<T>(url: string, config?: RequestConfig): Promise<T>;

  // Set authentication token
  setAuthToken(token: string): void;

  // Remove authentication token
  removeAuthToken(): void;
}
```

#### Methods

##### HTTP Methods

All HTTP methods follow the same pattern:

**Parameters:**

- `url: string` - Request URL
- `data?: any` - Request body data (for POST, PUT, PATCH)
- `config?: RequestConfig` - Additional request configuration

**RequestConfig:**

```typescript
interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  retries?: number;
}
```

**Example:**

```typescript
const client = new APIClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// GET request
const users = await client.get<User[]>('/users');

// POST request
const newUser = await client.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com',
});

// With additional config
const user = await client.get<User>('/users/123', {
  headers: {
    'X-Custom-Header': 'value',
  },
  timeout: 5000,
});
```

## 📋 Types

### User Types

```typescript
// Base User interface
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: UserRole;
}

// User role enum
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

// User creation data
interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  bio?: string;
  avatar?: string;
  role?: UserRole;
}

// User update data
interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  role?: UserRole;
}

// User list parameters
interface UserListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  role?: UserRole;
  isActive?: boolean;
}

// User statistics
interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  usersByRole: Record<UserRole, number>;
  averageSessionDuration: number;
}
```

### Auth Types

```typescript
// Login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Register data
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: string;
}

// Authentication response
interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Token payload (JWT)
interface TokenPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  iat: number; // issued at
  exp: number; // expires at
}

// Profile update data
interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
}
```

### API Response Types

```typescript
// Standard API response wrapper
interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

// Paginated response
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}
```

## 🚨 Error Handling

### Error Types

```typescript
// API Error interface
interface APIError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
  timestamp: string;
}

// Common error codes
enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Resource errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',

  // Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
}
```

### Error Handling Patterns

#### Service Level Error Handling

```typescript
class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await this.client.post<AuthResponse>('/auth/login', credentials);
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      if (error.response?.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      throw new Error('Login failed. Please try again.');
    }
  }
}
```

#### Global Error Handler

```typescript
// Error boundary component
class APIErrorHandler {
  static handleError(error: any): APIError {
    if (error.response) {
      // Server responded with error status
      return {
        code: error.response.data.code || 'SERVER_ERROR',
        message: error.response.data.message || 'An error occurred',
        statusCode: error.response.status,
        details: error.response.data.details,
        timestamp: new Date().toISOString(),
      };
    }

    if (error.request) {
      // Request was made but no response
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    }

    // Something else happened
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      statusCode: 0,
      timestamp: new Date().toISOString(),
    };
  }
}
```

## 💡 Usage Examples

### Complete Authentication Flow

```typescript
import { AuthService, UserService } from '@/services';

class AuthManager {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async signUp(userData: RegisterData) {
    try {
      const response = await this.authService.register(userData);
      this.setAuthToken(response.token);
      return response.user;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async signIn(credentials: LoginCredentials) {
    try {
      const response = await this.authService.login(credentials);
      this.setAuthToken(response.token);
      return response.user;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async getCurrentUserProfile() {
    try {
      return await this.authService.getCurrentUser();
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  private setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  private handleAuthError(error: any) {
    if (error.status === 401) {
      this.clearAuthToken();
    }
  }

  private clearAuthToken() {
    localStorage.removeItem('authToken');
  }
}
```

### User Management

```typescript
import { UserService } from '@/services';

class UserManager {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsersList(params?: UserListParams) {
    try {
      const response = await this.userService.getUsers(params);
      return {
        users: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, data: UpdateUserData) {
    try {
      return await this.userService.updateUser(userId, data);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

  async searchUsers(query: string) {
    try {
      return await this.userService.searchUsers(query);
    } catch (error) {
      console.error('Failed to search users:', error);
      throw error;
    }
  }
}
```

## ⚙️ Configuration

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.development
VITE_API_URL=https://api-dev.example.com
VITE_API_VERSION=v1
VITE_API_TIMEOUT=10000

# .env.production
VITE_API_URL=https://api.example.com
VITE_API_VERSION=v1
VITE_API_TIMEOUT=10000
```

### Service Configuration

```typescript
// services/config.ts
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  version: import.meta.env.VITE_API_VERSION || 'v1',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// Initialize services
export const authService = new AuthService(API_CONFIG);
export const userService = new UserService(API_CONFIG);
```

### Service Factory

```typescript
// services/index.ts
import { authService } from './auth-service';
import { userService } from './user-service';
import { APIClient } from './api-client';
import { API_CONFIG } from './config';

export const apiClient = new APIClient(API_CONFIG);
export { authService, userService };

// Factory function for creating service instances
export const createService = <T>(
  ServiceClass: new (client: APIClient) => T
): T => {
  return new ServiceClass(apiClient);
};

// Usage
export const auth = createService(AuthService);
export const users = createService(UserService);
```

---

## 📝 Notes

- All API methods return promises and should be used with `async/await`
- Error handling should be implemented at the service level
- Authentication tokens are automatically included in requests when set
- The API client supports request/response interceptors for global handling
- All timestamps are in ISO 8601 format (UTC)
- Pagination is consistent across all list endpoints

## 🔗 Related Documentation

- [Architecture Guide](ARCHITECTURE.md) - System design and architecture
- [Testing Guide](TESTING.md) - Testing strategies and patterns
- [Deployment Guide](DEPLOYMENT.md) - Deployment procedures
- [Contributing Guide](../CONTRIBUTING.md) - Development guidelines
