//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

export const Card = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "[--card-padding:--spacing(5)]",
        "bg-layer flex w-full flex-col rounded-xl border",
        "bg-clip-padding",
        "shadow-lg/3",
        className,
      )}
      {...props}
    />
  );
};

interface CardHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  title: ReactNode;
  description: ReactNode;
}

export const CardHeader = ({
  title,
  description,
  className,
  children,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between border-b p-(--card-padding)",
        className,
      )}
      {...props}
    >
      <div>
        <h2 className="text-text">{title}</h2>
        <p className="text-text-tertiary text-sm">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
