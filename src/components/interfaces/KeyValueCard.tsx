//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Skeleton,
  Tooltip,
  type Nil,
} from "@stanfordspezi/spezi-web-design-system";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Card, CardHeader } from "../ui/Card";

interface KeyValueCardProps {
  title: string;
  description: string;
  actions?: ReactNode;
  isLoading?: boolean;
  items: Array<{
    key: string;
    tooltip?: string;
    value: Nil<ReactNode>;
  }>;
}

export const KeyValueCard = ({
  title,
  description,
  actions,
  isLoading,
  items,
}: KeyValueCardProps) => {
  return (
    <Card>
      <CardHeader title={title} description={description}>
        {actions}
      </CardHeader>
      <ul
        className={cn(
          "[--row-py:--spacing(4)]",
          "divide-border-tertiary flex flex-col divide-y",
          "pb-[calc(var(--card-padding)-var(--row-py))]",
        )}
      >
        {items.map((item) => (
          <li key={item.key} className="flex px-(--card-padding) py-(--row-py)">
            <div className="flex-1">
              <Tooltip
                side="right"
                variant="inverted"
                delayDuration={500}
                className="max-w-lg text-sm"
                sideOffset={10}
                open={!item.tooltip ? false : undefined}
                tooltip={item.tooltip}
              >
                <p
                  className={cn(
                    "inline-block text-sm",
                    "decoration-text-secondary/50 decoration-dotted underline-offset-2",
                    item.tooltip && "underline",
                  )}
                >
                  {item.key}
                </p>
              </Tooltip>
            </div>
            <div className="flex flex-1 items-center text-sm">
              {isLoading ?
                <Skeleton className="h-4 w-full" />
              : <p className="line-clamp-2">{item.value ?? "---"}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};
