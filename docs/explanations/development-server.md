<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# About the development server

This document explains the purpose, scope, and high-level design of the local development server that powers API interactions for the web study platform during development.

## Important limitations

The development server exists to support local workflows. It is not a production service. Data is stored in a JSON file and authentication is simulated. CORS is restricted to the local frontend origin. There is no rate limiting, auditing, or persistence guarantees beyond the JSON file on disk. Treat all data and credentials as development-only.

## Why we built a development server

We needed a stable API to build the UI while the real backend is still taking shape. The server gives us something dependable to integrate against so we can design screens, validate flows, and make decisions without waiting on service deployments. It keeps the team moving and creates a shared language for data and behavior.

Just as important, it produces an OpenAPI document. That spec makes the contract visible, lets us review changes together, and helps us grow toward a future web service. It is a practical way to agree on how the system should behave before we commit to production infrastructure.

## What the server does

At a high level, the server exposes a small REST API for authentication, studies, teams, and users. Requests and responses are validated, and the same definitions generate an OpenAPI document that drives an interactive API reference. It simulates sign-in and basic permissions, and it reads and writes a small, file-backed dataset that we can tweak for common scenarios. The result is a fast feedback loop that feels close to real interactions without the overhead of a deployed backend.

## Technical choices

We use a small HTTP framework with code-first OpenAPI support and Zod for validation. That lets us define routes once, validate data at runtime, and publish a spec that stays in sync. A lightweight docs UI renders the spec for exploration. Routes are grouped by domain so we can add endpoints and evolve types without touching unrelated areas.

## How it is used by the app and tests

During local development, the SPA calls the server over HTTP using CORS. Automated tests do not talk to the running server. They use mocked endpoints that follow the same contract, based on the same route and schema definitions. Those mocks live under `src/server/mocks` and mirror the behavior needed by the test flows. This keeps tests fast and reliable while still exercising realistic payloads and edge cases. The sign-in flow sets the current user for the session, and authorization checks shape what data is returned.

## Design decisions

We chose a code-first OpenAPI approach so the implementation and documentation move together. This removes drift and speeds up prototyping.

Using a small local server helps us surface real HTTP behavior, CORS constraints, and authorization checks early. That reduces surprises later when integrating with a full backend.

The development database is a JSON file by design. It makes data easy to read, tweak, and version. Scenarios are simple to reproduce and failures are easier to debug because state lives on disk in a human-friendly format. At the same time, it stays lightweight and disposable, which fits development needs.

## Summary

The development server provides a practical middle ground between ad hoc mocks and a full backend. It gives the frontend a reliable, typed, and documented API surface and produces an OpenAPI document that can guide a future web service. The design favors clarity and fast iteration while keeping a clear path to a contract-first workflow and a production-ready service. You can explore the API by running the development server and using the interactive API reference.
