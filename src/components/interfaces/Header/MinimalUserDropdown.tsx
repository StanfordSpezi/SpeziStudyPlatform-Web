//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@stanfordspezi/spezi-web-design-system";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { UserAvatar } from "@/components/interfaces/Header/UserAvatar";
import { UserDropdownSkeleton } from "@/components/interfaces/Header/UserDropdownSkeleton";
import { useAuth } from "@/lib/auth/AuthProvider";

export const MinimalUserDropdown = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    queryClient.clear();
    await logout();
    await navigate({ to: "/sign-in" });
  };

  if (!user) {
    return <UserDropdownSkeleton />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={null}
          className="size-10 rounded-md"
          aria-label="User menu"
        >
          <UserAvatar
            user={user}
            className="text-sm [--avatar-size:--spacing(8)]"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-60! rounded-lg"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-4 font-normal">
            <UserAvatar
              user={user}
              className="text-sm [--avatar-size:--spacing(8)]"
            />
            <div>
              <div className="text-sm">{user.name}</div>
              <div className="text-text-tertiary text-xs">
                {user.email}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="size-3.5 opacity-80" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
