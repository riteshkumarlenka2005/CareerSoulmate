# Tests

Integration and end-to-end tests for the Career Guidance Platform.

## Structure

- `client/` - Frontend unit & UI tests (Jest + React Testing Library)
- `server/` - API tests (Mocha/Jest or PyTest)
- `e2e/` - End-to-end tests (Cypress or Playwright)

## Running Tests

### Client Tests
```bash
cd client
npm test
```

### Server Tests
```bash
cd server
npm test
```

### E2E Tests
```bash
cd tests/e2e
npx playwright test
```

## Writing Tests

See individual README files in each subdirectory for specific testing guidelines.
