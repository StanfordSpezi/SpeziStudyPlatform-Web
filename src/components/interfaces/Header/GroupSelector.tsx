//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Skeleton } from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import type { IconName } from "lucide-react/dynamic";
import { groupListQueryOptions } from "@/lib/queries/group";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
import { HeaderSelectorSkeleton } from "./HeaderSelectorSkeleton";

export const GroupSelector = () => {
  const params = useParams({ strict: false });
  const { data: groups } = useQuery(groupListQueryOptions());
  const selectedGroup = groups?.find((group) => group.id === params.group);

  if (!params.group) {
    return null;
  }

  if (!groups) {
    return <HeaderSelectorSkeleton hasIcon />;
  }

  const title = selectedGroup?.name ?? (
    <Skeleton className="bg-fill-tertiary h-4 w-20 rounded-sm" />
  );

  return (
    <HeaderSelector
      selectedItem={{
        title,
        icon: selectedGroup?.icon as IconName | undefined,
      }}
    >
      <HeaderSelectorMenuLabel>Groups</HeaderSelectorMenuLabel>
      {groups.map((group) => (
        <HeaderSelectorMenuItem
          key={group.id}
          icon={group.icon as IconName}
          linkOptions={{
            to: "/$group",
            params: {
              group: group.id,
            },
          }}
        >
          {group.name}
        </HeaderSelectorMenuItem>
      ))}
    </HeaderSelector>
  );
};
