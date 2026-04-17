//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface FeaturedIconContainerProps extends ComponentProps<"div"> {
  /**
   * Shorthand: renders a centered Lucide icon inside the container.
   * When provided, `children` is ignored.
   */
  icon?: LucideIcon;
}

/**
 * This component uses CSS variables to ensure that the nested container's rounded corners
 * are proportional to the border radius and padding of the outer container.
 *
 * Overwrite these variables to customize the appearance.
 * - `--container-padding`: Sets the padding of the outer container. Default: `--spacing(0.5)`.
 * - `--container-radius`: Sets the border radius of the outer container. Default: `var(--radius-xl)`.
 */
export const FeaturedIconContainer = ({
  children,
  icon: Icon,
  className,
}: FeaturedIconContainerProps) => {
  return (
    <div
      className={cn(
        "[--container-padding:--spacing(0.5)] [--container-radius:var(--radius-xl)]",
        "rounded-(--container-radius) p-(--container-padding)",
        "bg-surface size-12 border bg-clip-padding shadow",
        className,
      )}
    >
      <div className="size-full overflow-hidden rounded-[calc(var(--container-radius)-var(--container-padding))]">
        {Icon ?
          <div className="grid size-full place-items-center">
            <Icon className="text-text-tertiary size-4 opacity-80" />
          </div>
        : children}
      </div>
    </div>
  );
};
