# User Feature

This feature module handles all user-related functionality including user profiles, user management, and user data operations.

## Structure

```
src/features/user/
├── components/     # User-specific UI components
├── hooks/         # User-specific hooks
├── services/      # User API services
├── store/         # User state management
├── types/         # User-related TypeScript types
├── utils/         # User utility functions
├── __tests__/     # Feature integration tests
├── index.ts       # Public API exports
└── README.md      # This file
```

## Public API

```typescript
import { useUser, UserProfile, userService } from '@/features/user';

// Hook for accessing current user data
const { user, isLoading, updateProfile } = useUser();

// Component for user profile display
<UserProfile userId={userId} />

// Service for user API calls
await userService.updateProfile(userData);
```

## Components

- `UserProfile` - User profile display component
- `UserAvatar` - User avatar component
- `UserList` - User list component
- `UserForm` - User creation/editing form

## Hooks

- `useUser` - Current user data hook
- `useUsers` - Multiple users data hook
- `useUserActions` - User action hooks

## Services

- `userService` - User API client
- `profileService` - User profile management
- `userManagementService` - Admin user management

## Store

Uses Zustand for state management with the following slices:

- User state (current user, profile data)
- Users state (user lists, search, filters)
- UI state (loading, errors, modals)

## Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  preferences: UserPreferences;
}
```

## Testing

Run feature tests:

```bash
npm test src/features/user/__tests__/
```

## Usage Examples

### User Profile

```tsx
import { useUser, UserProfile } from '@/features/user';

function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <UserProfile user={user} />
      <EditProfileButton />
    </div>
  );
}
```

### User Management

```tsx
import { useUsers, UserList } from '@/features/user';

function UserManagementPage() {
  const { users, searchUsers, deleteUser } = useUsers();

  return (
    <div>
      <UserSearch onSearch={searchUsers} />
      <UserList users={users} onDelete={deleteUser} onEdit={handleEdit} />
    </div>
  );
}
```
