//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { componentListQueryOptions } from "@/lib/queries/component";
import { ComponentsLayout } from "./components/ComponentsLayout";
import { ComponentsCard } from "../components/ComponentsCard/ComponentsCard";

const ComponentsRoute = () => {
  const params = Route.useParams();
  const { data: components, ...componentsQuery } = useQuery(
    componentListQueryOptions({ studyId: params.study }),
  );
  return (
    <ComponentsLayout>
      <div className="flex max-w-7xl gap-8 p-6">
        <ComponentsCard
          components={components}
          isLoading={componentsQuery.isLoading}
          showHeader={false}
        />
      </div>
    </ComponentsLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$group/$study/configuration/components/",
)({
  component: ComponentsRoute,
});
