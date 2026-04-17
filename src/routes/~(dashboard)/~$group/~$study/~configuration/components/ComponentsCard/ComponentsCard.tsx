//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, DataTable } from "@stanfordspezi/spezi-web-design-system";
import { createColumnHelper } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { type ComponentSummary, normalizeComponentType } from "@/lib/api/types";
import { cn } from "@/utils/cn";
import { ComponentsCardEmpty } from "./ComponentsCardEmpty";
import {
  ComponentsCardRowActions,
  ComponentsCardRowLabel,
} from "./ComponentsCardRow";
import { NewComponentDialog } from "./NewComponentDialog";
import { getComponentLabel } from "../../lib/formatComponent";

const columnHelper = createColumnHelper<ComponentSummary>();

const columns = [
  columnHelper.accessor(getComponentLabel, {
    id: "label",
    header: "Component",
    cell: (cellContext) => {
      const label = cellContext.getValue();
      return (
        <ComponentsCardRowLabel
          label={label}
          componentId={cellContext.row.original.id}
          componentType={normalizeComponentType(cellContext.row.original.type)}
        />
      );
    },
    maxSize: 200,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: (cellContext) => (
      <span className="min-w-0 truncate">{cellContext.getValue()}</span>
    ),
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
    cell: (cellContext) => (
      <span className="min-w-0 truncate capitalize">
        {cellContext.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("id", {
    id: "actions",
    header: "Actions",
    cell: (cellContext) => (
      <ComponentsCardRowActions
        componentId={cellContext.getValue()}
        componentType={normalizeComponentType(cellContext.row.original.type)}
      />
    ),
    minSize: 50,
    maxSize: 50,
  }),
];

interface ComponentsCardContentProps {
  components?: ComponentSummary[];
  isLoading?: boolean;
}

const ComponentsCardContent = ({
  components,
  isLoading,
}: ComponentsCardContentProps) => {
  return (
    <DataTable
      loading={isLoading}
      entityName="components"
      columns={columns}
      data={components ?? []}
      bordered={false}
      className={cn(
        "!bg-layer",
        "[&_th]:bg-fill-secondary",
        "[&_th:last-of-type_button]:!hidden", // Hide the "Action" header button
      )}
    />
  );
};

const ComponentsCardHeader = () => {
  return (
    <CardHeader
      title="Components"
      description="The building blocks that define what participants see and do in your study."
    >
      <NewComponentDialog>
        <Button size="sm" variant="outline" className="!h-8 text-sm">
          <Plus className="size-3.5 opacity-80" />
          Add component
        </Button>
      </NewComponentDialog>
    </CardHeader>
  );
};

interface ComponentsCardProps {
  components?: ComponentSummary[];
  isLoading?: boolean;
  showHeader?: boolean;
}

export const ComponentsCard = ({
  components,
  isLoading,
  showHeader = true,
}: ComponentsCardProps) => {
  if (components?.length === 0) {
    return <ComponentsCardEmpty />;
  }

  return (
    <Card className="overflow-hidden">
      {showHeader && <ComponentsCardHeader />}
      <ComponentsCardContent components={components} isLoading={isLoading} />
    </Card>
  );
};
