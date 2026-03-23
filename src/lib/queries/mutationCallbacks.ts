//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";
import { useQueryClient } from "@tanstack/react-query";

const getErrorDescription = (error: unknown): string | undefined => {
  if (typeof error !== "object" || error === null) return undefined;
  const errorObject = error as Record<string, unknown>;
  if (typeof errorObject.detail === "string") return errorObject.detail;
  if (typeof errorObject.title === "string") return errorObject.title;
  if (typeof errorObject.message === "string") return errorObject.message;
  return undefined;
};

/**
 * Creates an onError callback that shows a toast with the given message.
 * Handles both backend ProblemDetails ({ title, detail }) and standard Errors.
 */
export const onMutationError = (message: string) => (error: unknown) =>
  toast.error(message, {
    description: getErrorDescription(error),
    duration: 5000,
  });

/**
 * Hook that returns a callback to invalidate queries by their generated operation IDs.
 * Must be called at the top level of a custom hook (e.g. inside use*Mutation factories).
 */
export const useInvalidateFn = (...ids: string[]) => {
  const queryClient = useQueryClient();
  return () =>
    Promise.all(
      ids.map((id) =>
        queryClient.invalidateQueries({ queryKey: [{ _id: id }] }),
      ),
    );
};
