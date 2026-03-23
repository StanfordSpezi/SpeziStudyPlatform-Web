//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@stanfordspezi/spezi-web-design-system";
import { useQueryClient } from "@tanstack/react-query";

const hasStringProperty = (
  object: object,
  key: string,
): object is Record<string, unknown> =>
  key in object && typeof (object as Record<string, unknown>)[key] === "string";

const getErrorDescription = (error: unknown): string | undefined => {
  if (typeof error !== "object" || error === null) return undefined;
  if (hasStringProperty(error, "detail")) return error.detail as string;
  if (hasStringProperty(error, "title")) return error.title as string;
  if (hasStringProperty(error, "message")) return error.message as string;
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
