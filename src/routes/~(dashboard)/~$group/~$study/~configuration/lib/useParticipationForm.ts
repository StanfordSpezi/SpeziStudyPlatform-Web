//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useForm } from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import type { ParticipationCriterion } from "@/lib/api/generated/types.gen";
import { zParticipationCriterion } from "@/lib/api/generated/zod.gen";
import { studyRetrieveQueryOptions } from "@/lib/queries/study";

const participationFormSchema = z.object({
  // z.custom wrapper needed: zParticipationCriterion infers as `any` due to recursive z.lazy in generated code
  participationCriterion: z
    .custom<ParticipationCriterion>()
    .refine((value) => zParticipationCriterion.safeParse(value).success, {
      message: "Invalid participation criterion",
    })
    .nullable(),
});

const defaultValues: z.infer<typeof participationFormSchema> = {
  participationCriterion: null,
};

/**
 * Creates a participation form that loads the study participation criterion once available.
 */
export const useParticipationForm = () => {
  const params = useParams({
    from: "/(dashboard)/$group/$study/configuration/participation",
  });
  const { data: study } = useQuery(
    studyRetrieveQueryOptions({ studyId: params.study }),
  );

  const formValues =
    study ?
      { participationCriterion: study.participationCriterion ?? null }
    : undefined;

  const form = useForm({
    formSchema: participationFormSchema,
    defaultValues: formValues ?? defaultValues,
  });

  useEffect(() => {
    if (formValues) {
      form.reset(formValues);
    }
    // form.reset identity changes every render; including it would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [study]);

  return { form };
};

export type ParticipationForm = ReturnType<typeof useParticipationForm>["form"];
