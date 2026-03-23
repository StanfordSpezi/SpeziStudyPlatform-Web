//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { RouteHeader, RouteHeaderBackLink } from "@/components/ui/RouteHeader";

interface GeneralLayoutProps {
  children: ReactNode;
  saveButton: ReactNode;
}

export const GeneralLayout = ({ children, saveButton }: GeneralLayoutProps) => {
  return (
    <div>
      <RouteHeader
        title="General"
        description="Set your study's title, description, and how it appears to participants."
        accessoryLeft={<RouteHeaderBackLink />}
        accessoryRight={saveButton}
      />
      {children}
    </div>
  );
};
