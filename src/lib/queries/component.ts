//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useMutation } from "@tanstack/react-query";
import { onMutationError, useInvalidateFn } from "./mutationCallbacks";
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

export const useDeleteComponentMutation = () =>
  useMutation({
    ...deleteStudiesByStudyIdComponentsByComponentIdMutation(),
    onSuccess: useInvalidateFn("getStudiesByStudyIdComponents"),
    onError: onMutationError("Error deleting component"),
  });

export const useCreateInformationalMutation = () =>
  useMutation({
    ...postStudiesByStudyIdComponentsInformationalMutation(),
    onSuccess: useInvalidateFn("getStudiesByStudyIdComponents"),
    onError: onMutationError("Error creating component"),
  });

export const useCreateQuestionnaireMutation = () =>
  useMutation({
    ...postStudiesByStudyIdComponentsQuestionnaireMutation(),
    onSuccess: useInvalidateFn("getStudiesByStudyIdComponents"),
    onError: onMutationError("Error creating component"),
  });

export const useCreateHealthDataMutation = () =>
  useMutation({
    ...postStudiesByStudyIdComponentsHealthDataMutation(),
    onSuccess: useInvalidateFn("getStudiesByStudyIdComponents"),
    onError: onMutationError("Error creating component"),
  });

export const useUpdateInformationalMutation = () =>
  useMutation({
    ...putStudiesByStudyIdComponentsInformationalByComponentIdMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyIdComponents",
      "getStudiesByStudyIdComponentsInformationalByComponentId",
    ),
    onError: onMutationError("Error updating component"),
  });

export const useUpdateQuestionnaireMutation = () =>
  useMutation({
    ...putStudiesByStudyIdComponentsQuestionnaireByComponentIdMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyIdComponents",
      "getStudiesByStudyIdComponentsQuestionnaireByComponentId",
    ),
    onError: onMutationError("Error updating component"),
  });

export const useUpdateHealthDataMutation = () =>
  useMutation({
    ...putStudiesByStudyIdComponentsHealthDataByComponentIdMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyIdComponents",
      "getStudiesByStudyIdComponentsHealthDataByComponentId",
    ),
    onError: onMutationError("Error updating component"),
  });

// --- Schedule mutations ---

export const useCreateScheduleMutation = () =>
  useMutation({
    ...postStudiesByStudyIdComponentsByComponentIdSchedulesMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyIdComponentsByComponentIdSchedules",
    ),
    onError: onMutationError("Error creating schedule"),
  });

export const useUpdateScheduleMutation = () =>
  useMutation({
    ...putStudiesByStudyIdComponentsByComponentIdSchedulesByScheduleIdMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyIdComponentsByComponentIdSchedules",
    ),
    onError: onMutationError("Error updating schedule"),
  });

export const useDeleteScheduleMutation = () =>
  useMutation({
    ...deleteStudiesByStudyIdComponentsByComponentIdSchedulesByScheduleIdMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyIdComponentsByComponentIdSchedules",
    ),
    onError: onMutationError("Error deleting schedule"),
  });
