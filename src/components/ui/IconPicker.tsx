//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  upperFirst,
} from "@stanfordspezi/spezi-web-design-system";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  useState,
  useCallback,
  type ComponentPropsWithoutRef,
  type ComponentProps,
} from "react";
import { IconSearchGrid, type IconData } from "./IconGrid";

interface IconPickerProps
  extends
    Omit<
      ComponentPropsWithoutRef<typeof PopoverTrigger>,
      "onSelect" | "onOpenChange"
    >,
    ComponentProps<typeof PopoverRoot> {
  value?: IconName;
  defaultValue?: IconName;
  onValueChange?: (value: IconName) => void;
  searchPlaceholder?: string;
  triggerPlaceholder?: string;
  iconsList?: IconData[];
}

export const IconPicker = ({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  searchPlaceholder = "Search for an icon...",
  triggerPlaceholder = "Select an icon",
  iconsList,
  modal = false,
  ...props
}: IconPickerProps) => {
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
    defaultValue,
  );
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isControlled = value !== undefined;
  const currentIcon = isControlled ? value : selectedIcon;
  const currentOpen = open ?? isOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange],
  );

  const handleValueChange = useCallback(
    (icon: IconName) => {
      if (!isControlled) {
        setSelectedIcon(icon);
      }
      onValueChange?.(icon);
      setIsOpen(false);
    },
    [isControlled, onValueChange],
  );

  return (
    <PopoverRoot
      open={currentOpen}
      onOpenChange={handleOpenChange}
      modal={modal}
    >
      <PopoverTrigger asChild {...props}>
        {children ?? (
          <Button variant="outline">
            {currentIcon ?
              <>
                <DynamicIcon
                  name={currentIcon}
                  className="size-4.5 opacity-80"
                />{" "}
                {upperFirst(currentIcon.split("-").join(" "))}
              </>
            : triggerPlaceholder}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-96 rounded-xl bg-clip-padding pr-2 shadow-xl shadow-black/5">
        <IconSearchGrid
          searchPlaceholder={searchPlaceholder}
          iconsList={iconsList}
          onValueChange={handleValueChange}
        />
      </PopoverContent>
    </PopoverRoot>
  );
};
