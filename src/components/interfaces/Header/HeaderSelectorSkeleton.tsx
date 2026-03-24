//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Skeleton } from "@stanfordspezi/spezi-web-design-system";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";

export const HeaderSelectorSkeleton = ({ hasIcon }: { hasIcon: boolean }) => {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-3 rounded-md p-2.5 text-left text-sm outline-hidden",
        "hover:bg-bg-hover",
        "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "focus-visible:ring-2",
        "[&>span:last-child]:truncate",
        "[&>svg]:size-3.5 [&>svg]:shrink-0",
      )}
    >
      {hasIcon && (
        <div className="bg-surface flex-center border-border-secondary -ml-1.5 aspect-square size-6 rounded-md border bg-clip-padding shadow-xs">
          <div className="size-3.5" />
        </div>
      )}
      <div className="grid h-4 w-20 flex-1">
        <Skeleton className="bg-fill-tertiary size-full rounded-sm" />
      </div>
      <ChevronsUpDown className="ml-auto opacity-80" />
    </div>
  );
};
