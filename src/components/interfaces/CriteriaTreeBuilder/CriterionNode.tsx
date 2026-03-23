//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system";
import { Plus, Trash2 } from "lucide-react";
import type { ParticipationCriterion } from "@/lib/api/generated/types.gen";
import { cn } from "@/utils/cn";
import { LeafCriterionEditor } from "./LeafCriterionEditor";
import {
  CRITERION_TYPE_LABELS,
  GROUP_MATCH_TYPES,
  LEAF_CRITERION_TYPES,
  LEAF_OPERATORS,
  createDefaultCriterion,
  isLeafCriterionType,
  unwrapNegation,
} from "./types";

interface CriterionNodeProps {
  criterion: ParticipationCriterion;
  onChange: (criterion: ParticipationCriterion) => void;
  onRemove?: () => void;
  depth: number;
}

const RemoveButton = ({
  onRemove,
  label,
}: {
  onRemove: () => void;
  label: string;
}) => (
  <Button
    type="button"
    variant="ghost"
    size={null}
    onClick={onRemove}
    className="ml-auto size-8 shrink-0 rounded-md"
    aria-label={label}
  >
    <Trash2 className="size-4 opacity-80" />
  </Button>
);

const GroupCriterionNode = ({
  innerCriterion,
  isNegated,
  onChange,
  handleInnerChange,
  onRemove,
  depth,
}: {
  innerCriterion: Extract<ParticipationCriterion, { type: "all" | "any" }>;
  isNegated: boolean;
  onChange: (criterion: ParticipationCriterion) => void;
  handleInnerChange: (updated: ParticipationCriterion) => void;
  onRemove?: () => void;
  depth: number;
}) => {
  const currentMatchType = GROUP_MATCH_TYPES.find(
    (matchType) =>
      matchType.type === innerCriterion.type && matchType.negated === isNegated,
  );
  const matchTypeValue = currentMatchType?.value ?? "all";
  const connector = currentMatchType?.connector ?? "and";

  const handleMatchTypeChange = (value: string) => {
    const selectedMatchType = GROUP_MATCH_TYPES.find(
      (matchType) => matchType.value === value,
    );
    if (!selectedMatchType) return;
    const newInnerCriterion: ParticipationCriterion = {
      type: selectedMatchType.type,
      criteria: innerCriterion.criteria,
    };
    onChange(
      selectedMatchType.negated ?
        { type: "not", criterion: newInnerCriterion }
      : newInnerCriterion,
    );
  };

  const updateChildAt = (
    index: number,
    updatedCriterion: ParticipationCriterion,
  ) => {
    const updatedCriteria = [...innerCriterion.criteria];
    updatedCriteria[index] = updatedCriterion;
    handleInnerChange({ ...innerCriterion, criteria: updatedCriteria });
  };

  const removeChildAt = (index: number) => {
    const filteredCriteria = innerCriterion.criteria.filter(
      (_, childIndex) => childIndex !== index,
    );
    handleInnerChange({ ...innerCriterion, criteria: filteredCriteria });
  };

  const addChild = (criterion: ParticipationCriterion) => {
    handleInnerChange({
      ...innerCriterion,
      criteria: [...innerCriterion.criteria, criterion],
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-4",
        depth > 0 && "ml-6",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-text-secondary text-sm font-medium">Match:</span>
        <Select value={matchTypeValue} onValueChange={handleMatchTypeChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GROUP_MATCH_TYPES.map((matchType) => (
              <SelectItem key={matchType.value} value={matchType.value}>
                {matchType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {onRemove && <RemoveButton onRemove={onRemove} label="Remove group" />}
      </div>
      <div className="flex flex-col gap-0">
        {innerCriterion.criteria.map((child, index) => (
          <div key={index} className="flex flex-col">
            {index > 0 && (
              <div className="ml-6 flex items-center gap-2 py-1">
                <div className="border-border-tertiary flex-1 border-t" />
                <span className="text-text-tertiary text-xs uppercase">
                  {connector}
                </span>
                <div className="border-border-tertiary flex-1 border-t" />
              </div>
            )}
            <CriterionNode
              criterion={child}
              depth={depth + 1}
              onChange={(updated) => updateChildAt(index, updated)}
              onRemove={() => removeChildAt(index)}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addChild(createDefaultCriterion("ageAtLeast"))}
        >
          <Plus className="size-3.5" />
          Add rule
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addChild(createDefaultCriterion("all"))}
        >
          <Plus className="size-3.5" />
          Add group
        </Button>
      </div>
    </div>
  );
};

const LeafCriterionNode = ({
  innerCriterion,
  isNegated,
  onChange,
  handleInnerChange,
  handleTypeChange,
  onRemove,
  depth,
}: {
  innerCriterion: ParticipationCriterion;
  isNegated: boolean;
  onChange: (criterion: ParticipationCriterion) => void;
  handleInnerChange: (updated: ParticipationCriterion) => void;
  handleTypeChange: (newType: string) => void;
  onRemove?: () => void;
  depth: number;
}) => {
  const { type } = innerCriterion;
  if (!isLeafCriterionType(type)) return null;
  const operators = LEAF_OPERATORS[type];

  const handleOperatorChange = (value: string) => {
    if (value === "negated") {
      onChange({ type: "not", criterion: innerCriterion });
    } else {
      onChange(innerCriterion);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3",
        depth > 0 && "ml-6",
      )}
    >
      <Select value={innerCriterion.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LEAF_CRITERION_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {CRITERION_TYPE_LABELS[type]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        key={type}
        value={isNegated ? "negated" : "normal"}
        onValueChange={handleOperatorChange}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">{operators.normal}</SelectItem>
          <SelectItem value="negated">{operators.negated}</SelectItem>
        </SelectContent>
      </Select>
      <LeafCriterionEditor
        criterion={innerCriterion}
        onChange={handleInnerChange}
      />
      {onRemove && (
        <RemoveButton onRemove={onRemove} label="Remove criterion" />
      )}
    </div>
  );
};

export const CriterionNode = ({
  criterion,
  onChange,
  onRemove,
  depth,
}: CriterionNodeProps) => {
  const unwrappedCriterion = unwrapNegation(criterion);
  const innerCriterion = unwrappedCriterion ?? criterion;
  const isNegated = unwrappedCriterion !== null;

  const handleInnerChange = (updated: ParticipationCriterion) => {
    onChange(isNegated ? { type: "not", criterion: updated } : updated);
  };

  const handleTypeChange = (newType: string) => {
    if (!isLeafCriterionType(newType)) return;
    handleInnerChange(createDefaultCriterion(newType));
  };

  if (innerCriterion.type === "all" || innerCriterion.type === "any") {
    return (
      <GroupCriterionNode
        innerCriterion={innerCriterion}
        isNegated={isNegated}
        onChange={onChange}
        handleInnerChange={handleInnerChange}
        onRemove={onRemove}
        depth={depth}
      />
    );
  }

  return (
    <LeafCriterionNode
      innerCriterion={innerCriterion}
      isNegated={isNegated}
      onChange={onChange}
      handleInnerChange={handleInnerChange}
      handleTypeChange={handleTypeChange}
      onRemove={onRemove}
      depth={depth}
    />
  );
};
