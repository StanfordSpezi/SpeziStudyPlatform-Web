//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions } from "@tanstack/react-query";
import type { User } from "../api/types";
import { getKeycloak } from "../auth/keycloak";

interface UserRetrieveQueryOptionsParams {
  userId: "me" | (string & {});
}

/**
 * Query options for fetching the current user.
 * User info is derived from the Keycloak token profile.
 */
export const userRetrieveQueryOptions = (
  params: UserRetrieveQueryOptionsParams,
) => {
  return queryOptions({
    queryKey: ["user", "retrieve", params],
    queryFn: (): User => {
      const keycloak = getKeycloak();
      if (!keycloak.authenticated || !keycloak.tokenParsed) {
        throw new Error("Unauthorized");
      }

      const tokenParsed = keycloak.tokenParsed;

      // Derive role from Keycloak realm roles
      const realmRoles = tokenParsed.realm_access?.roles ?? [];
      const role = realmRoles.includes("admin") ? "admin" : "user";

      const fullName = [tokenParsed.given_name, tokenParsed.family_name]
        .filter(Boolean)
        .join(" ");

      return {
        name: (fullName || tokenParsed.preferred_username || "User") as string, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing -- intentionally treat empty string as falsy

        email: String(tokenParsed.email ?? ""),
        role,
      };
    },
  });
};
