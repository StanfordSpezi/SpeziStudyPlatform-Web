//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createMutationHook } from "./mutationCallbacks";
import {
  getStudiesByStudyIdComponentsOptions,
  getStudiesByStudyIdComponentsInformationalByComponentIdOptions,
  getStudiesByStudyIdComponentsQuestionnaireByComponentIdOptions,
  getStudiesByStudyIdComponentsHealthDataByComponentIdOptions,
  getStudiesByStudyIdComponentsByComponentIdSchedulesOptions,
  deleteStudiesByStudyIdComponentsByComponentIdMutation,
  postStudiesByStudyIdComponentsByComponentIdSchedulesMutation,
  postStudiesByStudyIdComponentsInformationalMutation,
  postStudiesByStudyIdComponentsQuestionnaireMutation,
  postStudiesByStudyIdComponentsHealthDataMutation,
  putStudiesByStudyIdComponentsInformationalByComponentIdMutation,
  putStudiesByStudyIdComponentsQuestionnaireByComponentIdMutation,
  putStudiesByStudyIdComponentsHealthDataByComponentIdMutation,
  putStudiesByStudyIdComponentsByComponentIdSchedulesByScheduleIdMutation,
  deleteStudiesByStudyIdComponentsByComponentIdSchedulesByScheduleIdMutation,
} from "../api/generated/@tanstack/react-query.gen";

// --- Queries ---

export const componentListQueryOptions = ({ studyId }: { studyId: string }) =>
  getStudiesByStudyIdComponentsOptions({ path: { studyId } });

export const informationalRetrieveQueryOptions = ({
  studyId,
  componentId,
}: {
  studyId: string;
  componentId: string;
}) =>
  getStudiesByStudyIdComponentsInformationalByComponentIdOptions({
    path: { studyId, componentId },
  });

export const questionnaireRetrieveQueryOptions = ({
  studyId,
  componentId,
}: {
  studyId: string;
  componentId: string;
}) =>
  getStudiesByStudyIdComponentsQuestionnaireByComponentIdOptions({
    path: { studyId, componentId },
  });

export const healthDataRetrieveQueryOptions = ({
  studyId,
  componentId,
}: {
  studyId: string;
  componentId: string;
}) =>
  getStudiesByStudyIdComponentsHealthDataByComponentIdOptions({
    path: { studyId, componentId },
  });

export const scheduleListQueryOptions = ({
  studyId,
  componentId,
}: {
  studyId: string;
  componentId: string;
}) =>
  getStudiesByStudyIdComponentsByComponentIdSchedulesOptions({
    path: { studyId, componentId },
  });

// --- Component mutations ---

export const useDeleteComponentMutation = createMutationHook(
  deleteStudiesByStudyIdComponentsByComponentIdMutation,
  "Error deleting component",
  "getStudiesByStudyIdComponents",
);

export const useCreateInformationalMutation = createMutationHook(
  postStudiesByStudyIdComponentsInformationalMutation,
  "Error creating component",
  "getStudiesByStudyIdComponents",
);

export const useCreateQuestionnaireMutation = createMutationHook(
  postStudiesByStudyIdComponentsQuestionnaireMutation,
  "Error creating component",
  "getStudiesByStudyIdComponents",
);

export const useCreateHealthDataMutation = createMutationHook(
  postStudiesByStudyIdComponentsHealthDataMutation,
  "Error creating component",
  "getStudiesByStudyIdComponents",
);

export const useUpdateInformationalMutation = createMutationHook(
  putStudiesByStudyIdComponentsInformationalByComponentIdMutation,
  "Error updating component",
  "getStudiesByStudyIdComponents",
  "getStudiesByStudyIdComponentsInformationalByComponentId",
);

export const useUpdateQuestionnaireMutation = createMutationHook(
  putStudiesByStudyIdComponentsQuestionnaireByComponentIdMutation,
  "Error updating component",
  "getStudiesByStudyIdComponents",
  "getStudiesByStudyIdComponentsQuestionnaireByComponentId",
);

export const useUpdateHealthDataMutation = createMutationHook(
  putStudiesByStudyIdComponentsHealthDataByComponentIdMutation,
  "Error updating component",
  "getStudiesByStudyIdComponents",
  "getStudiesByStudyIdComponentsHealthDataByComponentId",
);

// --- Schedule mutations ---

export const useCreateScheduleMutation = createMutationHook(
  postStudiesByStudyIdComponentsByComponentIdSchedulesMutation,
  "Error creating schedule",
  "getStudiesByStudyIdComponentsByComponentIdSchedules",
);

export const useUpdateScheduleMutation = createMutationHook(
  putStudiesByStudyIdComponentsByComponentIdSchedulesByScheduleIdMutation,
  "Error updating schedule",
  "getStudiesByStudyIdComponentsByComponentIdSchedules",
);

export const useDeleteScheduleMutation = createMutationHook(
  deleteStudiesByStudyIdComponentsByComponentIdSchedulesByScheduleIdMutation,
  "Error deleting schedule",
  "getStudiesByStudyIdComponentsByComponentIdSchedules",
);
