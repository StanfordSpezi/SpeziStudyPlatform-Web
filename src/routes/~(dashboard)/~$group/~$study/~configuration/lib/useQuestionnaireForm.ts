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
import type {
  QuestionnaireComponentData,
  QuestionnaireComponentInput,
  QuestionnaireComponentResponse,
  QuestionnaireContent,
} from "@/lib/api/generated/types.gen";
import { zQuestionnaireContent } from "@/lib/api/generated/zod.gen";
import { questionnaireRetrieveQueryOptions } from "@/lib/queries/component";

const questionnaireSchema = zQuestionnaireContent.extend({
  name: z.string().min(1, "Name is required"),
  questionnaire: z
    .string()
    .min(1, "Questionnaire JSON is required")
    .refine((value) => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }, "Invalid FHIR Questionnaire JSON"),
});

const defaultValues: z.infer<typeof questionnaireSchema> = {
  name: "",
  questionnaire: "",
};

const transformResponseToForm = (
  response: QuestionnaireComponentResponse,
  locale: string,
) => {
  const localeData = response.data[locale] as QuestionnaireContent | undefined;
  return {
    name: response.name,
    questionnaire: localeData?.questionnaire ?? "",
  };
};

const transformQuestionnaireFormToInput = (
  formData: z.infer<typeof questionnaireSchema>,
  locale: string,
  existingData?: QuestionnaireComponentData,
): QuestionnaireComponentInput => ({
  name: formData.name,
  data: {
    ...existingData,
    [locale]: {
      questionnaire: formData.questionnaire,
    },
  },
});

export const useQuestionnaireForm = (locale: string) => {
  const params = useParams({ strict: false });
  const isEditing = !!params.component && !!params.study;

  const { data: componentResponse } = useQuery({
    ...questionnaireRetrieveQueryOptions({
      studyId: params.study ?? "",
      componentId: params.component ?? "",
    }),
    enabled: isEditing,
  });

  const formValues =
    componentResponse ?
      transformResponseToForm(componentResponse, locale)
    : undefined;

  const form = useForm({
    formSchema: questionnaireSchema,
    defaultValues: formValues ?? defaultValues,
  });

  useEffect(() => {
    if (formValues) {
      form.reset(formValues);
    } else if (componentResponse) {
      form.reset({ ...defaultValues, name: componentResponse.name });
    }
    // form.reset identity changes every render; including it would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentResponse, locale]);

  const toInput = (formData: z.infer<typeof questionnaireSchema>) =>
    transformQuestionnaireFormToInput(
      formData,
      locale,
      componentResponse?.data,
    );

  return { form, componentData: componentResponse, toInput };
};

export type QuestionnaireForm = ReturnType<typeof useQuestionnaireForm>["form"];
