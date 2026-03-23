//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { Plus } from "lucide-react";
import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";
import { NewComponentDialog } from "../../components/ComponentsCard/NewComponentDialog";

interface ComponentsLayoutProps {
  children: ReactNode;
}

export const ComponentsLayout = ({ children }: ComponentsLayoutProps) => {
  return (
    <div>
      <RouteHeader
        title="Components"
        description="The building blocks that define what participants see and do in your study."
        accessoryLeft={<RouteHeaderBackLink />}
        accessoryRight={
          <NewComponentDialog>
            <Button size="sm" variant="outline" className="text-sm">
              <Plus className="size-3.5 opacity-80" />
              Add component
            </Button>
          </NewComponentDialog>
        }
      />
      {children}
    </div>
  );
};
