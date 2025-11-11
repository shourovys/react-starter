# Deployment Guide

This document provides comprehensive instructions for deploying the React TypeScript Starter application to various hosting platforms and environments.

## 📚 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Platform-Specific Deployments](#platform-specific-deployments)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
  - [Docker](#docker)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [Domain Configuration](#domain-configuration)
- [SSL/HTTPS](#sslhttps)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Logging](#monitoring-and-logging)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before deploying, ensure you have:

- **Built Application**: Run `yarn build` successfully
- **Environment Variables**: Configured for your target environment
- **Domain Name** (if using custom domain)
- **Platform Account**: Set up with the chosen hosting provider

### Required Checks

```bash
# Verify build works
yarn build

# Verify linting passes
yarn lint

# Verify type checking passes
yarn type-check

# Run tests
yarn test
```

## 🌍 Environment Configuration

### Environment Files

Create environment-specific configuration files:

```bash
# .env.development
VITE_API_URL=https://api-dev.example.com
VITE_APP_NAME=React TypeScript Starter (Development)
VITE_ENVIRONMENT=development
VITE_DEBUG=true

# .env.staging
VITE_API_URL=https://api-staging.example.com
VITE_APP_NAME=React TypeScript Starter (Staging)
VITE_ENVIRONMENT=staging
VITE_DEBUG=false

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_NAME=React TypeScript Starter
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

### Build Configuration

```bash
# Development build
yarn build:dev

# Staging build
yarn build:staging

# Production build
yarn build:prod
```

## 🚀 Platform-Specific Deployments

### Vercel

Vercel is the recommended platform for React applications due to its excellent performance and developer experience.

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Method 2: GitHub Integration

1. **Connect Repository**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**

   - Framework Preset: `Vite`
   - Build Command: `yarn build`
   - Output Directory: `dist`
   - Install Command: `yarn install`

3. **Environment Variables**
   ```bash
   VITE_API_URL=https://api.example.com
   VITE_APP_NAME=React TypeScript Starter
   VITE_ENVIRONMENT=production
   ```

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Vercel CLI Commands

```bash
# Deploy preview
vercel --prod

# Deploy to specific environment
vercel --prod --token=<token>

# List deployments
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Remove deployment
vercel rm <deployment-url>
```

### Netlify

Netlify offers excellent static site hosting with continuous deployment.

#### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Method 2: GitHub Integration

1. **Connect Repository**

   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**

   - Build command: `yarn build`
   - Publish directory: `dist`
   - Node version: `20`

3. **Environment Variables**
   Add in Netlify dashboard under Site Settings > Environment Variables

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "yarn build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  YARN_FLAGS = "--frozen-lockfile"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[headers]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### GitHub Pages

GitHub Pages provides free hosting for static sites directly from the repository.

#### Setup Steps

1. **Enable GitHub Pages**

   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"

2. **Create GitHub Actions Workflow**

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build
        run: yarn build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_APP_NAME: React TypeScript Starter
          VITE_BASE_URL: ${{ github.ref == 'refs/heads/main' && '/react-typescript-starter' || '' }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Update Vite Config**

Update `vite.config.ts` for GitHub Pages:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  const base =
    command === 'build' && mode === 'production'
      ? '/react-typescript-starter/'
      : '/';

  return {
    plugins: [react(), tsconfigPaths()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },
  };
});
```

### AWS S3 + CloudFront

For enterprise applications, AWS provides scalable hosting with global distribution.

#### Prerequisites

- AWS Account
- AWS CLI configured
- Domain name (optional)

#### Deployment Steps

1. **Create S3 Bucket**

```bash
# Create bucket
aws s3 mb s3://your-app-name-bucket

# Configure bucket for static website hosting
aws s3 website s3://your-app-name-bucket \
  --index-document index.html \
  --error-document index.html
```

2. **Build and Upload**

```bash
# Build application
yarn build

# Upload to S3
aws s3 sync dist/ s3://your-app-name-bucket --delete

# Invalidate CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation \
  --distribution-id YOUR-DISTRIBUTION-ID \
  --paths "/*"
```

3. **CloudFront Distribution Configuration**

Create CloudFront distribution JSON:

```json
{
  "CallerReference": "react-typescript-starter-2023",
  "DefaultRootObject": "index.html",
  "Origins": [
    {
      "Id": "S3-your-app-name-bucket",
      "DomainName": "your-app-name-bucket.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }
  ],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-app-name-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "managed-caching-optimized",
    "OriginRequestPolicyId": "managed-s3-origin"
  },
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html",
      "ErrorCachingMinTTL": 300
    }
  ]
}
```

### Docker

For containerized deployments or orchestration platforms.

#### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

#### Docker Commands

```bash
# Build image
docker build -t react-typescript-starter .

# Run container
docker run -p 80:80 react-typescript-starter

# Tag and push to registry
docker tag react-typescript-starter your-registry/react-typescript-starter:latest
docker push your-registry/react-typescript-starter:latest
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '80:80'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost/']
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Add nginx proxy
  nginx:
    image: nginx:alpine
    ports:
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The included CI/CD pipeline provides:

- **Continuous Integration**: Automated testing and validation
- **Multi-environment Deployment**: Development, staging, production
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Quality Gates**: Linting, testing, and security checks

#### Workflow Configuration

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  # Quality checks
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn type-check
      - run: yarn test:coverage

  # Build and deploy
  deploy:
    needs: quality
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - run: yarn build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_APP_NAME: React TypeScript Starter
      - name: Deploy to Vercel
        run: vercel --prod --token=$VERCEL_TOKEN --org-id=$VERCEL_ORG_ID --project-id=$VERCEL_PROJECT_ID
```

## 🔐 Environment Variables

### Required Variables

| Variable           | Description      | Example                    |
| ------------------ | ---------------- | -------------------------- |
| `VITE_API_URL`     | Backend API URL  | `https://api.example.com`  |
| `VITE_APP_NAME`    | Application name | `React TypeScript Starter` |
| `VITE_ENVIRONMENT` | Environment type | `production`               |
| `VITE_DEBUG`       | Debug mode       | `false`                    |

### Platform-Specific Configuration

#### Vercel

1. Go to Project Settings > Environment Variables
2. Add variables with their values
3. Select appropriate environments (Production, Preview, Development)

#### Netlify

1. Go to Site Settings > Environment Variables
2. Add variables for each environment
3. Redeploy after changes

#### AWS S3

1. Use AWS Systems Manager Parameter Store
2. Or include in build process:
   ```bash
   VITE_API_URL=https://api.example.com yarn build
   ```

## 🌐 Domain Configuration

### Custom Domain Setup

#### Vercel

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

#### Netlify

1. Go to Domain Settings > Add custom domain
2. Configure DNS records:

   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

#### GitHub Pages

1. Add `CNAME` file to `public/` directory:
   ```
   yourdomain.com
   ```
2. Configure DNS records:

   ```
   Type: CNAME
   Name: www
   Value: your-username.github.io

   Type: A
   Name: @
   Value: 185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

### DNS Configuration

```bash
# Check DNS propagation
dig yourdomain.com

# Verify CNAME record
nslookup www.yourdomain.com
```

## 🔒 SSL/HTTPS

Most platforms provide automatic SSL certificates:

- **Vercel**: Automatic Let's Encrypt certificates
- **Netlify**: Automatic SSL with automatic renewals
- **GitHub Pages**: Automatic SSL for custom domains
- **AWS**: Use AWS Certificate Manager

### Manual SSL Setup (if needed)

```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Security Headers

Ensure these headers are configured:

```javascript
// Security headers configuration
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';",
};
```

## ⚡ Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Source maps for production monitoring
    sourcemap: false,
    // Asset optimization
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
});
```

### Caching Strategy

```javascript
// Service worker for caching
const CACHE_NAME = 'react-typescript-starter-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
];

// Cache strategy
const cacheFirst = async request => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  if (networkResponse.status === 200) {
    const responseClone = networkResponse.clone();
    caches.open(CACHE_NAME).then(cache => {
      cache.put(request, responseClone);
    });
  }

  return networkResponse;
};
```

### CDN Configuration

```yaml
# CloudFront distribution configuration
Origins:
  - DomainName: your-app-bucket.s3.amazonaws.com
    OriginPath: ''
    CustomHeaders:
      - HeaderName: 'Cache-Control'
        HeaderValue: 'public, max-age=31536000, immutable'

CacheBehaviors:
  - PathPattern: '/assets/*'
    CachePolicyId: 'managed-caching-optimized'
    TTL: 31536000 # 1 year
```

## 📊 Monitoring and Logging

### Performance Monitoring

#### Google Analytics

```html
<!-- Add to index.html -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Web Vitals Monitoring

```typescript
// utils/monitoring.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Monitoring

#### Sentry Integration

```bash
# Install Sentry
yarn add @sentry/react @sentry/tracing
```

```typescript
// utils/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_ENVIRONMENT,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export default Sentry;
```

#### Error Boundary

```typescript
// components/ErrorBoundary.tsx
import React from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.props.children) {
      return this.props.children;
    }

    return (
      <div>
        <h1>Something went wrong.</h1>
        <button onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    );
  }
}
```

## 🛠️ Troubleshooting

### Common Deployment Issues

#### Build Failures

```bash
# Clear build cache
rm -rf dist/
rm -rf node_modules/
yarn install
yarn build

# Check for TypeScript errors
yarn type-check

# Check for linting errors
yarn lint
```

#### Environment Variables Not Loading

```bash
# Ensure variables start with VITE_
# Check variable names in build logs
# Verify environment variable is set in platform
```

#### Routing Issues (404 errors)

```nginx
# Ensure server redirects all routes to index.html
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Performance Issues

```bash
# Analyze bundle size
yarn build --analyze

# Check for large dependencies
npx webpack-bundle-analyzer dist/static/js/*.js
```

### Platform-Specific Issues

#### Vercel

- Check build logs in dashboard
- Verify `vercel.json` configuration
- Ensure environment variables are set

#### Netlify

- Check deploy logs
- Verify `_redirects` file for SPA routing
- Check build command and publish directory

#### GitHub Pages

- Ensure Actions workflow is working
- Check repository settings for Pages configuration
- Verify CNAME file (if using custom domain)

### Debug Commands

```bash
# Check build output
ls -la dist/

# Test locally
yarn preview

# Check network requests
# Open browser DevTools > Network tab

# Performance analysis
# Chrome DevTools > Lighthouse
```

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review the platform's documentation
3. Search existing issues in the repository
4. Create a new issue with deployment details
5. Contact the development team for enterprise support

---

**🎉 Your React TypeScript Starter is now deployed and ready for users!**
