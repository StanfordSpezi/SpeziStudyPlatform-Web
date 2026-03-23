//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getKeycloak, initKeycloak } from "./keycloak";
import { setAccessTokenProvider } from "../api/client";

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Provides Keycloak authentication state to the React tree.
 * Initializes Keycloak on mount and sets up automatic token refresh.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const authenticated = await initKeycloak();
      setIsAuthenticated(authenticated);
      setIsInitialized(true);

      if (authenticated) {
        const keycloak = getKeycloak();
        // Wire the access token provider into the API client
        setAccessTokenProvider(async () => {
          // Refresh if the token expires within 30 seconds
          await keycloak.updateToken(30);
          return keycloak.token;
        });
      }
    };

    void init();
  }, []);

  // Keep auth state in sync when the token refreshes or expires
  useEffect(() => {
    if (!isInitialized) return;
    const keycloak = getKeycloak();

    const onAuthSuccess = () => setIsAuthenticated(true);
    const onAuthLogout = () => setIsAuthenticated(false);
    const onTokenExpired = () => {
      keycloak.updateToken(30).catch(() => setIsAuthenticated(false));
    };

    keycloak.onAuthSuccess = onAuthSuccess;
    keycloak.onAuthLogout = onAuthLogout;
    keycloak.onTokenExpired = onTokenExpired;

    return () => {
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthLogout = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, [isInitialized]);

  const login = useCallback(async () => {
    await getKeycloak().login();
  }, []);

  const logout = useCallback(async () => {
    await getKeycloak().logout({
      redirectUri: `${window.location.origin}${import.meta.env.BASE_URL}sign-in`,
    });
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isInitialized, login, logout }),
    [isAuthenticated, isInitialized, login, logout],
  );

  // Block rendering until Keycloak has initialized so that synchronous
  // checks like `keycloak.authenticated` in route guards are accurate.
  if (!isInitialized) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access the Keycloak auth context.
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
