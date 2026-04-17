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
import { zStudyDetailContent } from "@/lib/api/generated/zod.gen";
import { studyResponseQueryOptions } from "@/lib/queries/study";

// Extend the generated StudyDetailContent schema with icon and form-specific
// nullable semantics (form fields can be explicitly cleared)
const generalFormSchema = zStudyDetailContent.extend({
  title: z.string().min(1, "Title is required"),
  shortTitle: z.string().nullable(),
  icon: z.string().nullable(),
  explanationText: z.string().nullable(),
  shortExplanationText: z.string().nullable(),
});

const defaultValues: z.infer<typeof generalFormSchema> = {
  title: "",
  shortTitle: null,
  icon: null,
  explanationText: null,
  shortExplanationText: null,
};

/**
 * Creates the general study form for a specific locale.
 * Uses the raw StudyResponse so callers can access `details` for locale preservation on save.
 */
export const useGeneralForm = (locale: string) => {
  const params = useParams({
    from: "/(dashboard)/$group/$study/configuration/general",
  });
  const { data: studyResponse } = useQuery(
    studyResponseQueryOptions({ studyId: params.study }),
  );

  const localeDetails = studyResponse?.details[locale];

  const formValues =
    studyResponse ?
      {
        title: localeDetails?.title ?? "",
        shortTitle: localeDetails?.shortTitle ?? null,
        icon: studyResponse.icon,
        explanationText: localeDetails?.explanationText ?? null,
        shortExplanationText: localeDetails?.shortExplanationText ?? null,
      }
    : undefined;

  const form = useForm({
    formSchema: generalFormSchema,
    defaultValues: formValues ?? defaultValues,
  });

  useEffect(() => {
    if (formValues) {
      form.reset(formValues);
    }
    // form.reset identity changes every render; including it would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyResponse, locale]);

  return { form, studyResponse };
};

export type GeneralForm = ReturnType<typeof useGeneralForm>["form"];
