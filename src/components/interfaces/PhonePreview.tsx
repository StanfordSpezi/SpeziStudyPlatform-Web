//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { BlueprintContainer } from "../ui/BlueprintContainer";
import { PhoneMockup } from "../ui/PhoneMockup";

interface PhonePreviewProps {
  children?: ReactNode;
}

export const PhonePreview = ({ children }: PhonePreviewProps) => {
  return (
    <BlueprintContainer
      className={cn(
        "sticky",
        "top-[calc(var(--header-height)+var(--route-header-height)+var(--card-padding))]",
        "h-[calc(100vh-var(--header-height)-var(--route-header-height)-var(--card-padding)*2)]",
        "max-h-[36rem]",
      )}
    >
      <PhoneMockup>{children}</PhoneMockup>
      <div className="bg-bg text-text-tertiary absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-1 text-center text-xs leading-none">
        This is a preview
      </div>
    </BlueprintContainer>
  );
};
