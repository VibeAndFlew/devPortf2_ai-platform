# Contributing to NOVA AI

First off, thank you for considering contributing to NOVA AI Workflow OS. It's people like you that make NOVA such a great tool.

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and harassment-free environment for everyone.

## How to Contribute

### Reporting Bugs

1. **Search existing issues** first to avoid duplicates.
2. Use the **bug report template** when creating a new issue.
3. Include:
   - Clear, descriptive title
   - Steps to reproduce (with code snippets if applicable)
   - Expected vs actual behavior
   - Screenshots or videos (if visual)
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. **Search existing issues** and **discussions** for similar ideas.
2. Create a **feature request** with:
   - Problem statement and motivation
   - Proposed solution
   - Alternatives considered
   - Mockups or wireframes (if UI-related)

### Pull Requests

1. **Fork the repository** and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Set up development environment**:
   ```bash
   npm install --legacy-peer-deps
   npm run dev
   ```

3. **Make your changes** following our coding conventions.

4. **Run quality checks** before committing:
   ```bash
   npm run typecheck    # TypeScript type checking
   npm run lint         # ESLint
   npm run format:check # Prettier format check
   ```

5. **Write tests** for new functionality.

6. **Commit using conventional commits**:
   ```
   feat(chat): add message branching support
   fix(workflows): resolve DAG cycle detection
   docs: update API reference
   refactor(agents): extract tool registry
   ```

7. **Push and open a PR** with:
   - Reference to related issue (if applicable)
   - Description of changes
   - Screenshots for UI changes
   - Checklist of tested scenarios

### Pull Request Guidelines

- Keep PRs focused — one feature/fix per PR
- Write descriptive PR titles and descriptions
- Ensure all CI checks pass
- Update documentation for API changes
- Add/update tests for new code
- Be responsive to reviewer feedback

## Development Workflow

### Branch Naming

- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code refactoring
- `chore/` — Maintenance tasks
- `deps/` — Dependency updates

### Commit Style

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Code Style

- **TypeScript** in strict mode — avoid `any`
- **Functional components** with hooks — no class components
- **Colocation** — place related code together
- **Named exports** — prefer named over default exports
- **Early returns** — reduce nesting
- **Zod schemas** for all data validation
- **Tailwind CSS** for styling — no CSS-in-JS or CSS modules
- **shadcn/ui patterns** — follow established component conventions

### Component Architecture

```tsx
// Component file structure
Component/
├── Component.tsx      # Main component
├── Component.types.ts # TypeScript interfaces
└── index.ts           # Re-export
```

### Testing

- **Vitest** for unit tests
- **React Testing Library** for component tests
- **Playwright** for E2E tests (when configured)

## Review Process

1. **Automated checks** run on every PR (typecheck, lint, build)
2. **At least one maintainer review** required
3. **Changes requested** will be clearly explained
4. **Approved PRs** are squash-merged to `main`

## Getting Help

- Open a **Discussion** for questions and ideas
- Tag maintainers in PRs for review requests
- Check existing **documentation** before asking
- Be patient — we're all volunteers

## Recognition

Contributors will be:
- Listed in the README contributors section
- Tagged in release notes for significant contributions
- Given maintainer access after sustained, high-quality contributions
