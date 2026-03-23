//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { Component } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { cn } from "@/utils/cn";
import { NewComponentDialog } from "./NewComponentDialog";

export const ComponentsCardEmpty = () => {
  return (
    <Card>
      <div className="bg-dots size-full">
        <div
          className={cn(
            "from-layer size-full bg-radial from-50%",
            "flex-center flex-col gap-4 p-12 text-center",
          )}
        >
          <FeaturedIconContainer className="size-9 [--container-radius:var(--radius-lg)]">
            <div className="bg-bg flex-center size-full inset-shadow-sm">
              <Component className="size-4 opacity-80" />
            </div>
          </FeaturedIconContainer>
          <div className="flex-center flex-col gap-0.5 text-sm">
            <h1 className="max-w-48 font-medium text-balance">
              No components yet
            </h1>
            <p className="text-text-tertiary">
              Add your first component to begin building your study.
            </p>
          </div>
          <NewComponentDialog>
            <Button size="sm" className="!h-8 text-sm">
              Create component
            </Button>
          </NewComponentDialog>
        </div>
      </div>
    </Card>
  );
};
