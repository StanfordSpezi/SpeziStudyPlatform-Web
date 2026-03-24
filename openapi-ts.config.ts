//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { defineConfig } from "@hey-api/openapi-ts";

// eslint-disable-next-line import/no-default-export -- required by hey-api config
export default defineConfig({
  input:
    "https://raw.githubusercontent.com/StanfordSpezi/SpeziStudyPlatform-API/refs/tags/0.0.2/openapi.yaml",
  output: { path: "src/lib/api/generated" },
  plugins: [
    "@hey-api/typescript",
    "@hey-api/sdk",
    "@hey-api/client-fetch",
    "zod",
    {
      name: "@tanstack/react-query",
      queryOptions: true,
      mutationOptions: true,
    },
  ],
});
