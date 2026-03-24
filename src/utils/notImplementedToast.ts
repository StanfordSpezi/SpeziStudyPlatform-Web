//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";

interface ShowNotImplementedToastOptions {
  description?: string;
  duration?: number;
}

/**
 * Displays a standardized "coming soon" toast for features that are not yet implemented.
 */
export const notImplementedToast = (
  feature: string,
  { description, duration = 4000 }: ShowNotImplementedToastOptions = {},
) => {
  const toastDescription = description ?? `${feature} isn't available yet.`;

  toast.info("Coming soon", {
    description: toastDescription,
    duration,
  });
};
