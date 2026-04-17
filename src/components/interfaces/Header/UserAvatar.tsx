//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Avatar } from "@stanfordspezi/spezi-web-design-system";
import { cn } from "@/utils/cn";

interface UserAvatarProps {
  user: {
    name: string;
    imageUrl?: string;
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
    />
  );
};
