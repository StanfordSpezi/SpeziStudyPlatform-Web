//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Badge, Skeleton } from "@stanfordspezi/spezi-web-design-system";
import type { ParticipationCriterion } from "@/lib/api/generated/types.gen";
import {
  GROUP_MATCH_TYPES,
  LEAF_OPERATORS,
  isLeafCriterionType,
  unwrapNegation,
} from "./types";

interface CriteriaDisplayProps {
  criterion: ParticipationCriterion | null | undefined;
  isLoading?: boolean;
}

const LeafDisplay = ({
  criterion,
  negated,
}: {
  criterion: ParticipationCriterion;
  negated: boolean;
}) => {
  if (!isLeafCriterionType(criterion.type)) return null;
  const operators = LEAF_OPERATORS[criterion.type];
  const operator = negated ? operators.negated : operators.normal;

  switch (criterion.type) {
    case "ageAtLeast":
      return (
        <span>
          Age {operator} <strong>{criterion.age}</strong>
        </span>
      );
    case "isFromRegion":
      return (
        <span>
          Region {operator} <strong>{criterion.region}</strong>
        </span>
      );
    case "speaksLanguage":
      return (
        <span>
          Language: {operator} <strong>{criterion.language}</strong>
        </span>
      );
    default:
      return <span>Unknown criterion</span>;
  }
};

const CriterionDisplayNode = ({
  criterion,
}: {
  criterion: ParticipationCriterion;
}) => {
  const negatedInner = unwrapNegation(criterion);
  const innerCriterion = negatedInner ?? criterion;
  const isNegated = negatedInner !== null;

  if (innerCriterion.type === "all" || innerCriterion.type === "any") {
    const groupMatch = GROUP_MATCH_TYPES.find(
      (matchType) =>
        matchType.type === innerCriterion.type &&
        matchType.negated === isNegated,
    );
    const label = groupMatch?.label ?? "Group";
    const connector = innerCriterion.type === "all" ? "AND" : "OR";

    if (innerCriterion.criteria.length === 0) {
      return (
        <span className="text-text-tertiary text-sm">{label} (empty)</span>
      );
    }

    return (
      <div className="flex flex-col gap-1">
        <span className="text-text-secondary text-sm font-medium">{label}</span>
        <div className="ml-4 flex flex-col gap-1">
          {innerCriterion.criteria.map((child, index) => (
            <div key={index}>
              {index > 0 && (
                <div className="py-0.5">
                  <Badge variant="secondary" className="text-xs">
                    {connector}
                  </Badge>
                </div>
              )}
              <CriterionDisplayNode criterion={child} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <p className="text-sm">
      <LeafDisplay criterion={innerCriterion} negated={isNegated} />
    </p>
  );
};

export const CriteriaDisplay = ({
  criterion,
  isLoading,
}: CriteriaDisplayProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-36" />
      </div>
    );
  }

  if (criterion == null) {
    return <p className="text-text-tertiary text-sm">No criteria defined</p>;
  }

  return <CriterionDisplayNode criterion={criterion} />;
};
