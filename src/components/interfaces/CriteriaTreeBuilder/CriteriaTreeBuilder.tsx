//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { Plus, X } from "lucide-react";
import type { ParticipationCriterion } from "@/lib/api/generated/types.gen";
import { CriterionNode } from "./CriterionNode";
import { createDefaultCriterion } from "./types";

interface CriteriaTreeBuilderProps {
  value: ParticipationCriterion | null;
  onChange: (value: ParticipationCriterion | null) => void;
}

export const CriteriaTreeBuilder = ({
  value,
  onChange,
}: CriteriaTreeBuilderProps) => {
  if (value == null) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => onChange(createDefaultCriterion("all"))}
      >
        <Plus className="size-4" />
        Add participation criterion
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CriterionNode criterion={value} onChange={onChange} depth={0} />
      <div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(null)}
          className="text-text-tertiary"
        >
          <X className="size-3.5" />
          Clear all criteria
        </Button>
      </div>
    </div>
  );
};
