<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# About deployments

This document explains the deployment strategy used in this repository, highlighting the rationale behind key decisions.

## Deployment approach

We deploy the frontend as a containerized static site using Docker and Kubernetes (K8s). The application is built into a Docker image that serves pre-built assets via Nginx, with runtime environment variables injected at container startup.

## Why Docker / K8s?

Docker provides a reproducible build and runtime environment, while Kubernetes handles orchestration, scaling, and rolling updates. This approach decouples the build from the deployment target and allows the same image to be configured for different environments (staging, production) via environment variables at startup time.

## Docker build and runtime

The Docker setup consists of:

- **`Dockerfile`**: Multi-stage build — Node.js builds the static assets, then Nginx serves them. Runs as non-root (`nginx` user) for defense in depth.
- **`docker-entrypoint.sh`**: Generates `public/env.js` at container startup, injecting runtime environment variables (`VITE_API_BASE_PATH`, `VITE_KEYCLOAK_URL`, `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID`) into `window.__ENV__`. Validates that all required variables are set.
- **`nginx.conf`**: SPA fallback configuration, aggressive caching for hashed assets, and no-cache directives for `index.html` and `env.js`.
- **`docker-compose.yml`**: Local production build test that mirrors the container image used in K8s. Requires a `.env` file with the required environment variables.

## API base URL

The frontend talks to the backend directly in all environments (dev, containerized prod, K8s). `VITE_API_BASE_PATH` is the backend **origin** only (scheme, host, port), with no path component; `src/lib/api/client.ts` appends `/api/v0`. Dev and prod share a single code path, so a misconfiguration fails the same way everywhere.

Because the browser calls the backend cross-origin, the backend must allow the frontend's origin via CORS. For local dev that means allowing `http://localhost:5173` (Vite); for containerized local testing, `http://localhost:3000`; for deployed environments, whatever host serves the web app.

## Vite configuration specifics

The Vite configuration (`vite.config.ts`) sets the `base` path to `/`. The application is served from the root path in the Docker/K8s deployment. Runtime environment variables are provided via `window.__ENV__`, which is merged with `import.meta.env` at startup.
