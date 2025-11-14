#!/usr/bin/env node

/**
 * Bundle Analysis Script
 *
 * Analyzes the production bundle and provides insights about:
 * - Bundle size breakdown
 * - Largest dependencies
 * - Code splitting effectiveness
 * - Potential optimization opportunities
 *
 * Usage:
 *   node scripts/analyze-bundle.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log('🔍 Analyzing production bundle...\n');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const files = fs.readdirSync(distDir);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));

  console.log('📦 Bundle Files:');
  console.log('================');

  let totalJsSize = 0;
  let totalCssSize = 0;

  // Analyze JavaScript files
  console.log('\n📄 JavaScript Files:');
  jsFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalJsSize += size;
    console.log(`  ${file}: ${formatBytes(size)}`);
  });

  // Analyze CSS files
  console.log('\n🎨 CSS Files:');
  cssFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalCssSize += size;
    console.log(`  ${file}: ${formatBytes(size)}`);
  });

  console.log('\n📊 Summary:');
  console.log('============');
  console.log(`Total JavaScript: ${formatBytes(totalJsSize)}`);
  console.log(`Total CSS: ${formatBytes(totalCssSize)}`);
  console.log(`Total Bundle: ${formatBytes(totalJsSize + totalCssSize)}`);

  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('===================');

  if (totalJsSize > 500 * 1024) {
    // 500KB
    console.log('⚠️  JavaScript bundle is quite large. Consider:');
    console.log('   - Code splitting for routes');
    console.log('   - Tree shaking unused dependencies');
    console.log('   - Lazy loading components');
  } else {
    console.log('✅ JavaScript bundle size looks good');
  }

  if (totalCssSize > 100 * 1024) {
    // 100KB
    console.log('⚠️  CSS bundle is large. Consider:');
    console.log('   - Removing unused CSS');
    console.log('   - Using CSS-in-JS for component-scoped styles');
  } else {
    console.log('✅ CSS bundle size looks good');
  }

  if (jsFiles.length > 3) {
    console.log('✅ Code splitting is working well');
  } else {
    console.log('ℹ️  Consider implementing more code splitting');
  }

  console.log('\n🔧 To analyze dependencies in detail, run:');
  console.log('   npx vite-bundle-analyzer dist');
}

analyzeBundle();
