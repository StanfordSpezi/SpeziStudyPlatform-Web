//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  ConfirmDeleteDialog,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";
import { useNavigate, useParams } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";
import { useDeleteComponentMutation } from "@/lib/queries/component";
import { ScheduleDialog } from "./ScheduleDialog";

interface EditComponentLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
  showScheduleButton?: boolean;
}

export const EditComponentLayout = ({
  children,
  saveButton,
  showScheduleButton = true,
}: EditComponentLayoutProps) => {
  const params = useParams({
    from: "/(dashboard)/$group/$study/configuration/components/$componentType/$component",
  });
  const navigate = useNavigate();
  const deleteDialog = useOpenState();
  const deleteComponent = useDeleteComponentMutation();

  const handleDelete = async () => {
    await deleteComponent.mutateAsync({
      path: {
        studyId: params.study,
        componentId: params.component,
      },
    });
    await navigate({
      to: "/$group/$study/configuration/components",
      params: { group: params.group, study: params.study },
    });
    deleteDialog.close();
  };

  return (
    <>
      <div>
        <RouteHeader
          title="Edit component"
          description="Configure the details of your component."
          accessoryLeft={
            <RouteHeaderBackLink
              to="/$group/$study/configuration/components"
              params={{ group: params.group, study: params.study }}
            />
          }
          accessoryRight={
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={deleteDialog.open}
              >
                Delete
              </Button>
              {showScheduleButton && <ScheduleDialog />}
              {saveButton}
            </div>
          }
        />
        {children}
      </div>
      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.setIsOpen}
        entityName="component"
        onDelete={handleDelete}
      />
    </>
  );
};
