//
// This source file is part of the Stanford Spezi open source project
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

export type GroupRole = "admin" | "researcher";

export interface AuthUser {
  name: string;
  email: string;
  groupMemberships: Record<string, GroupRole>;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Provides Keycloak authentication state to the React tree.
 * Initializes Keycloak on mount and sets up automatic token refresh.
 */
/** Refresh the token if it expires within this many seconds. */
const TOKEN_REFRESH_THRESHOLD_SECONDS = 30;

/**
 * Parses the Keycloak JWT `groups` claim (e.g. "/GroupName/admin")
 * into a membership map matching the server's AuthContext logic.
 */
const parseGroupMemberships = (
  groups: string[] | undefined,
): Record<string, GroupRole> => {
  const memberships: Record<string, GroupRole> = {};
  for (const path of groups ?? []) {
    if (!path.startsWith("/")) continue;
    const [groupName, roleStr] = path.slice(1).split("/", 2);
    if (groupName && (roleStr === "admin" || roleStr === "researcher")) {
      memberships[groupName] = roleStr;
    }
  }
  return memberships;
};

const parseUser = (): AuthUser | null => {
  const keycloak = getKeycloak();
  if (!keycloak.authenticated || !keycloak.tokenParsed) return null;
  const token = keycloak.tokenParsed;

  const fullName = [token.given_name, token.family_name]
    .filter(Boolean)
    .join(" ");

  return {
    name: (fullName || token.preferred_username || "User") as string, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- intentionally treat empty string as falsy
    email: String(token.email ?? ""),
    groupMemberships: parseGroupMemberships(
      token.groups as string[] | undefined,
    ),
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const authenticated = await initKeycloak();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const keycloak = getKeycloak();
          // Wire the access token provider into the API client before
          // marking as initialized, so queries triggered on first render
          // already have a token provider available.
          setAccessTokenProvider(async () => {
            await keycloak.updateToken(TOKEN_REFRESH_THRESHOLD_SECONDS);
            return keycloak.token;
          });
        }

        setIsInitialized(true);
      } catch (error) {
        setInitError(
          error instanceof Error ? error : new Error(String(error)),
        );
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
      keycloak
        .updateToken(TOKEN_REFRESH_THRESHOLD_SECONDS)
        .catch(() => setIsAuthenticated(false));
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
    setAccessTokenProvider(undefined);
    await getKeycloak().logout({
      redirectUri: `${window.location.origin}${import.meta.env.BASE_URL}sign-in`,
    });
  }, []);

  const user = useMemo(
    () => (isAuthenticated ? parseUser() : null),
    [isAuthenticated],
  );

  const value = useMemo(
    () => ({ isAuthenticated, isInitialized, user, login, logout }),
    [isAuthenticated, isInitialized, user, login, logout],
  );

  if (initError) {
    return (
      <div className="flex-center size-full flex-col gap-4">
        <p>Unable to connect to the authentication service.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

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
