//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { ApiError } from "./api/client";

const isUnauthorized = (error: Error) =>
  (error instanceof ApiError && error.status === 401) ||
  error.message === "Unauthorized";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isUnauthorized(error)) {
        // Handle unauthorized errors globally by showing a toast that prompts the user to sign in again.
        // This case is typically triggered when the user is authenticated but their session has expired.
        toast.error("Your session has expired. Please sign in again.", {
          duration: 5000,
          // We reload the page to ensure that the navigation to the sign-in page
          // is handled inside the beforeLoad hook of the layout route.
          action: { label: "Sign in", onClick: () => window.location.reload() },
        });
      }
    },
  }),
});
