//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Avatar } from "@stanfordspezi/spezi-web-design-system";
import { Shield } from "lucide-react";
import { cn } from "@/utils/cn";

interface UserAvatarProps {
  user: {
    name: string;
    imageUrl?: string;
    role: "user" | "admin";
  };
  /**
   * To style the sizing of the avatar and badge, you need to set the
   * `--avatar-size` CSS variable
   * @example
   * className="[--avatar-size:--spacing(6.5)]"`
   */
  className?: string;
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <Avatar
      size={null}
      className={cn(
        "[--avatar-size:--spacing(6.5)]",
        "bg-surface border-border-secondary size-(--avatar-size) rounded-full border bg-clip-padding p-0.5 text-xs shadow-xs",
        className,
      )}
      src={user.imageUrl}
      fallback={
        <div className="flex-center bg-background size-full rounded-full">
          {user.name[0].toUpperCase()}
        </div>
      }
      overlay={
        user.role === "admin" && (
          <div
            className={cn(
              "[--badge-offset:calc(var(--avatar-size)/8)]",
              "absolute -right-(--badge-offset) -bottom-(--badge-offset) p-[calc(var(--avatar-size)/16)]",
              "flex-center bg-fill-info size-[calc(var(--avatar-size)/2)] rounded-full border",
            )}
          >
            <Shield className="fill-text-info-on-fill size-fill stroke-0" />
          </div>
        )
      }
    />
  );
};
