<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Run the E2E tests locally

This guide helps you run end-to-end tests using Playwright on your local machine.

## 1. Install dependencies

Ensure the dependencies are installed:

```bash
npm install
```

## 2. Run all tests

Execute the full test suite in headless mode:

```bash
npm run test
```

The tests will run on Chromium, Firefox, and WebKit in parallel.

## 3. View the test report

After the tests complete, view the HTML report:

```bash
npx playwright show-report
```

## Alternative commands

### Run tests in UI mode

For a better debugging experience, use UI mode:

```bash
npx playwright test --ui
```

This opens the Playwright UI, where you can:

- Watch tests run in real-time
- Debug failed tests
- View test steps and traces

### Run specific tests

Run tests in a single browser:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test router.spec.ts
```

## Troubleshooting

- If tests fail, check the HTML report for detailed error messages
- Verify that the development server is not running on port 3000
- Ensure you're using Node.js version 22

For more testing options, see the [Playwright documentation](https://playwright.dev/docs/intro).
