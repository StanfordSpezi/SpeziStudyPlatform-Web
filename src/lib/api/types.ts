//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ParticipationCriterion } from "./generated/types.gen";

export type { GroupResponse as Group } from "./generated/types.gen";
export type { Component as ComponentSummary } from "./generated/types.gen";

/**
 * Flat, locale-resolved study shape used throughout the UI.
 */
export interface Study {
  id: string;
  locales: string[];
  icon: string;
  title: string;
  shortTitle?: string | null;
  explanationText?: string | null;
  shortExplanationText?: string | null;
  participationCriterion?: ParticipationCriterion | null;
}

// --- Components ---

export const COMPONENT_TYPE_LABELS = {
  informational: "Information",
  questionnaire: "Questionnaire",
  "health-data": "Health Data",
} as const;

export type ComponentType = keyof typeof COMPONENT_TYPE_LABELS;

export const COMPONENT_TYPES = Object.keys(COMPONENT_TYPE_LABELS) as [
  ComponentType,
  ...ComponentType[],
];

/**
 * Maps the backend Component.type string to the ComponentType used in URL path segments.
 */
export const normalizeComponentType = (raw: string): ComponentType => {
  switch (raw) {
    case "informational":
      return "informational";
    case "questionnaire":
      return "questionnaire";
    case "health-data":
    case "healthDataCollection":
      return "health-data";
    default:
      throw new Error(`Unknown component type: "${raw}"`);
  }
};

// --- Users ---

export interface User {
  name: string;
  email: string;
  imageUrl?: string;
  role: "admin" | "user";
}
