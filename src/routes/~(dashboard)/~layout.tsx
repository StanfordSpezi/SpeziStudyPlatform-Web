//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, redirect } from "@tanstack/react-router";
import { getKeycloak } from "@/lib/auth/keycloak";

// This layout route is used to ensure that the user is authenticated
// before accessing the dashboard.
export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: ({ location }) => {
    const keycloak = getKeycloak();
    if (!keycloak.authenticated) {
      // User is not authenticated, redirect to the sign-in page.
      throw redirect({ to: "/sign-in", search: { redirect: location.href } });
    }
  },
});
