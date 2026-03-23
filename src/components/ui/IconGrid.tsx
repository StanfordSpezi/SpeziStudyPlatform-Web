//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  EmptyState,
  Input,
  Skeleton,
  times,
  upperFirst,
} from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { matchSorter } from "match-sorter";
import { memo, useMemo, useRef } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Virtualizer } from "virtua";
import type { iconsData } from "@/utils/iconsData";
import { ScrollArea } from "./ScrollArea";

const gridColumns = 8;
const visibleRows = 8;
const rowHeight = 32;

export type IconData = (typeof iconsData)[number];

const IconRenderer = memo(({ name }: { name: IconName }) => {
  return <DynamicIcon name={name} className="size-5 opacity-80" />;
});
IconRenderer.displayName = "IconRenderer";

const IconGridSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className="grid w-full gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
        }}
      >
        {times(gridColumns * visibleRows, (index) => (
          <Skeleton key={index} className="h-7 w-10 rounded-md" />
        ))}
      </div>
    </div>
  );
};

interface IconRowProps {
  icons: IconData[];
  onValueChange?: (value: IconName) => void;
}

const IconRow = memo(({ icons, onValueChange }: IconRowProps) => {
  return (
    <div
      className="grid w-full"
      style={{
        height: rowHeight,
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {icons.map((icon) => (
        <button
          key={icon.name}
          title={upperFirst(icon.name.split("-").join(" "))}
          className="flex-center hover:bg-layer-hover focus:bg-layer-hover rounded-md transition outline-none"
          onClick={() => onValueChange?.(icon.name as IconName)}
        >
          <IconRenderer name={icon.name as IconName} />
        </button>
      ))}
    </div>
  );
});

IconRow.displayName = "IconRow";

interface IconGridProps {
  searchTerm?: string;
  iconsList?: IconData[];
  onValueChange?: (value: IconName) => void;
}

export const IconGrid = ({
  searchTerm = "",
  iconsList,
  onValueChange,
}: IconGridProps) => {
  const { data: icons, isLoading } = useQuery({
    queryKey: ["icons-data"],
    queryFn: async () => {
      const { iconsData } = await import("../../utils/iconsData");
      return iconsData;
    },
    staleTime: "static",
    enabled: !iconsList,
  });
  const iconsToUse = iconsList ?? icons;

  const filteredIcons = useMemo(() => {
    if (!iconsToUse) return [];
    if (searchTerm.trim() === "") return iconsToUse;
    return matchSorter(iconsToUse, searchTerm, {
      keys: ["name", "tags", "categories"],
      threshold: matchSorter.rankings.CONTAINS,
    });
  }, [searchTerm, iconsToUse]);

  const iconRows = useMemo(() => {
    const rows: IconData[][] = [];
    for (let i = 0; i < filteredIcons.length; i += gridColumns) {
      rows.push(filteredIcons.slice(i, i + gridColumns));
    }
    return rows;
  }, [filteredIcons]);

  const scrollViewRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <IconGridSkeleton />;
  }

  if (filteredIcons.length === 0) {
    return (
      <EmptyState
        entityName="icon"
        className="flex-center"
        style={{ height: rowHeight * visibleRows }}
      />
    );
  }

  return (
    <ScrollArea
      type="always"
      scrollViewRef={scrollViewRef}
      className="pr-2"
      style={{ height: rowHeight * visibleRows }}
    >
      <Virtualizer
        data={iconRows}
        itemSize={rowHeight}
        scrollRef={scrollViewRef}
      >
        {(row, index) => (
          <IconRow key={index} icons={row} onValueChange={onValueChange} />
        )}
      </Virtualizer>
    </ScrollArea>
  );
};

interface IconSearchGridProps {
  searchPlaceholder: string;
  iconsList?: IconData[];
  onValueChange?: (value: IconName) => void;
}

export const IconSearchGrid = ({
  searchPlaceholder,
  iconsList,
  onValueChange,
}: IconSearchGridProps) => {
  const [searchTerm, setSearchTerm] = useDebounceValue("", 200);
  return (
    <div className="flex flex-col gap-4">
      <div className="pr-2">
        <Input
          type="search"
          aria-label="Search icons"
          placeholder={searchPlaceholder}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="[&::-webkit-search-cancel-button]:appearance-none"
        />
      </div>
      <IconGrid
        searchTerm={searchTerm}
        iconsList={iconsList}
        onValueChange={onValueChange}
      />
    </div>
  );
};
