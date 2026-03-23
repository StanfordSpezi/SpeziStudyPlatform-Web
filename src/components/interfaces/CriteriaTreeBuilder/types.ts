//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type {
  AgeAtLeastCriterion,
  AllCriterion,
  AnyCriterion,
  IsFromRegionCriterion,
  ParticipationCriterion,
  SpeaksLanguageCriterion,
} from "@/lib/api/generated/types.gen";

export type LeafCriterionType = (
  | AgeAtLeastCriterion
  | IsFromRegionCriterion
  | SpeaksLanguageCriterion
)["type"];

type GroupCriterionType = (AllCriterion | AnyCriterion)["type"];

export const LEAF_CRITERION_TYPES: [LeafCriterionType, ...LeafCriterionType[]] =
  ["ageAtLeast", "isFromRegion", "speaksLanguage"];

export const isLeafCriterionType = (type: string): type is LeafCriterionType =>
  LEAF_CRITERION_TYPES.includes(type as LeafCriterionType);

export const CRITERION_TYPE_LABELS: Record<LeafCriterionType, string> = {
  ageAtLeast: "Age",
  isFromRegion: "Region",
  speaksLanguage: "Language",
};

export const LEAF_OPERATORS: Record<
  LeafCriterionType,
  { normal: string; negated: string }
> = {
  ageAtLeast: { normal: "is at least", negated: "is under" },
  isFromRegion: { normal: "is from", negated: "is not from" },
  speaksLanguage: { normal: "speaks", negated: "does not speak" },
};

interface GroupMatchType {
  value: string;
  type: GroupCriterionType;
  negated: boolean;
  label: string;
  connector: string;
}

export const GROUP_MATCH_TYPES: GroupMatchType[] = [
  {
    value: "all",
    type: "all",
    negated: false,
    label: "All of (AND)",
    connector: "and",
  },
  {
    value: "any",
    type: "any",
    negated: false,
    label: "Any of (OR)",
    connector: "or",
  },
  {
    value: "none",
    type: "any",
    negated: true,
    label: "None of (NOR)",
    connector: "or",
  },
  {
    value: "notAll",
    type: "all",
    negated: true,
    label: "Not all of (NAND)",
    connector: "and",
  },
];

export const createDefaultCriterion = (
  type: LeafCriterionType | GroupCriterionType,
): ParticipationCriterion => {
  switch (type) {
    case "ageAtLeast":
      return { type: "ageAtLeast", age: 18 };
    case "isFromRegion":
      return { type: "isFromRegion", region: "US" };
    case "speaksLanguage":
      return { type: "speaksLanguage", language: "en" };
    case "all":
      return { type: "all", criteria: [] };
    case "any":
      return { type: "any", criteria: [] };
  }
};

/**
 * Unwraps a NOT node, returning the inner criterion if negated, or null if not.
 */
export const unwrapNegation = (
  criterion: ParticipationCriterion,
): ParticipationCriterion | null => {
  if (criterion.type === "not") return criterion.criterion;
  return null;
};
