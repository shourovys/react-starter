// Re-export centralized user store for backward compatibility
export { useUserStore } from '@/store/slices/user-slice';
export { default } from '@/store/slices/user-slice';

// Re-export types for convenience
export type { User, UserState } from '@/features/user/types/user.types';
