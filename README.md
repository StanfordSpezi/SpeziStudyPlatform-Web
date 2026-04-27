<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# SpeziStudyPlatform-Web

[![Build and Test](https://github.com/StanfordSpezi/SpeziStudyPlatform-Web/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziStudyPlatform-Web/actions/workflows/build-and-test.yml)

The project aims to build an open‑source platform that enables researchers to run simple studies without deep technical expertise. Users define studies by specifying metadata, participant criteria, and app components. These study definitions then configure the companion iOS and Android apps that participants use to take part in the study. Get a quick overview of the platform by checking out the [screenshots](docs/reference/screenshots.md).

This repository contains the frontend code for the platform. Visit [spezi-web-service-study-platform](https://github.com/StanfordSpezi/spezi-web-service-study-platform) for the backend code.

<img width="1618" height="939" alt="SpeziStudyPlatform-Web interface overview" src="./images/hero.webp" />

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/StanfordSpezi/SpeziStudyPlatform-Web.git
   cd SpeziStudyPlatform-Web
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Start the supporting services (API server, Keycloak) using the Docker Compose setup in [SpeziStudyPlatform-Infrastructure](https://github.com/StanfordSpezi/SpeziStudyPlatform-Infrastructure/tree/main/docker).
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API is defined using OpenAPI. The specification lives in the shared [SpeziStudyPlatform-API](https://github.com/StanfordSpezi/SpeziStudyPlatform-API) package.

## Contributing

We welcome contributions! Please read our [contributing guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziStudyPlatform-Web/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/SpeziStudyPlatform-Web/tree/main/CONTRIBUTORS.md) for a full list of all contributors.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)
