//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { MinimalUserDropdown } from "../interfaces/Header/MinimalUserDropdown";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div
      className={cn(
        "[--layout-padding:--spacing(4)]",
        "flex-center relative size-full flex-col gap-10 p-(--layout-padding)",
      )}
    >
      <div className="bg-dots absolute inset-0 -z-10" />
      <div className="bg-bg absolute inset-0 -z-10 mask-radial-from-10% mask-radial-to-140%" />
      <div className="fixed top-4 right-4">
        <MinimalUserDropdown />
      </div>
      {children}
    </div>
  );
};
