Run the following steps in order to quality-check, commit, and push changes:

## 1. Pre-flight check
Run `git status` to see what has changed. If there is nothing to commit, tell the user and stop — do not proceed further.

Show the user a brief summary of which files have changed so they know what will be included.

## 2. Code quality (JS/JSX files only)
Identify all changed JS/JSX files under `src/`. Skip `.md`, config, and non-source files.

If any JS/JSX files changed:
- Run Prettier on them: `npx prettier --write <files>`
- Run ESLint: `npx eslint <files>`
- If ESLint reports any errors, show them to the user and stop. Do not auto-fix — the user must fix errors manually before proceeding.

## 3. Stage files
Stage only the changed source files by name — do not use `git add -A` or `git add .` as these can accidentally include sensitive or unintended files.

## 4. Commit message
If the user provided a commit message, use it. Otherwise ask them for one — keep it concise and descriptive (what changed and why, not how).

Commit with the message and append the Co-Authored-By trailer:
```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## 5. Push
Detect the current branch with `git branch --show-current` and push to that branch:
```
git push origin <current-branch>
```
Do not hardcode `main`. If the push is rejected, show the error and ask the user how to handle it — never force push without explicit instruction.

## 6. Confirm
On success, show the commit hash and confirm which branch was pushed to.
