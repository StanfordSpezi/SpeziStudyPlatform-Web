//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import { Bell } from "lucide-react";

export const Notifications = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={null}
          variant="ghost"
          aria-label="Notifications"
          className="size-8 rounded-md"
        >
          <Bell className="size-4 opacity-80" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You have no new notifications.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
