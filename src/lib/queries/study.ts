//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useMutation } from "@tanstack/react-query";
import { onMutationError, useInvalidateFn } from "./mutationCallbacks";
import {
  getGroupsByGroupIdStudiesOptions,
  getStudiesByStudyIdOptions,
  postGroupsByGroupIdStudiesMutation,
  patchStudiesByStudyIdMutation,
} from "../api/generated/@tanstack/react-query.gen";
import type { StudyResponse } from "../api/generated/types.gen";
import { parseStudyResponse } from "../api/transforms";

// --- Queries ---

export const studyListQueryOptions = ({ groupId }: { groupId: string }) =>
  getGroupsByGroupIdStudiesOptions({
    path: { groupId },
  });

export const studyRetrieveQueryOptions = ({
  studyId,
}: {
  studyId: string;
}) => ({
  ...getStudiesByStudyIdOptions({ path: { studyId } }),
  select: (data: StudyResponse) => parseStudyResponse(data),
});

// --- Mutations ---

export const useCreateStudyMutation = () =>
  useMutation({
    ...postGroupsByGroupIdStudiesMutation(),
    onSuccess: useInvalidateFn("getGroupsByGroupIdStudies"),
    onError: onMutationError("Error creating study"),
  });

export const useUpdateStudyMutation = () =>
  useMutation({
    ...patchStudiesByStudyIdMutation(),
    onSuccess: useInvalidateFn(
      "getStudiesByStudyId",
      "getGroupsByGroupIdStudies",
    ),
    onError: onMutationError("Error saving study"),
  });
