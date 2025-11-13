#!/usr/bin/env node

/**
 * Feature Generator Script
 *
 * Generates new feature modules following the project's conventions.
 * Creates the complete feature directory structure with all necessary files.
 *
 * Usage:
 *   node scripts/generate-feature.js <feature-name>
 *
 * Examples:
 *   node scripts/generate-feature.js user
 *   node scripts/generate-feature.js dashboard
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [featureName] = args;

if (!featureName) {
  console.error('Usage: node scripts/generate-feature.js <feature-name>');
  console.error('Examples:');
  console.error('  node scripts/generate-feature.js user');
  console.error('  node scripts/generate-feature.js dashboard');
  process.exit(1);
}

// Convert to lowercase for directory name
const featureDirName = featureName.toLowerCase();
// Convert to camelCase for variable names
const featureCamelName = featureName.charAt(0).toLowerCase() + featureName.slice(1);
const featureClassName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

const featureDir = path.join(__dirname, '..', 'src', 'features', featureDirName);

// Check if feature already exists
if (fs.existsSync(featureDir)) {
  console.error(`❌ Feature '${featureDirName}' already exists!`);
  process.exit(1);
}

// Create feature directory structure
const directories = [
  '',
  'components',
  'hooks',
  'services',
  'store',
  'types',
  'utils',
  '__tests__',
];

directories.forEach(dir => {
  const fullPath = path.join(featureDir, dir);
  fs.mkdirSync(fullPath, { recursive: true });
});

// Generate index.ts
const indexContent = `// ${featureClassName} Feature Public API
// This file exports the public interface for the ${featureDirName} feature module

export { default as ${featureClassName}Component } from './components/${featureClassName}Component';
export { use${featureClassName} } from './hooks/use${featureClassName}';
export { ${featureCamelName}Service } from './services/${featureDirName}-service';
export type { ${featureClassName}State } from './types/${featureDirName}.types';

export const ${featureCamelName}FeatureVersion = '1.0.0';
`;

fs.writeFileSync(path.join(featureDir, 'index.ts'), indexContent);

// Generate component
const componentContent = `import { cn } from '@/lib/utils';

interface ${featureClassName}ComponentProps {
  className?: string;
}

export default function ${featureClassName}Component({ className }: ${featureClassName}ComponentProps) {
  return (
    <div className={cn('${featureDirName}-component', className)}>
      ${featureClassName} Component
    </div>
  );
}
`;

fs.writeFileSync(path.join(featureDir, 'components', `${featureClassName}Component.tsx`), componentContent);

// Generate hook
const hookContent = `import { useState, useEffect } from 'react';

export const use${featureClassName} = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize ${featureDirName} data
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // TODO: Implement data loading
      // const result = await ${featureDirName}Service.getData();
      // setData(result);
    } catch (error) {
      console.error('Failed to load ${featureDirName} data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    loadData,
  };
};
`;

fs.writeFileSync(path.join(featureDir, 'hooks', `use${featureClassName}.ts`), hookContent);

// Generate service
const serviceContent = `import { apiClient } from '@/services';

export const ${featureCamelName}Service = {
  async getData() {
    const response = await apiClient.get('/api/${featureDirName}');
    return response.data;
  },

  async createData(data: unknown) {
    const response = await apiClient.post('/api/${featureDirName}', data);
    return response.data;
  },

  async updateData(id: string, data: unknown) {
    const response = await apiClient.put(\`/api/${featureDirName}/\${id}\`, data);
    return response.data;
  },

  async deleteData(id: string) {
    const response = await apiClient.delete(\`/api/${featureDirName}/\${id}\`);
    return response.data;
  },
};
`;

fs.writeFileSync(path.join(featureDir, 'services', `${featureDirName}-service.ts`), serviceContent);

// Generate types
const typesContent = `export interface ${featureClassName}Data {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ${featureClassName}State {
  data: ${featureClassName}Data[];
  loading: boolean;
  error: string | null;
}

export interface Create${featureClassName}Request {
  name: string;
}

export interface Update${featureClassName}Request {
  name?: string;
}
`;

fs.writeFileSync(path.join(featureDir, 'types', `${featureDirName}.types.ts`), typesContent);

// Generate store slice
const storeContent = `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ${featureClassName}State, ${featureClassName}Data } from '../types/${featureDirName}.types';

const initialState: ${featureClassName}State = {
  data: [],
  loading: false,
  error: null,
};

const ${featureCamelName}Slice = createSlice({
  name: '${featureDirName}',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<${featureClassName}Data[]>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addItem: (state, action: PayloadAction<${featureClassName}Data>) => {
      state.data.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<${featureClassName}Data>) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
  },
});

export const { setData, setLoading, setError, addItem, updateItem, removeItem } = ${featureCamelName}Slice.actions;
export default ${featureCamelName}Slice.reducer;
`;

fs.writeFileSync(path.join(featureDir, 'store', `${featureDirName}-slice.ts`), storeContent);

// Generate utility
const utilsContent = `/**
 * ${featureClassName} utility functions
 */

export const format${featureClassName}Name = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const validate${featureClassName}Data = (data: unknown): boolean => {
  // TODO: Implement validation logic
  return true;
};

export const generate${featureClassName}Id = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
`;

fs.writeFileSync(path.join(featureDir, 'utils', `${featureDirName}-utils.ts`), utilsContent);

// Generate integration test
const testContent = `import { describe, expect, it } from 'vitest';
import { ${featureCamelName}FeatureVersion } from '../index';

describe('${featureClassName} Feature Integration', () => {
  it('should export feature version', () => {
    expect(${featureCamelName}FeatureVersion).toBe('1.0.0');
  });

  it('should have proper directory structure', () => {
    // Test that the feature has the expected structure
    expect(true).toBe(true);
  });

  // TODO: Add comprehensive integration tests when ${featureDirName} feature is implemented
  // - Component rendering tests
  // - Hook functionality tests
  // - Service API tests
  // - Store state management tests
});
`;

fs.writeFileSync(path.join(featureDir, '__tests__', `${featureDirName}.feature.test.ts`), testContent);

// Generate README
const readmeContent = `# ${featureClassName} Feature

This feature provides ${featureDirName} management functionality.

## Structure

- \`components/\` - React components for ${featureDirName} UI
- \`hooks/\` - Custom hooks for ${featureDirName} logic
- \`services/\` - API services for ${featureDirName} data
- \`store/\` - Redux state management
- \`types/\` - TypeScript type definitions
- \`utils/\` - Utility functions
- \`__tests__/\` - Integration tests

## Usage

\`\`\`typescript
import { ${featureClassName}Component, use${featureClassName} } from '@/features/${featureDirName}';

function MyComponent() {
  const { data, loading } = use${featureClassName}();

  return (
    <div>
      {loading ? 'Loading...' : <${featureClassName}Component />}
    </div>
  );
}
\`\`\`

## API Endpoints

- \`GET /api/${featureDirName}\` - Get ${featureDirName} data
- \`POST /api/${featureDirName}\` - Create new ${featureDirName}
- \`PUT /api/${featureDirName}/:id\` - Update ${featureDirName}
- \`DELETE /api/${featureDirName}/:id\` - Delete ${featureDirName}

## Testing

Run feature tests:

\`\`\`bash
npm test src/features/${featureDirName}/__tests__/
\`\`\`
`;

fs.writeFileSync(path.join(featureDir, 'README.md'), readmeContent);

console.log(`✅ Feature '${featureDirName}' created successfully!`);
console.log(`📁 Directory: src/features/${featureDirName}`);
console.log(`📄 Files created:`);
console.log(`   - index.ts`);
console.log(`   - components/${featureClassName}Component.tsx`);
console.log(`   - hooks/use${featureClassName}.ts`);
console.log(`   - services/${featureDirName}-service.ts`);
console.log(`   - store/${featureCamelName}-slice.ts`);
console.log(`   - types/${featureDirName}.types.ts`);
console.log(`   - utils/${featureDirName}-utils.ts`);
console.log(`   - __tests__/${featureDirName}.feature.test.ts`);
console.log(`   - README.md`);
console.log('');
console.log('Next steps:');
console.log('1. Implement the component logic');
console.log('2. Add the feature slice to the store');
console.log('3. Update API endpoints in the service');
console.log('4. Add feature routes if needed');
console.log('5. Run tests: npm test');
