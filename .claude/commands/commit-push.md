Run the following steps in order before committing and pushing:

1. Run ESLint on all changed JS/JSX files in the src/ folder. Fix any errors before proceeding. Skip .md files.
2. Stage only the changed source files (do not use `git add -A`).
3. Ask the user for a commit message if they haven't provided one. Otherwise use the message they gave.
4. Commit the staged files with the provided message, appending the Co-Authored-By trailer for Claude.
5. Push to origin main.
6. Confirm success by showing the pushed commit hash.
