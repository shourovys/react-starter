# Contributing Guidelines

Welcome to the React TypeScript Starter project! We're excited to have you contribute. This document outlines the processes and standards we follow to maintain high-quality code and a welcoming community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher (or yarn)
- Git

### Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-org/react-typescript-starter.git
   cd react-typescript-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment**

   ```bash
   cp .env.example .env
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### 1. Choose an Issue

- Check the [Issues](https://github.com/your-org/react-typescript-starter/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch

```bash
# Create and switch to a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 3. Make Changes

- Write clear, focused commits
- Test your changes thoroughly
- Follow the code standards below
- Update documentation if needed

### 4. Run Quality Checks

```bash
# Run all validation checks
npm run validate

# Or run individual checks
npm run lint
npm run type-check
npm run test
npm run build
```

### 5. Commit and Push

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Use the pull request template
- Provide a clear description of changes
- Link to related issues
- Request review from maintainers

## 📏 Code Standards

### TypeScript

- **Strict Mode**: All code must pass strict TypeScript checking
- **Type Safety**: Avoid `any` types; use proper type definitions
- **Interfaces**: Prefer interfaces over type aliases for object shapes
- **Generics**: Use generics for reusable components and functions

### React

- **Functional Components**: Use function components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Props Interface**: Define props interfaces for all components
- **Default Props**: Use default parameters instead of defaultProps

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`)
- **Files**: kebab-case for components (e.g., `user-profile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useUserData`)
- **Types**: PascalCase with descriptive names (e.g., `UserProfileProps`)

### File Structure

```
src/
├── features/          # Feature-based organization
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── __tests__/
├── components/        # Shared components
│   ├── ui/           # Base UI components
│   ├── layout/       # Layout components
│   └── common/       # Common utilities
└── pages/            # Page components with co-located tests
```

## 🧪 Testing Requirements

### Test Coverage

- **Target**: Maintain >80% code coverage
- **Unit Tests**: Required for all new functions and components
- **Integration Tests**: Required for component interactions
- **E2E Tests**: Required for critical user workflows

### Testing Guidelines

- **Test Files**: Co-locate with source files (e.g., `Component.test.tsx`)
- **Test Names**: Describe behavior, not implementation
- **Mocking**: Use MSW for API calls, Vitest mocks for utilities
- **Accessibility**: Include accessibility tests for UI components

### Example Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('displays user name', () => {
    render(<UserProfile user={{ name: 'John Doe' }} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<UserProfile loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

## 📝 Commit Guidelines

We use [Conventional Commits](https://conventionalcommits.org/) for consistent commit messages:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Examples

```bash
feat: add dark mode toggle
fix: resolve memory leak in UserList component
docs: update installation instructions
test: add unit tests for authentication service
chore: update dependencies
```

### Scope (Optional)

Add scope for more specific commits:

```bash
feat(auth): add OAuth login support
fix(ui): resolve button styling issue
```

## 🔄 Pull Request Process

### Before Creating a PR

1. **Update your branch** with the latest changes from main
2. **Run all quality checks** locally
3. **Write/update tests** for your changes
4. **Update documentation** if needed
5. **Test in multiple browsers** if UI changes

### PR Template

Use the provided PR template with:

- Clear title following commit conventions
- Description of changes and rationale
- Screenshots for UI changes
- Testing instructions
- Related issue links

### Review Process

1. **Automated Checks**: CI must pass all checks
2. **Code Review**: At least one maintainer review
3. **Testing**: Changes tested in target environments
4. **Approval**: Maintainers approve and merge

### PR Size Guidelines

- **Small**: < 200 lines - Quick review
- **Medium**: 200-500 lines - Standard review
- **Large**: > 500 lines - May need splitting

## 🐛 Issue Guidelines

### Bug Reports

**Required Information:**

- Clear title describing the issue
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, browser, Node version)
- Screenshots if applicable

**Template:**

```markdown
## Bug Report

**Description:**
Brief description of the bug

**Steps to Reproduce:**

1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**

- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Node Version: [e.g., 18.0.0]
```

### Feature Requests

**Required Information:**

- Clear title for the feature
- Detailed description of the proposed feature
- Use case and rationale
- Mockups or examples if applicable

## 📚 Documentation

### Documentation Standards

- **README Updates**: Update README.md for significant changes
- **Code Comments**: Add JSDoc comments for complex functions
- **API Documentation**: Document all public APIs
- **Architecture Decisions**: Use ADRs for significant decisions

### Documentation Locations

- `README.md` - Main project documentation
- `docs/` - Detailed guides and references
- `docs/architecture/` - System architecture
- `docs/guides/` - Development guides
- `docs/api/` - API documentation
- `docs/decisions/` - Architecture decision records

## 🎯 Recognition

Contributors are recognized through:

- GitHub contributor statistics
- Release notes for significant contributions
- Annual contributor acknowledgments
- Community shoutouts

## 📞 Getting Help

- **Documentation**: Check `docs/` directory first
- **Issues**: Search existing issues or create new ones
- **Discussions**: Use GitHub Discussions for questions
- **Slack**: Join our community workspace

## 📋 Checklist for Contributors

### Before Starting Work

- [ ] Issue exists or create one
- [ ] No duplicate issues/PRs
- [ ] Understand requirements and acceptance criteria

### During Development

- [ ] Follow code standards and conventions
- [ ] Write comprehensive tests
- [ ] Update documentation
- [ ] Test in multiple environments

### Before Submitting

- [ ] All quality checks pass (`npm run validate`)
- [ ] Tests cover new functionality
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] Branch up to date with main

### After Submission

- [ ] Respond to review feedback promptly
- [ ] Address all CI failures
- [ ] Keep PR updated with main branch

---

Thank you for contributing to React TypeScript Starter! Your efforts help make this project better for everyone. 🚀
