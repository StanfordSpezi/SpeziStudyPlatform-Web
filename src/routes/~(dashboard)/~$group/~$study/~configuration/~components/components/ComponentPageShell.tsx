//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { NavigationBlocker } from "@/components/interfaces/NavigationBlocker";
import { Card } from "@/components/ui/Card";
import { SaveButton } from "@/components/ui/SaveButton";

interface ComponentPageShellProps {
  form: { formState: { isDirty: boolean } };
  mutation: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    isIdle?: boolean;
  };
  onSubmit: () => void;
  layout: (props: { saveButton: ReactNode; children: ReactNode }) => ReactNode;
  /**
   * When true, blocks navigation only if the mutation hasn't started yet.
   * Useful for create pages where success navigates away.
   */
  blockOnlyWhileIdle?: boolean;
  children: ReactNode;
}

export const ComponentPageShell = ({
  form,
  mutation,
  onSubmit,
  layout: Layout,
  blockOnlyWhileIdle = false,
  children,
}: ComponentPageShellProps) => {
  useHotkeys(
    "meta+enter",
    () => {
      onSubmit();
    },
    { enableOnFormTags: ["input", "textarea"] },
  );

  const shouldBlock =
    form.formState.isDirty &&
    (!blockOnlyWhileIdle || (mutation.isIdle ?? true));

  return (
    <Layout
      saveButton={
        <SaveButton
          size="sm"
          className="text-sm"
          onClick={onSubmit}
          isPending={mutation.isPending}
          isSuccess={mutation.isSuccess}
          isError={mutation.isError}
        />
      }
    >
      <div className="flex max-w-4xl p-6">
        <Card>{children}</Card>
      </div>
      <NavigationBlocker shouldBlock={shouldBlock} />
    </Layout>
  );
};
