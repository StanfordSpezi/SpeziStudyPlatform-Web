//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { env } from "../env";
import { client } from "./generated/client.gen";

/**
 * Structured API error based on RFC 7807 Problem Details.
 * Preserves the HTTP status code so callers can distinguish
 * 401s, 403s, 404s, etc. without string-matching on the message.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly detail?: string;

  constructor({
    title,
    status,
    detail,
  }: {
    title: string;
    status: number;
    detail?: string;
  }) {
    super(title);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

let getAccessToken: (() => Promise<string | undefined>) | undefined;

/**
 * Registers the function used to retrieve the current access token.
 * Called once during auth initialization (Keycloak setup).
 */
export const setAccessTokenProvider = (
  provider: () => Promise<string | undefined>,
) => {
  getAccessToken = provider;
};

// Configure the base URL for all API requests
client.setConfig({
  baseUrl: import.meta.env.DEV ? "/api/v0" : `${env.VITE_API_BASE_PATH}/api/v0`,
});

// Auth interceptor — injects Keycloak Bearer token
client.interceptors.request.use(async (request) => {
  if (getAccessToken) {
    const token = await getAccessToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return request;
});

export { client };
