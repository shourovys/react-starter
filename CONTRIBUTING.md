# Contributing to React TypeScript Starter

Thank you for your interest in contributing to React TypeScript Starter! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/react-typescript-starter.git
   cd react-typescript-starter
   ```
3. **Install dependencies**
   ```bash
   yarn install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes**
6. **Run tests and validation**
   ```bash
   yarn validate
   ```
7. **Submit a pull request**

## 📋 Development Setup

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm
- Git

### Local Development

```bash
# Start development server
yarn dev

# Run tests in watch mode
yarn test:watch

# Run linting
yarn lint

# Run type checking
yarn type-check

# Format code
yarn format
```

### Required Checks

Before submitting a PR, ensure all checks pass:

```bash
yarn validate
```

This runs:

- Linting (`yarn lint`)
- Type checking (`yarn type-check`)
- Unit tests (`yarn test`)
- Build verification (`yarn build`)

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── error-boundary.tsx
│   ├── footer.tsx
│   └── header.tsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── services/           # API services
├── store/              # State management
├── types/              # TypeScript types
└── config/             # Configuration
```

## 🎨 Code Style

### TypeScript

- Use strict TypeScript mode
- Define proper types for all props and variables
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Components

- Use functional components with hooks
- Follow the compound component pattern where appropriate
- Use proper TypeScript interfaces for props
- Implement proper error boundaries
- Ensure accessibility (ARIA labels, keyboard navigation)

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic HTML elements
- Maintain consistent spacing using Tailwind's spacing scale

## 🧪 Testing Requirements

### Test Coverage

- Maintain >80% code coverage
- Write tests for all new features
- Update tests when modifying existing code

### Test Types

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Accessibility Tests**: Ensure WCAG 2.1 AA compliance

### Writing Tests

```typescript
// Unit test example
import { render, screen } from '@/tests/utils/test-utils';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

## 📝 Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/) for commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test changes
- `chore:` for maintenance changes

### Examples

```bash
feat: add user authentication component
fix: resolve memory leak in useEffect hook
docs: update API documentation for user service
test: add unit tests for validation functions
chore: update dependencies to latest versions
```

### Breaking Changes

Include `!` after the type and provide a description:

```bash
feat!: refactor authentication service API
```

## 🌿 Branch Strategy

Use descriptive branch names:

- `feature/description-of-feature`
- `fix/description-of-bug-fix`
- `docs/description-of-doc-change`
- `refactor/description-of-refactor`
- `chore/description-of-maintenance`

Examples:

- `feature/user-dashboard-component`
- `fix/memory-leak-in-hooks`
- `docs/update-deployment-guide`

## 🔍 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add/update tests** for your changes
3. **Run the full validation suite**
   ```bash
   yarn validate
   ```
4. **Update the changelog** if applicable
5. **Ensure your branch is up to date with main**

### PR Template

Your PR description should include:

- **Description**: Brief summary of changes
- **Type of change**: (feature, fix, docs, refactor, etc.)
- **Testing**: How you tested your changes
- **Checklist**:
  - [ ] Code follows project style guidelines
  - [ ] Tests added/updated and passing
  - [ ] Documentation updated
  - [ ] No breaking changes (or properly documented)

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainers
3. **Testing** on different browsers if needed
4. **Documentation review** if applicable
5. **Approval** from at least one maintainer

## 🐛 Reporting Bugs

### Bug Report Template

When reporting bugs, include:

- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: OS, Node version, browser
- **Additional context**: Any other relevant information

## 💡 Feature Requests

### Feature Request Template

For new features:

- **Description**: Clear description of the proposed feature
- **Use case**: Why is this feature needed?
- **Proposed solution**: How should this work?
- **Alternatives**: Other solutions you've considered
- **Additional context**: Any other relevant information

## 🔒 Security

### Reporting Security Issues

Please **do not** report security vulnerabilities through public GitHub issues. Instead:

1. Email security issues to: [security@example.com]
2. Include description and steps to reproduce
3. Allow time for investigation before public disclosure

### Security Best Practices

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Follow the principle of least privilege
- Keep dependencies updated

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Testing Library Documentation](https://testing-library.com/docs/)

## ❓ Getting Help

- **Questions**: Open a discussion
- **Bug Reports**: Use the bug report template
- **Feature Requests**: Use the feature request template
- **Security Issues**: Email security team

## 🙏 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Annual contributor appreciation posts

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to React TypeScript Starter! 🚀**
