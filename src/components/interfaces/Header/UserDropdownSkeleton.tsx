//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Avatar } from "@stanfordspezi/spezi-web-design-system";
import { cn } from "@/utils/cn";

export const UserDropdownSkeleton = () => {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-3 rounded-md p-1 text-left text-sm outline-hidden",
        "hover:bg-bg-hover",
        "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "focus-visible:ring-2",
        "[&>span:last-child]:truncate",
        "[&>svg]:size-3.5 [&>svg]:shrink-0",
      )}
    >
      <Avatar
        size={null}
        className="bg-surface border-border-secondary size-6.5 rounded-full border bg-clip-padding shadow-xs"
        fallback={<div className="bg-surface rounded-lg text-xs" />}
      />
    </div>
  );
};
