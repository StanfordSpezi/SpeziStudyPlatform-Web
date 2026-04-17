//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FieldLabelProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  description?: ReactNode;
}

export const FieldLabel = ({
  title,
  description,
  className,
  ...props
}: FieldLabelProps) => {
  return (
    <div className={cn("space-y-1.5 pb-1", className)} {...props}>
      <div className="font-normal">{title}</div>
      {description && (
        <div className="text-text-tertiary leading-tight font-normal text-pretty">
          {description}
        </div>
      )}
    </div>
  );
};
