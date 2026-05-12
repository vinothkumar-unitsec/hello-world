# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at http://localhost:3000
npm run build    # Production build
npm test         # Run tests (watch mode)
npx eslint src/  # Lint source files
```

## Architecture

Single-page React app with client-side routing via `react-router-dom`.

**Routes:**
- `/` — Home screen (`App.js` inline `Home` component)
- `/main` — Products dashboard (`src/MainPage.js`)

**Data fetching:**
- `src/services/productService.js` — All API calls go here. Currently fetches products from `https://dummyjson.com/products`.

**MainPage.js** is the main feature page: fetches products on mount, renders a paginated table (15 items/page) with ID, Category, Price, and Availability columns. Availability is color-coded — green for "In Stock", red for "Low Stock".

## Conventions

- Inline styles only (no CSS modules or styled-components).
- API base URL lives in `productService.js` as `BASE_URL`.
- ESLint uses the default `react-app` config from `package.json`.
- Pre-commit: run Prettier + ESLint on changed files before every commit.
