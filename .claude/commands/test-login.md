Test the login page comprehensively using the Playwright browser plugin and generate a `login-test-report.md` report.

## Before you start

You need three things — check the conversation for them first, otherwise ask:
- **Login page URL** (e.g., `http://localhost:3000`)
- **Valid credentials** — username and password that should succeed
- **Expected post-login URL** (optional — record wherever you land if unknown)

## Step 1: Discover the form structure

Navigate to the login page and take a snapshot. Identify:
- Username/email field selector
- Password field selector
- Submit button selector
- Show/hide password toggle (note if absent)
- Where error messages appear after a failed attempt

## Step 2: Run all test cases

Work through all four categories. After each test that navigates away (e.g., successful login), go back to the login URL before the next test. Track each result: **PASS**, **FAIL**, or **N/A**.

### Functional Tests

**F1 — Empty form submission**
Click Submit with both fields empty. Expected: error shown, stay on login page.

**F2 — Password only (username empty)**
Fill password with valid value, leave username blank, submit. Expected: error shown.

**F3 — Username only (password empty)**
Fill username with valid value, leave password blank, submit. Expected: error shown.

**F4 — Invalid credentials**
Fill both fields with wrong values, submit. Expected: error shown, stay on login page.

**F5 — Valid credentials**
Fill with the correct credentials, submit. Expected: redirect away from login page.

**F6 — Case sensitivity**
Try the valid username in a different case (e.g., `ADMIN` if correct is `admin`), submit. Record whether it passes or fails.

### UI / UX Tests

**U1 — Error message appears**
After F4, verify error text is rendered. Expected: error message is visible.

**U2 — Error clears on typing**
After an error appears, type in any field. Expected: error disappears.

**U3 — Show/hide password toggle**
If toggle exists, click it. Expected: input switches between `type="password"` and `type="text"`, label/icon updates. Mark N/A if no toggle.

**U4 — Password field default type**
Before clicking any toggle, check the password field. Expected: `type="password"`.

**U5 — Page has a visible heading**
Check for an `<h1>` or `<h2>`. Expected: descriptive heading present.

### Accessibility Tests

**A1 — Enter key submits the form**
Fill both fields with invalid credentials, press Enter. Expected: form submits (shows error).

**A2 — Fields have labels or placeholders**
Inspect both fields. Expected: each has a `placeholder`, `aria-label`, or `<label>`.

**A3 — Submit button is descriptive**
Check button text. Expected: clearly describes the action (e.g., "Login", "Sign In").

### Security Tests

These are smoke tests — the form should reject all of them with an error, not crash or bypass auth.

**S1 — SQL injection**
Username: `' OR '1'='1`, Password: anything. Expected: error shown, no bypass.

**S2 — XSS in username**
Username: `<script>alert(1)</script>`, Password: anything. Expected: error shown, no script executed.

**S3 — Very long input**
Username: 500+ character string, submit. Expected: error shown or gracefully handled, no crash.

**S4 — Whitespace-only input**
Username and password as spaces only, submit. Expected: error shown.

## Step 3: Write the report

Create `login-test-report.md` in the current working directory:

```markdown
# Login Page Test Report

**URL:** <url>
**Date:** <today's date>
**Valid credentials used:** <username> / [hidden]
**Total tests run:** <n>
**Passed:** <n> ✓
**Failed:** <n> ✗
**N/A (not applicable):** <n> —

---

## Summary

<2–3 sentences: overall health of the login page, any standout issues, ready for use or not>

---

## Test Results

### Functional Tests
| ID | Test | Status | Notes |
|----|------|--------|-------|
| F1 | Empty form submission | ✓ PASS | ... |
...

### UI / UX Tests
...

### Accessibility Tests
...

### Security Tests
...

---

## Issues Found

List only FAILs here. If none, write "No issues found."

## Recommendations

Actionable suggestions based on failures or observations. If none, write "No recommendations."
```

## Tips

- If a selector isn't clear from the snapshot, try `input[type="text"]`, `input[type="email"]`, `input[name="username"]`, or `input[placeholder*="user" i]`.
- For security tests: an error message is a pass; a blank page, JS alert, or redirect to dashboard is a fail.
- If no show/hide toggle exists, mark U3 as N/A.
