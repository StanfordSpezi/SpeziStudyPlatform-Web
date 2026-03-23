//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useParams } from "@tanstack/react-router";
import { CriteriaDisplay } from "@/components/interfaces/CriteriaTreeBuilder";
import { Card, CardHeader } from "@/components/ui/Card";
import { EditButtonLink } from "@/components/ui/EditButton";
import type { Study } from "@/lib/api/types";

interface ParticipationCriteriaCardProps {
  study?: Study;
  isLoading?: boolean;
}

export const ParticipationCriteriaCard = ({
  study,
  isLoading,
}: ParticipationCriteriaCardProps) => {
  const params = useParams({
    from: "/(dashboard)/$group/$study/configuration/",
  });
  return (
    <Card>
      <CardHeader
        title="Participation criteria"
        description="Define who can participate in your study by setting participation criteria."
      >
        <EditButtonLink
          aria-label="Edit participation criteria"
          data-testid="edit-participation-criteria"
          from="/"
          to="/$group/$study/configuration/participation"
          params={params}
          className="h-8 text-sm"
        />
      </CardHeader>
      <div className="p-(--card-padding)">
        <CriteriaDisplay
          criterion={study?.participationCriterion}
          isLoading={isLoading}
        />
      </div>
    </Card>
  );
};
