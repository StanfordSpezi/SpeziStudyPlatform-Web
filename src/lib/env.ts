//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { z } from "zod";

const envSchema = z.object({
  // Default env variables
  BASE_URL: z.string(),
  MODE: z.string(),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
  // Custom env variables
  VITE_API_BASE_PATH: z.url(),
  VITE_KEYCLOAK_URL: z.url(),
  VITE_KEYCLOAK_REALM: z.string(),
  VITE_KEYCLOAK_CLIENT_ID: z.string(),
});

export const env: ImportMetaEnv = envSchema.parse(import.meta.env);
