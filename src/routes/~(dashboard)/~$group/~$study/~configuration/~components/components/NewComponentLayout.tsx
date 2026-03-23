//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { useParams } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";
import { COMPONENT_TYPE_LABELS, normalizeComponentType } from "@/lib/api/types";
import { NewComponentDialog } from "../../components/ComponentsCard/NewComponentDialog";

interface NewComponentLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
}

export const NewComponentLayout = ({
  children,
  saveButton,
}: NewComponentLayoutProps) => {
  const {
    componentType = "informational",
    group,
    study,
  } = useParams({
    strict: false,
  });
  return (
    <div>
      <RouteHeader
        title={`New ${COMPONENT_TYPE_LABELS[normalizeComponentType(componentType)]} Component`}
        description="Configure the details of your new component."
        accessoryLeft={
          <RouteHeaderBackLink
            to="/$group/$study/configuration/components"
            params={{ group: group ?? "", study: study ?? "" }}
          />
        }
        accessoryRight={
          <div className="flex items-center gap-6">
            {/* We need to force a re-render when the component type changes
             to dismiss the modal after changing the component type */}
            <NewComponentDialog key={componentType}>
              <Button variant="outline" size="sm" className="text-sm">
                Change type
              </Button>
            </NewComponentDialog>
            {saveButton}
          </div>
        }
      />
      {children}
    </div>
  );
};
