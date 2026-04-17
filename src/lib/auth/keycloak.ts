//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import Keycloak from "keycloak-js";
import { env } from "../env";

let keycloakInstance: Keycloak | undefined;
let initPromise: Promise<boolean> | undefined;

/**
 * Returns the shared Keycloak instance, creating it on the first call.
 */
export const getKeycloak = (): Keycloak => {
  keycloakInstance ??= new Keycloak({
    url: String(env.VITE_KEYCLOAK_URL),
    realm: String(env.VITE_KEYCLOAK_REALM),
    clientId: String(env.VITE_KEYCLOAK_CLIENT_ID),
  });
  return keycloakInstance;
};

/**
 * Initializes Keycloak with `check-sso` so existing sessions are picked up
 * without forcing a login redirect. Safe to call multiple times — the init
 * promise is shared so Keycloak is only initialized once.
 */
export const initKeycloak = async (): Promise<boolean> => {
  if (!initPromise) {
    const keycloak = getKeycloak();
    initPromise = keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}${import.meta.env.BASE_URL}silent-check-sso.html`,
      checkLoginIframe: false,
    });
  }
  return initPromise;
};
