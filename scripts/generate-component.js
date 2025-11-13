#!/usr/bin/env node

/**
 * Component Generator Script
 *
 * Generates new components following the project's conventions.
 * Supports UI components, layout components, and common components.
 *
 * Usage:
 *   node scripts/generate-component.js <type> <name>
 *
 * Examples:
 *   node scripts/generate-component.js ui Button
 *   node scripts/generate-component.js layout Header
 *   node scripts/generate-component.js common LoadingSpinner
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [type, name] = args;

if (!type || !name) {
  console.error('Usage: node scripts/generate-component.js <type> <name>');
  console.error('Types: ui, layout, common');
  console.error('Examples:');
  console.error('  node scripts/generate-component.js ui Button');
  console.error('  node scripts/generate-component.js layout Header');
  console.error('  node scripts/generate-component.js common LoadingSpinner');
  process.exit(1);
}

const validTypes = ['ui', 'layout', 'common'];
if (!validTypes.includes(type)) {
  console.error(
    `Invalid type: ${type}. Must be one of: ${validTypes.join(', ')}`
  );
  process.exit(1);
}

// Convert name to PascalCase
const componentName = name.charAt(0).toUpperCase() + name.slice(1);
const fileName = name.charAt(0).toLowerCase() + name.slice(1);

const componentDir = path.join(
  __dirname,
  '..',
  'src',
  'components',
  type,
  componentName
);
const componentPath = path.join(componentDir, `${componentName}.tsx`);
const testPath = path.join(componentDir, `${componentName}.test.tsx`);
const indexPath = path.join(componentDir, 'index.ts');

// Create component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Generate component file
const componentContent = `import { cn } from '@/lib/utils';

interface ${componentName}Props {
  className?: string;
}

export function ${componentName}({ className }: ${componentName}Props) {
  return (
    <div className={cn('${fileName}', className)}>
      ${componentName} Component
    </div>
  );
}
`;

// Generate test file
const testContent = `import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName} Component')).toBeTruthy();
  });

  it('applies custom className', () => {
    render(<${componentName} className="custom-class" />);
    const element = screen.getByText('${componentName} Component');
    expect(element.classList.contains('custom-class')).toBe(true);
  });
});
`;

// Generate index file
const indexContent = `export { ${componentName} } from './${componentName}';
`;

// Write files
fs.writeFileSync(componentPath, componentContent);
fs.writeFileSync(testPath, testContent);
fs.writeFileSync(indexPath, indexContent);

console.log(`✅ Component ${componentName} created successfully!`);
console.log(`📁 Directory: src/components/${type}/${componentName}`);
console.log(`📄 Files created:`);
console.log(`   - ${componentName}.tsx`);
console.log(`   - ${componentName}.test.tsx`);
console.log(`   - index.ts`);
console.log('');
console.log('Next steps:');
console.log('1. Implement the component logic');
console.log('2. Update the component props interface if needed');
console.log('3. Add the component to the appropriate barrel export');
console.log('4. Run tests: npm test');
