// User Feature Public API
// This file exports the public interface for the user feature module

export { default as userService } from './services/user-service';
export { useUserStore } from './store/user-store';
export type { User, CreateUserRequest, UserState } from './types/user.types';

export const userFeatureVersion = '1.0.0';
