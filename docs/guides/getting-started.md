# Getting Started Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gaming
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Development Workflow

### 1. Creating a New Feature

1. **Create the feature directory structure**

   ```bash
   mkdir -p src/features/my-feature/{components,hooks,services,store,types,utils,__tests__}
   ```

2. **Create the feature index file**

   ```typescript
   // src/features/my-feature/index.ts
   export { default as MyFeatureComponent } from './components/MyFeatureComponent';
   export { useMyFeature } from './hooks/useMyFeature';
   export { myFeatureService } from './services/my-feature-service';
   export type { MyFeatureState } from './types/my-feature.types';

   export const myFeatureVersion = '1.0.0';
   ```

3. **Add feature integration tests**

   ```typescript
   // src/features/my-feature/__tests__/my-feature.test.ts
   import { describe, expect, it } from 'vitest';
   import { myFeatureVersion } from '../index';

   describe('My Feature Integration', () => {
     it('should export feature version', () => {
       expect(myFeatureVersion).toBe('1.0.0');
     });
   });
   ```

### 2. Creating a New Component

1. **Create component with co-located test**

   ```bash
   mkdir -p src/components/ui/MyComponent
   ```

2. **Component structure**

   ```typescript
   // src/components/ui/MyComponent/MyComponent.tsx
   import { cn } from '@/lib/utils';

   interface MyComponentProps {
     className?: string;
   }

   export function MyComponent({ className }: MyComponentProps) {
     return (
       <div className={cn('my-component', className)}>
         My Component
       </div>
     );
   }
   ```

3. **Co-located test**

   ```typescript
   // src/components/ui/MyComponent/MyComponent.test.tsx
   import { render, screen } from '@testing-library/react';
   import { describe, expect, it } from 'vitest';
   import { MyComponent } from './MyComponent';

   describe('MyComponent', () => {
     it('renders correctly', () => {
       render(<MyComponent />);
       expect(screen.getByText('My Component')).toBeTruthy();
     });
   });
   ```

### 3. Adding State Management

1. **Create a state slice**

   ```typescript
   // src/store/slices/my-feature-slice.ts
   import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   interface MyFeatureState {
     data: string[];
     loading: boolean;
   }

   const initialState: MyFeatureState = {
     data: [],
     loading: false,
   };

   const myFeatureSlice = createSlice({
     name: 'myFeature',
     initialState,
     reducers: {
       setData: (state, action: PayloadAction<string[]>) => {
         state.data = action.payload;
       },
       setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
       },
     },
   });

   export const { setData, setLoading } = myFeatureSlice.actions;
   export default myFeatureSlice.reducer;
   ```

2. **Add to store configuration**

   ```typescript
   // src/store/index.ts
   import { configureStore } from '@reduxjs/toolkit';
   import myFeatureReducer from './slices/my-feature-slice';

   export const store = configureStore({
     reducer: {
       myFeature: myFeatureReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;
   ```

### 4. Adding API Integration

1. **Extend the API service**

   ```typescript
   // src/services/api/my-feature-api.ts
   import { apiClient } from './api-client';

   export const myFeatureApi = {
     async getData() {
       const response = await apiClient.get('/api/my-feature');
       return response.data;
     },

     async createData(data: unknown) {
       const response = await apiClient.post('/api/my-feature', data);
       return response.data;
     },
   };
   ```

2. **Update types**

   ```typescript
   // src/types/api.types.ts
   export interface MyFeatureData {
     id: string;
     name: string;
     createdAt: string;
   }

   export interface CreateMyFeatureRequest {
     name: string;
   }
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Code Quality

This project uses several tools to maintain code quality:

- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit quality checks
- **Commitlint**: Conventional commit message validation
- **Vitest**: Fast unit testing
- **Playwright**: E2E testing

## Path Aliases

The project uses path aliases for clean imports:

- `@/*` - Source directory
- `@app/*` - Application core
- `@assets/*` - Static assets
- `@components/*` - UI components
- `@features/*` - Feature modules
- `@hooks/*` - Custom hooks
- `@pages/*` - Page components
- `@services/*` - Service layer
- `@store/*` - State management
- `@types/*` - Type definitions
- `@utils/*` - Utility functions

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=React TypeScript Starter
VITE_BUILD_TARGET=es2020
VITE_SOURCEMAP=true
```

## Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Serve the dist directory**
   ```bash
   npm run preview
   ```

The application is ready for deployment to any static hosting service.
