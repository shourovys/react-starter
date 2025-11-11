# Contributing to React TypeScript Starter

First off, thank you for considering contributing to React TypeScript Starter! It's people like you that make this project better.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- **Be respectful and inclusive** - Treat all community members with respect
- **Be collaborative** - Help others learn and grow
- **Be constructive** - Provide helpful feedback and suggestions
- **Be patient** - Remember that everyone is learning
- **Focus on what's best for the community** - Consider the impact of your actions

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - Latest LTS version recommended
- **Yarn** - Package manager (preferred) or npm
- **Git** - For version control
- **VS Code** - Recommended IDE with our extensions

### Development Setup

1. **Fork and Clone**

   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/your-username/react-typescript-starter.git
   cd react-typescript-starter
   ```

2. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/original-org/react-typescript-starter.git
   ```

3. **Install Dependencies**

   ```bash
   yarn install
   ```

4. **Start Development Server**

   ```bash
   yarn dev
   ```

5. **Run Quality Checks**
   ```bash
   yarn validate
   ```

## Development Workflow

### Branch Strategy

We use a simplified Git Flow:

- `main` - Production-ready code (protected)
- `develop` - Integration branch for features
- `feature/feature-name` - Feature development
- `fix/issue-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes

### Making Changes

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or for fixes:
   git checkout - fix/bug-description
   ```

2. **Make Your Changes**

   - Follow our coding standards
   - Write tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   # Run all quality checks
   yarn validate

   # Run tests in watch mode during development
   yarn test:watch

   # Test specific components
   yarn test src/components/your-component
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create a pull request on GitHub
   ```

## Commit Convention

We follow [Conventional Commits](https://conventionalcommits.org/) strictly:

### Commit Types

- **feat**: A new feature or functionality
- **fix**: A bug fix or patch
- **docs**: Documentation changes only
- **style**: Code formatting, styling changes (no logic changes)
- **refactor**: Code refactoring without functionality changes
- **test**: Adding, updating, or fixing tests
- **chore**: Maintenance tasks, dependency updates
- **perf**: Performance improvements
- **ci**: CI/CD configuration changes
- **build**: Build system or dependencies

### Commit Format

```
type(scope): description

[optional body]

[optional footer]
```

### Examples

```bash
# Features
feat(auth): add user login component
feat(ui): implement dark mode toggle
feat(api): add user profile endpoints

# Bug fixes
fix(auth): resolve login redirect issue
fix(ui): fix button alignment on mobile
fix(api): handle null user data

# Documentation
docs(readme): update installation instructions
docs(api): add authentication examples

# Other changes
refactor(auth): simplify user validation logic
test(auth): add unit tests for login form
chore: update TypeScript to 5.7
```

## Coding Standards

### TypeScript

- **Strict Mode**: All code must pass strict TypeScript checking
- **Types First**: Define interfaces and types before implementation
- **No any**: Use specific types or `unknown` when necessary
- **Descriptive Names**: Use clear, descriptive variable and function names

### Code Style

- **ESLint**: Follow all configured linting rules
- **Prettier**: Code formatting is enforced automatically
- **Function Components**: Use functional components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Component Structure**: Follow the established component structure

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── your-component.tsx
│   └── index.ts        # Barrel exports
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
├── services/           # API services
├── store/              # State management
└── config/             # Configuration files
```

## Testing Requirements

### Test Coverage

- **Target**: >80% code coverage
- **New Features**: Must include tests
- **Bug Fixes**: Include regression tests
- **Critical Paths**: >90% coverage required

### Test Types

#### Unit Tests (70% of tests)

- Individual components and functions
- Utility functions and helpers
- Custom hooks logic
- API service functions

```typescript
// Example unit test structure
describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<YourComponent />);
    await user.click(screen.getByRole('button'));
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

#### Integration Tests (20% of tests)

- Component interactions
- Hook integrations
- State management
- API integrations

#### E2E Tests (10% of tests)

- Critical user workflows
- Cross-browser compatibility
- Accessibility flows
- Performance testing

### Test Commands

```bash
# Run all tests
yarn test

# Watch mode for development
yarn test:watch

# Coverage report
yarn test:coverage

# Run specific test file
yarn test YourComponent.test.tsx

# Run E2E tests
yarn test:e2e

# Run accessibility tests
yarn test:a11y
```

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

All new features must meet accessibility standards:

- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: Meet 4.5:1 ratio for normal text
- **Focus Management**: Clear focus indicators and logical tab order
- **Alternative Text**: All images must have alt text

### Testing Accessibility

```bash
# Automated accessibility tests
yarn test:a11y

# Manual testing checklist
# - Navigate with Tab key only
# - Test with screen reader (NVDA, JAWS, VoiceOver)
# - Verify color contrast with tools
# - Test with high contrast mode
```

## Performance Standards

### Core Web Vitals

- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Performance Guidelines

- **Bundle Size**: Keep bundle size under 500KB
- **Code Splitting**: Use lazy loading for routes
- **Image Optimization**: Use appropriate formats and sizes
- **Tree Shaking**: Remove unused code
- **Caching**: Implement proper caching strategies

### Performance Testing

```bash
# Run Lighthouse CI
yarn lighthouse

# Analyze bundle size
yarn build --analyze
```

## Pull Request Process

### Before Submitting

1. **Run Quality Checks**

   ```bash
   yarn validate
   ```

2. **Update Documentation**

   - Update README if needed
   - Add JSDoc comments for new functions
   - Update API documentation

3. **Check Tests**

   - All tests must pass
   - Add tests for new functionality
   - Maintain coverage requirements

4. **Update Changelog**
   - Add entry to CHANGELOG.md (if exists)
   - Follow the same commit convention

### PR Template

Use our [pull request template](./.github/pull_request_template.md):

- **Description**: Clear description of changes
- **Type**: Feature, bug fix, or documentation
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes
- **Checklist**: Completion verification

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review
3. **Testing**: Reviewer tests the changes
4. **Documentation**: Verify documentation is updated
5. **Final Approval**: All requirements met

### Merge Requirements

- All CI checks passing
- At least one approval
- No unresolved conversations
- Up-to-date with base branch
- Changelog updated (if applicable)

## Issue Guidelines

### Before Creating an Issue

1. **Search Existing Issues** - Avoid duplicates
2. **Check Documentation** - May already be documented
3. **Reproduce the Issue** - Ensure it's reproducible
4. **Check Recent Commits** - May already be fixed

### Issue Templates

Use our issue templates:

- **Bug Report**: For bugs and errors
- **Feature Request**: For new features
- **Documentation**: For docs improvements
- **Question**: For questions and support

### Bug Report Template

```markdown
**Describe the Bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g. iOS]
- Browser: [e.g. Chrome]
- Version: [e.g. 91]
- Node.js: [e.g. 18.x.x]
- Package Manager: [e.g. yarn]
```

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, backward compatible

### Release Flow

1. **Feature Freeze**: Stop accepting new features
2. **Testing**: Thorough testing of all features
3. **Documentation**: Update all relevant docs
4. **Release Notes**: Create comprehensive release notes
5. **Tag Release**: Create Git tag with version
6. **Deploy**: Run deployment pipeline
7. **Announce**: Update community and stakeholders

## Getting Help

### Resources

- **Documentation**: `/docs` directory
- **API Reference**: [API Documentation](docs/API.md)
- **Architecture**: [Architecture Guide](docs/ARCHITECTURE.md)
- **Examples**: `/examples` directory

### Community Support

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Discord**: Real-time community chat (link in README)
- **Email**: For security issues (security@example.com)

### Maintainer Contact

If you need to reach a maintainer directly:

- **Technical Questions**: GitHub Discussions
- **Security Issues**: security@example.com
- **Code Review**: Tag @maintainer in PRs
- **General**: Use GitHub Discussions

## Recognition

### Contributors

All contributors are recognized in:

- **README.md**: Contributors section
- **Release Notes**: Significant contributions highlighted
- **Website**: Annual contributor showcase

### Ways to Contribute

You don't just have to write code! We welcome:

- **Documentation**: Improve guides and examples
- **Testing**: Help test new features and fixes
- **Design**: UI/UX improvements and feedback
- **Translation**: Localize documentation
- **Community**: Help other users in discussions
- **Bug Reports**: Report issues you find
- **Feature Ideas**: Suggest improvements

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Don't hesitate to ask! We're here to help you contribute successfully.

- **Quick Questions**: GitHub Discussions
- **Detailed Help**: Create a "question" issue
- **Security**: Email security@example.com

Thank you for contributing to React TypeScript Starter! 🚀
