# Development Guide

This document describes the preferred coding style and development practices to follow.

## General Principles

- **Type Safety**: Strongly prefer static typing. Use type annotations/hints in all languages.
- **Functional Patterns**: Favor functional programming patterns (map, filter, fold, composition) over imperative loops.
- **Concise Functions**: Keep functions short and focused on a single task.
- **Self-Documenting Code**: Write clear, expressive code. Avoid inline comments except for non-obvious "why" explanations.
- **Immutability**: Prefer immutable data where practical.
- **Modern Features**: Use modern language features (pattern matching, async/await, coroutines, etc.).

## Architecture Patterns

### Composition Over Inheritance

Prefer composing types rather than building deep inheritance hierarchies. Use interfaces/protocols to define contracts.

### Data Transformation Pipelines

Structure code as pipelines of transformations. Chain operations declaratively rather than using nested loops or mutable accumulators.

### Dependency Injection

Pass dependencies through constructors rather than creating them internally or using global state.

### Event-Driven Design

For async/distributed systems, use event emitters and listeners. Decouple producers from consumers.

## Type System Usage

### Strong Typing with Generics

Use generic types to write reusable code while maintaining type safety. Prefer generic constraints over `any`/`object`.

### Discriminated Unions / Variant Types

Model data that can be one of several types using tagged unions. Use exhaustive pattern matching to handle all cases.

### Optional Types

Represent nullable values explicitly with Optional/Maybe types rather than bare nulls. Force callers to handle the absence case.

### Type Aliases

Define type aliases for complex types to improve readability and create semantic meaning.

## Function Design

### Pure Functions

Prefer pure functions without side effects. Given the same inputs, return the same outputs.

### Factory Functions

Use static factory methods (`Make()`, `create()`) for complex object construction. This allows for more expressive APIs than constructors alone.

### Operator Overloading

Where the language supports it, use operator overloading to create fluent, composable APIs (e.g., pipe operators, implicit conversions).

### Lazy Evaluation

Use generators/iterators/coroutines for lazy sequences. Don't compute values until they're needed.

## Error Handling

Prefer explicit error handling through types (Optional, Result) over exceptions for expected failure cases. Reserve exceptions for truly exceptional circumstances.

## Documentation

- Public library APIs: comprehensive documentation with examples
- Application code: minimal comments, self-documenting code
- Use comments to explain "why" not "what"
- Disable linting rules with inline comments only when necessary, with explanation

## Testing

- Tests in separate files/directories
- Descriptive test names indicating what is being tested
- Test both success and edge cases

## Issue-Driven Development

### Starting Work

All features and bug fixes begin with a GitHub issue. When asked to implement something:

1. **"Implement feature X"** or **"Fix bug Y"**: Search for the corresponding GitHub issue using `gh issue list --search "X"` or `gh issue view <number>`
2. **@-mentioned in an issue**: Read the full issue context and implement accordingly
3. **No existing issue**: Create one first with `gh issue create` to document the work before starting

### Understanding Requirements

Before implementing, thoroughly review:

- Issue title and description
- Acceptance criteria (if specified)
- Comments and discussion thread
- Linked issues or PRs
- Labels (priority, type, component)

### Issue References

- Reference the issue number in branch names: `feature/42-add-user-auth`
- Reference the issue in commit messages: `Add user authentication (fixes #42)`
- Link PRs to issues: `gh pr create --body "Closes #42"`

## System Architecture

### Architecture Document

The system architecture is documented in `docs/ARCHITECTURE.md`. This living document describes:

- System layers and their responsibilities
- Component boundaries and interfaces
- Allowed dependencies between layers/components
- Key abstractions and their purposes

### Architectural Compliance

Before making code changes:

1. Review `docs/ARCHITECTURE.md` to understand the system structure
2. Identify which layer/component the change affects
3. Ensure changes respect:
   - **Layer boundaries**: Dependencies flow in the allowed direction only (no backward dependencies)
   - **Abstraction layers**: Higher layers depend on abstractions, not concrete implementations
   - **Component boundaries**: Cross-component communication only through defined interfaces

### Updating the Architecture

When changes affect the system architecture:

- Update `docs/ARCHITECTURE.md` to reflect the new structure
- Document new components, layers, or interfaces
- Update dependency diagrams if applicable

## Architecture Decision Records (ADRs)

### Creating ADRs

Create an ADR for each significant change that involves:

- Architectural decisions or changes
- Technology choices (libraries, frameworks, tools)
- Design patterns or approaches
- Trade-offs or alternatives considered

ADRs should be stored in `docs/adr/` with the naming convention `NNNN-title-with-dashes.md` (e.g., `0001-use-postgres-for-persistence.md`).

### ADR Structure

Each ADR should include:

- **Title**: Short descriptive name
- **Status**: Proposed, Accepted, Deprecated, Superseded
- **Context**: The situation and problem being addressed
- **Decision**: The change being made
- **Consequences**: Resulting impacts, both positive and negative

### Consulting Existing ADRs

Before modifying code:

1. Review relevant ADRs in `docs/adr/` to understand prior decisions
2. Ensure changes align with accepted architectural decisions
3. If a change contradicts an existing ADR, either:
   - Modify the approach to align with the ADR, or
   - Create a new ADR that supersedes the previous one with justification

## Code Duplication & Refactoring

### Identifying Duplication

While implementing features, actively watch for:

- Duplicated code blocks or logic
- Similar patterns that could be abstracted
- Copy-pasted code with minor variations
- Opportunities to consolidate related functionality

### Separation of Concerns

**Do not mix refactoring with feature development.** Keep feature work focused and atomic.

When duplication or refactoring opportunities are identified:

1. Complete the current feature without refactoring
2. Create a GitHub issue documenting the refactoring opportunity

### Creating Refactor Issues

Create a GitHub issue with the `refactor` label:

```bash
gh issue create --label "refactor" --title "Refactor: <brief description>" --body "..."
```

Issue body should include:

- **Current State**: Description of the duplication or code smell
- **Proposed Change**: How the code should be restructured
- **Affected Files**: List of files that will be modified
- **Risk Assessment**: Potential impacts and mitigation strategies

### Implementing Refactors

- Refactoring is implemented as a separate branch/PR upon request
- Reference the refactor issue: `git checkout -b refactor/123-extract-auth-utils`
- Refactor PRs should not include new features
- Ensure all tests pass after refactoring
- Update documentation if interfaces change
- Close the issue via PR: `Closes #123`

## Change Completeness

Every code change must be complete before submission. A change is not complete until:

### Code Quality Verification

- Code compiles/builds without errors
- Linting passes with no warnings or errors
- All existing tests pass
- New functionality includes corresponding tests

### Documentation Updates

- Update relevant documentation to reflect changes
- Add/update API documentation for new or modified public interfaces
- Update README if the change affects setup, usage, or configuration

### Pre-Submission Checklist

Before creating a PR, verify:

1. `build` - Code compiles successfully
2. `lint` - No linting errors or warnings
3. `test` - All tests pass (existing and new)
4. Documentation is updated to match code changes
5. Changes comply with `docs/ARCHITECTURE.md` (no layer violations or backward dependencies)
6. ADR created for any architectural or design decisions

## Git Workflow

### Branch-Based Development

For any feature or bug fix:

1. Create a branch referencing the issue: `feature/42-add-user-auth` or `fix/57-null-pointer`
2. Make commits with clear messages referencing the issue: `Add auth middleware (#42)`
3. Complete all verification steps (see Change Completeness above)
4. When work is complete, create a pull request linked to the issue

### Pull Request Requirements

- PR title should clearly describe the change
- PR description should include:
  - Link to the issue: `Closes #42` or `Fixes #42`
  - Summary of changes
  - Test plan or verification steps
- All verification checks must pass before requesting review
- Keep PRs focused on a single issue

### Example Workflow

```bash
# 1. Read the issue
gh issue view 42

# 2. Create branch
git checkout -b feature/42-add-user-auth

# 3. Implement, commit, verify
git commit -m "Add user authentication (#42)"

# 4. Create PR linked to issue
gh pr create --title "Add user authentication" --body "Closes #42

## Summary
- Added auth middleware
- Implemented login/logout endpoints

## Test Plan
- Unit tests for auth service
- Integration tests for endpoints"
```
