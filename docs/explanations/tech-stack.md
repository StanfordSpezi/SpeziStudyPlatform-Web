<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# About the tech stack

This document describes the technology choices behind the web study platform's frontend repo. It outlines our reasoning about these decisions to help users, maintainers, and contributors understand the context behind the current setup.

## Repo structure: monorepo vs single repo

We chose a single repository for our frontend code. This decision keeps the setup simpler and clearer. A single repo is easier for new developers who may not be familiar with complex repository architectures.

A monorepo (one repository containing frontend, backend, and other components) was considered. Monorepos increase consistency, simplify collaboration, and make sharing configuration easier. However, they introduce complexity around versioning, deployment, and independent release cycles.

## Package manager

We currently use `npm`, the default JavaScript package manager. It is familiar and widely used, making it straightforward and accessible for contributors less experienced in front-end development.

Other package managers, like `pnpm`, can provide improved performance. But, they add complexity and require familiarity, creating a barrier for potential contributors.

## Application approach: single-page application vs server-side rendering

We implement a Single-Page Application (SPA) approach. SPAs render content client-side, making interactions seamless by avoiding full page reloads. They are ideal for applications with dynamic content and user interactions, like our platform.

Server-Side Rendering (SSR) would improve initial loading speeds or SEO visibility. However, considering the project's primary purpose (interactive study configuration and logged-in usage), these advantages do not outweigh the increased complexity SSR introduces.

## Frontend development: React, Vite, and TypeScript

We use React as it is well-established, scalable, and modular. For our development tooling, we chose Vite since it dramatically improves the speed during development workflows compared to traditional bundlers.

We also adopt TypeScript. Its type-checking reduces potential runtime errors and makes codebase maintenance smoother over time, improving code quality and efficiency.

## Routing: TanStack Router

We use TanStack Router for routing due to several advantages over alternatives like React Router. TanStack Router is file-based, simplifying route management by directly mapping filesystem structure to application routes. It provides built-in mechanisms for data loading and error handling, reducing boilerplate and improving maintainability. Additionally, TanStack Router includes dedicated DevTools.

Most importantly, it is designed with full end-to-end type safety covering routes, parameters, search parameters, and data loaders. This comprehensive type safety significantly improves developer experience, reduces runtime errors, and ultimately contributes to a more robust application.

## Spezi web configurations

We use an internal package called [spezi-web-configurations](https://github.com/StanfordSpezi/spezi-web-configurations) to centralize formatting and linting settings across all Spezi web applications. This helps ensure consistency across related projects developed within the Stanford Digital Health ecosystem.

## Spezi web design system

We maintain a dedicated custom component library called [spezi-web-design-system](https://github.com/StanfordSpezi/spezi-web-design-system). It contains UI components built specifically for the Stanford Digital Health Spezi apps. Adopting our design system speeds up frontend development. It ensures a cohesive, consistent user experience across the platform and helps developers comply with our accessibility and usability standards more easily.

## Styling: Tailwind CSS

We chose Tailwind CSS for styling, as it simplifies rapid development and implementing responsive layouts. Tailwind's utility-first approach reduces complexity and gives direct visibility into styling. This approach avoids problems that can arise with large CSS files or nested style conventions. It simplifies collaboration when compared to CSS-in-JS or custom stylesheet management, especially for developers new to the codebase.

## State management and data fetching: React Query

We manage server-state data fetching and caching with React Query. It simplifies handling asynchronous operations, caching responses, dealing gracefully with errors, and improving loading state management.

Compared with Redux or custom hooks, React Query emerged as the most practical choice. It decreases development overhead, reduces complexity, and makes code easier to reason about.

## End-to-end testing: Playwright

For end-to-end testing, we chose Playwright. Playwright provides effective tests that mimic real browser interactions.

## Development server and API contract

We include a small local development server to provide a stable API surface while backend services evolve. Routes are defined with a code-first OpenAPI approach and Zod validation, which keeps implementation and documentation in sync and generates a live spec. Data lives in a simple JSON file to keep scenarios easy to tweak and review. Automated tests use mocked endpoints that mirror the same contract for speed and reliability. Learn more in the [development server explanation](./development-server.md).

## Hosting: GitHub Pages

We currently host our frontend using GitHub Pages. Its direct integration into GitHub makes deployment straightforward. Simply committing to the source repository deploys the frontend. While other platforms like Netlify or Vercel offer additional server-side features, GitHub Pages provides a suitable level of simplicity and accessibility for our project's needs. Learn more about our deployment strategy in the [deployments documentation](./deployment.md).

## CI/CD: GitHub Actions

The repo uses GitHub Actions to automate continuous integration and continuous deployment tasks. We chose GitHub Actions for its seamless integration to repositories, straightforward YAML configurations and ease-of-use even to non-expert contributors. Jenkins or Travis CI might offer more configuration options but considering speed, ease-of-setup, and easy adoption by new contributors, GitHub Actions is the best fit.

## Summary

In summary, our technology choices focus on accessibility, simplicity, and ease-of-use. The chosen tech stack balances developer productivity, maintainability, and a smooth end-user experience. We intentionally lean toward widely adopted, user-friendly tools that enable fast onboarding, sustainable project growth, and consistency across Stanford Biodesign Digital Health's web frontend projects.
