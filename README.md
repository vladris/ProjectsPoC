# ProjectsPoC

## GitHub CLI Authentication

When using `gh` CLI with Claude Code, authentication issues may occur due to an existing `GITHUB_TOKEN` environment variable taking precedence over `gh auth login` credentials.

### Setup Steps

1. **Authenticate with GitHub CLI**
   ```bash
   gh auth login
   ```
   Follow the interactive prompts to complete authentication.

2. **Verify authentication**
   ```bash
   gh auth status
   ```
   If you see `authentication failed` with a message about `GITHUB_TOKEN`, the environment variable is overriding your credentials.

3. **Working with GITHUB_TOKEN conflicts**

   If `GITHUB_TOKEN` is set in your environment, prefix commands with `GITHUB_TOKEN=` to unset it:
   ```bash
   GITHUB_TOKEN= gh pr create --title "My PR"
   GITHUB_TOKEN= gh issue list
   ```

   Alternatively, unset it for your entire session:
   ```bash
   unset GITHUB_TOKEN
   ```

## Claude Code GitHub Integration

This repository includes a GitHub Actions workflow (`.github/workflows/claude.yml`) that enables @claude mentions in issues and PRs.

### Setup Required

1. Install the [Claude GitHub App](https://github.com/apps/claude) on this repository
2. Generate an OAuth token:
   ```bash
   claude setup-token
   ```
3. Add `CLAUDE_CODE_OAUTH_TOKEN` as a repository secret (**Settings > Secrets and variables > Actions**)

### Usage

Mention @claude in issues or PR comments to trigger Claude Code assistance:
```
@claude implement this feature
@claude review this code
@claude fix the bug described above
```
