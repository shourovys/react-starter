# React TypeScript Starter - Modern Boilerplate

[![CI](https://github.com/your-org/react-typescript-starter/workflows/CI/badge.svg)](https://github.com/your-org/react-typescript-starter/actions)
[![codecov](https://codecov.io/gh/your-org/react-typescript-starter/branch/main/graph/badge.svg)](https://codecov.io/gh/your-org/react-typescript-starter)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev/)

A modern, production-ready React + TypeScript boilerplate with comprehensive testing, accessibility features, and performance optimizations. Built with the latest tools and best practices for scalable web applications.

## 🚀 Features

### Core Technologies

- **React 19** - Latest React with concurrent features and improved performance
- **TypeScript 5.7** - Strict TypeScript configuration for better developer experience
- **Vite 6** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with shadcn/ui components
- **shadcn/ui** - Beautiful, accessible components built with Radix UI

### Development Experience

- **ESLint 9** - Modern linting with flat config
- **Prettier** - Code formatting with Tailwind plugin
- **Husky** - Git hooks for code quality
- **lint-staged** - Run linters on staged files
- **Commitlint** - Enforce conventional commits

### Testing Infrastructure

- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing across browsers
- **MSW** - API mocking for tests
- **Coverage reporting** - >80% code coverage requirement
- **Accessibility testing** - WCAG 2.1 Level AA compliance
- **Contract testing** - Pact framework for API contracts
- **Performance testing** - Lighthouse CI integration

### Quality Assurance

- **TypeScript strict mode** - Zero type errors
- **Pre-commit validation** - Automated quality checks
- **GitHub Actions CI** - Comprehensive CI/CD pipeline
- **Security auditing** - Dependency vulnerability scanning
- **Bundle optimization** - Code splitting and tree shaking

### UI/UX

- **Dark mode support** - System preference detection
- **Responsive design** - Mobile-first approach
- **Accessibility** - ARIA labels, keyboard navigation
- **Progressive Web App** - Service worker and manifest
- **Error boundaries** - Graceful error handling

## 📦 Project Structure

```
react-typescript-starter/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml             # CI/CD pipeline
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── error-boundary.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── config/               # Configuration files
│   │   └── app-config.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── use-fetch.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-theme.ts
│   │   └── use-toast.ts
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   ├── pages/                # Page components
│   │   ├── about-page.tsx
│   │   ├── dashboard-page.tsx
│   │   ├── home-page.tsx
│   │   ├── index.ts
│   │   └── not-found-page.tsx
│   ├── services/             # API services
│   │   ├── api-client.ts
│   │   ├── auth-service.ts
│   │   ├── index.ts
│   │   └── user-service.ts
│   ├── store/                # State management
│   │   ├── auth-store.ts
│   │   ├── index.ts
│   │   ├── ui-store.ts
│   │   └── user-store.ts
│   ├── types/                # TypeScript types
│   │   └── global.d.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── tests/                     # Test files
│   ├── accessibility/         # Accessibility tests
│   ├── contracts/             # Contract tests
│   ├── e2e/                   # End-to-end tests
│   ├── fixtures/              # Test fixtures
│   ├── integration/           # Integration tests
│   ├── mocks/                 # MSW mock handlers
│   ├── performance/           # Performance tests
│   ├── unit/                  # Unit tests
│   └── utils/                 # Test utilities
├── .editorconfig              # Editor configuration
├── .eslintrc.mjs             # ESLint configuration
├── .gitignore                # Git ignore rules
├── .lintstagedrc.json        # lint-staged configuration
├── .prettierrc.json          # Prettier configuration
├── commitlint.config.js      # Commitlint configuration
├── components.json           # shadcn/ui configuration
├── lighthouserc.json         # Lighthouse CI configuration
├── package.json              # Dependencies and scripts
├── pact.config.js            # Pact contract testing config
├── playwright.config.ts      # Playwright configuration
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.app.json         # App TypeScript config
├── tsconfig.json             # Base TypeScript config
├── tsconfig.node.json        # Node TypeScript config
└── vite.config.ts            # Vite configuration
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/react-typescript-starter.git
   cd react-typescript-starter
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

### Development

```bash
yarn dev                 # Start development server
yarn build              # Build for production
yarn preview            # Preview production build
```

### Code Quality

```bash
yarn lint               # Run ESLint
yarn lint:fix          # Fix ESLint issues automatically
yarn format            # Format code with Prettier
yarn format:check      # Check code formatting
yarn type-check        # TypeScript type checking
```

### Testing

```bash
yarn test              # Run unit tests
yarn test:watch        # Run tests in watch mode
yarn test:coverage     # Run tests with coverage
yarn test:ui           # Run tests with Vitest UI
yarn test:e2e          # Run end-to-end tests
yarn test:e2e:ui       # Run E2E tests with UI
yarn test:e2e:debug    # Debug E2E tests
yarn test:a11y         # Run accessibility tests
yarn test:contracts    # Run contract tests
```

### CI/CD

```bash
yarn validate          # Run all validation checks
yarn lighthouse        # Run Lighthouse CI
yarn audit             # Security audit
```

## 🎨 Development Workflow

### 1. Local Development

```bash
# Start development server
yarn dev

# Make changes to your code
# Changes are automatically reloaded in the browser
```

### 2. Code Quality Checks

```bash
# Before committing, run validation
yarn validate

# Or run individual checks
yarn lint
yarn type-check
yarn test
yarn build
```

### 3. Testing

```bash
# Unit tests during development
yarn test:watch

# E2E tests
yarn test:e2e

# Accessibility tests
yarn test:a11y
```

### 4. Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit (commitlint enforces conventional commits)
git add .
git commit -m "feat: add new feature description"

# Push and create a pull request
git push origin feature/your-feature-name
```

## 🔧 Configuration

### Environment Variables

Create `.env` files for different environments:

- `.env` - Default environment
- `.env.development` - Development environment
- `.env.production` - Production environment

```env
# Example environment variables
VITE_API_URL=https://api.example.com
VITE_APP_NAME=React TypeScript Starter
```

### TypeScript Configuration

The project uses strict TypeScript configuration with:

- Strict mode enabled
- Path aliases (`@/*` maps to `src/*`)
- Type checking for build process
- Comprehensive type definitions

### ESLint Configuration

Modern ESLint 9 flat config with:

- TypeScript rules
- React rules
- Accessibility rules
- Import sorting
- Tailwind CSS linting

## 🚀 Deployment

### Build for Production

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
yarn build
netlify deploy --prod --dir=dist
```

#### GitHub Pages

Enable GitHub Pages in repository settings and use the included GitHub Actions workflow for automatic deployment.

### Environment-specific Builds

```bash
# Development build
yarn build:dev

# Production build
yarn build:prod
```

## 🧪 Testing Strategy

### Testing Pyramid

- **70% Unit Tests** - Individual components and functions
- **20% Integration Tests** - Component interactions
- **10% E2E Tests** - Full user workflows

### Test Types

- **Unit Tests** - Vitest + React Testing Library
- **Integration Tests** - Component and hook testing
- **E2E Tests** - Playwright for cross-browser testing
- **Accessibility Tests** - WCAG 2.1 Level AA compliance
- **Contract Tests** - Pact framework for API contracts
- **Performance Tests** - Lighthouse CI for performance budgets

### Test Coverage

- Target: >80% code coverage
- Coverage reports uploaded to Codecov
- Coverage thresholds enforced in CI

## 🔒 Security

### Security Features

- Dependency vulnerability scanning
- ESLint security rules
- Pre-commit security hooks
- TypeScript strict mode
- CSP headers (configurable)

### Security Audits

```bash
# Run security audit
yarn audit

# Fix vulnerabilities
yarn audit --fix
```

## 🎯 Performance

### Performance Features

- Code splitting with Vite
- Tree shaking for optimal bundles
- Lazy loading of routes
- Image optimization
- Service worker for caching
- Lighthouse CI integration

### Performance Budgets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## ♿ Accessibility

### Accessibility Features

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast validation
- Accessible component library (shadcn/ui)

### Testing Accessibility

```bash
# Run accessibility tests
yarn test:a11y

# Manual testing checklist
# - Navigate with keyboard only
# - Test with screen reader
# - Verify color contrast
# - Check focus indicators
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and validation
5. Submit a pull request

### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test changes
- `chore:` for maintenance changes

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📚 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) - System design and architecture
- [API Documentation](docs/API.md) - API reference and examples
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment instructions
- [Testing Guide](docs/TESTING.md) - Testing strategies and best practices

## 🆘 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**

```bash
# Check TypeScript configuration
yarn type-check

# Fix ESLint issues
yarn lint:fix
```

**Tests are failing**

```bash
# Run tests in watch mode to see details
yarn test:watch

# Check test coverage
yarn test:coverage
```

**Performance issues**

```bash
# Run Lighthouse audit
yarn lighthouse

# Check bundle size
yarn build --analyze
```

**Git hooks not running**

```bash
# Reinstall Husky
yarn prepare
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Type safety for JavaScript
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Vitest](https://vitest.dev/) - Blazing fast unit test framework
- [Playwright](https://playwright.dev/) - Reliable end-to-end testing

## 📈 Roadmap

- [ ] Add GraphQL support
- [ ] Implement state management with Zustand
- [ ] Add PWA features
- [ ] Create design system documentation
- [ ] Add visual regression testing
- [ ] Implement internationalization (i18n)
- [ ] Add storybook for component documentation

---

**Happy coding! 🚀**
