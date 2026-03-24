//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";

interface ParticipationLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
}

export const ParticipationLayout = ({
  children,
  saveButton,
}: ParticipationLayoutProps) => {
  return (
    <div>
      <RouteHeader
        title="Participation criteria"
        description="Define who can participate in your study by setting participation criteria."
        accessoryLeft={<RouteHeaderBackLink />}
        accessoryRight={saveButton}
      />
      {children}
    </div>
  );
};
