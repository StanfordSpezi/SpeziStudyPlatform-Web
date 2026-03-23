//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type {
  ParticipationCriterion,
  StudyDetailContent,
  StudyDetailData,
  StudyPatchInput,
  StudyResponse,
} from "./generated/types.gen";
import type { Study } from "./types";

/**
 * Parses a backend StudyResponse into the flat Study shape used by the UI.
 */
export const parseStudyResponse = (
  response: StudyResponse,
  locale = "en-US",
): Study => {
  const localeDetails = response.details[locale] as
    | StudyDetailContent
    | undefined;
  return {
    id: response.id,
    locales: response.locales,
    icon: response.icon,
    title: localeDetails?.title ?? "",
    shortTitle: localeDetails?.shortTitle,
    explanationText: localeDetails?.explanationText,
    shortExplanationText: localeDetails?.shortExplanationText,
    participationCriterion: response.participationCriterion,
  };
};

/**
 * Wraps flat study fields into the StudyPatchInput shape expected by the PATCH endpoint.
 * Spreads existingDetails to preserve other locales on PATCH.
 */
export const toStudyPatchInput = (
  data: {
    icon?: string | null;
    title?: string | null;
    shortTitle?: string | null;
    explanationText?: string | null;
    shortExplanationText?: string | null;
    participationCriterion?: ParticipationCriterion | null;
  },
  locale = "en-US",
  existingDetails?: StudyDetailData,
): StudyPatchInput => {
  const { icon, participationCriterion, ...textFields } = data;
  const patchInput: StudyPatchInput = {};

  if (icon != null) {
    patchInput.icon = icon;
  }
  if (participationCriterion !== undefined) {
    patchInput.participationCriterion = participationCriterion ?? undefined;
  }

  const hasTextFields = Object.values(textFields).some(
    (value) => value != null,
  );
  if (!hasTextFields) return patchInput;

  const localeContent: StudyDetailContent = {
    title: textFields.title ?? "",
  };
  if (textFields.shortTitle != null)
    localeContent.shortTitle = textFields.shortTitle;
  if (textFields.explanationText != null)
    localeContent.explanationText = textFields.explanationText;
  if (textFields.shortExplanationText != null)
    localeContent.shortExplanationText = textFields.shortExplanationText;

  patchInput.details = { ...existingDetails, [locale]: localeContent };
  return patchInput;
};
