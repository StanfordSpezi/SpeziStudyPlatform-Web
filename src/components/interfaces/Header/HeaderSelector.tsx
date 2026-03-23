//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from "@tanstack/react-router";
import { ChevronsUpDown } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const HeaderSelectorMenuLabel = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <DropdownMenuLabel className="text-xs">{children}</DropdownMenuLabel>;
};

interface HeaderSelectorMenuItemProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  children: ReactNode;
  icon?: IconName;
  linkOptions?: ValidateLinkOptions<TRouter, TOptions>;
  onSelect?: () => void;
  className?: string;
}

export const HeaderSelectorMenuItem = <
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
>({
  children,
  icon,
  linkOptions,
  onSelect,
  className,
}: HeaderSelectorMenuItemProps<TRouter, TOptions>) => {
  const menuItemContent = (
    <>
      {icon && (
        <div className="flex-center size-6 rounded-sm border">
          <DynamicIcon name={icon} className="size-4 shrink-0 opacity-80" />
        </div>
      )}
      {children}
    </>
  );

  if (linkOptions) {
    return (
      <DropdownMenuItem className={cn("gap-2 p-2!", className)} asChild>
        <Link {...linkOptions}>{menuItemContent}</Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      className={cn("gap-2 p-2!", className)}
      onSelect={onSelect}
    >
      {menuItemContent}
    </DropdownMenuItem>
  );
};

export const HeaderSelector = ({
  selectedItem,
  children,
}: {
  selectedItem: { title: ReactNode; icon?: IconName };
  children: ReactNode;
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          data-element="header-selector"
          className={cn(
            "flex h-8 items-center gap-3 rounded-md p-2.5 text-left text-sm outline-hidden transition-colors",
            "hover:bg-bg-secondary-hover",
            "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
            "focus-visible:ring-border-focus focus-visible:ring-2",
            "[&>span:last-child]:truncate",
            "[&>svg]:size-3.5 [&>svg]:shrink-0",
          )}
        >
          {selectedItem.icon && (
            <div className="bg-surface border-border-secondary flex-center -ml-1.5 aspect-square size-6 rounded-md border bg-clip-padding shadow-xs">
              <DynamicIcon
                name={selectedItem.icon}
                className="size-3.5 opacity-80"
                strokeWidth={2}
              />
            </div>
          )}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate">{selectedItem.title}</span>
          </div>
          <ChevronsUpDown className="text-text-tertiary ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-60! rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
