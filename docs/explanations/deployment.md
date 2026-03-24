<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# About deployments

This document explains the deployment strategy used in this repository, highlighting the rationale behind key decisions.

## Deployment approach

We deploy the frontend as a static site using GitHub Pages, automated through GitHub Actions. This approach was chosen for its simplicity, ease of maintenance, and nice integration with our existing GitHub workflow.

## Why GitHub Pages?

GitHub Pages was selected primarily due to its integration with GitHub Actions, minimal configuration, and straightforward deployment process. Since the project is a static site without backend requirements, GitHub Pages provides sufficient functionality without unnecessary complexity.
Learn more about GitHub Pages in the [GitHub Pages documentation](https://docs.github.com/en/pages).

## GitHub Actions workflow

The deployment workflow is automated via GitHub Actions, defined in [`.github/workflows/deploy-to-pages.yml`](https://github.com/StanfordSpezi/SpeziStudyPlatform-Web/blob/main/.github/workflows/deploy-to-pages.yml). This workflow:

- Builds the static assets using Vite (`npm run build`).
- Deploys the built assets (`dist` folder) directly to GitHub Pages.

This means that every time a commit is pushed to the main branch, the latest version of the app is automatically built and deployed. This ensures that the live version of the app is always up-to-date with the latest changes.

Learn more about GitHub Actions in the [GitHub Actions documentation](https://docs.github.com/en/actions).

## Vite configuration specifics

The Vite configuration (`vite.config.ts`) sets the `base` path explicitly to `/SpeziStudyPlatform-Web/`. This is necessary because GitHub Pages hosts the site under a sub-path (`https://<USERNAME>.github.io/<REPO>/`). Without this configuration, asset paths and routing would break.

For more details, see [Vite's GitHub Pages deployment documentation](https://v5.vite.dev/guide/static-deploy.html#github-pages).
