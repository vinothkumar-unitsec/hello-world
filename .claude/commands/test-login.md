Test the login page using the Playwright browser plugin and generate a `login-test-report.md` report.

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
- Where error messages appear after a failed attempt

## Step 2: Run all test cases

After each test that navigates away (e.g., successful login), go back to the login URL before the next test. Track each result: **PASS** or **FAIL**.

For every Submit button click:
1. Use `browser_evaluate` to highlight the button just before clicking — set its background to `#1a56db` and add a `2px solid #000` outline so it's visually clear the button is about to be pressed.
2. Take a screenshot with `browser_take_screenshot` to capture the highlighted state.
3. Then click with `browser_click`.
4. Take another screenshot after the click to capture the result.

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

### UI / UX Tests

**U1 — Error message appears**
After F4, verify error text is rendered. Expected: error message is visible.

**U2 — Error clears on typing**
After an error appears, type in any field. Expected: error disappears.

### Accessibility Tests

**A3 — Submit button is descriptive**
Check the submit button text in the snapshot. Expected: clearly describes the action (e.g., "Login", "Sign In").

### Security Tests

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

---

## Summary

<2–3 sentences: overall health of the login page, any standout issues, ready for use or not>

---

## Test Results

### Functional Tests
| ID | Test | Status | Notes |
|----|------|--------|-------|
| F1 | Empty form submission | ✓ PASS | ... |
| F2 | Password only | ✓ PASS | ... |
| F3 | Username only | ✓ PASS | ... |
| F4 | Invalid credentials | ✓ PASS | ... |
| F5 | Valid credentials | ✓ PASS | ... |

### UI / UX Tests
| ID | Test | Status | Notes |
|----|------|--------|-------|
| U1 | Error message appears | ... | ... |
| U2 | Error clears on typing | ... | ... |

### Accessibility Tests
| ID | Test | Status | Notes |
|----|------|--------|-------|
| A3 | Submit button is descriptive | ... | ... |

### Security Tests
| ID | Test | Status | Notes |
|----|------|--------|-------|
| S4 | Whitespace-only input | ... | ... |

---

## Issues Found

List only FAILs here. If none, write "No issues found."

## Recommendations

Actionable suggestions based on failures or observations. If none, write "No recommendations."
```

## Tips

- If a selector isn't clear from the snapshot, try `input[type="text"]`, `input[type="email"]`, `input[name="username"]`, or `input[placeholder*="user" i]`.
- Use this snippet to highlight the button before clicking:
  ```js
  () => {
    const btn = document.querySelector('button[type="submit"]');
    btn.style.outline = '2px solid #000';
    btn.style.boxShadow = '0 0 0 4px rgba(26,86,219,0.5)';
  }
  ```
