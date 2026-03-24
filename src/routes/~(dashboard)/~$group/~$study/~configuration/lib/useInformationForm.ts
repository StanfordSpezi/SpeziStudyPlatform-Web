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
  InformationalComponentData,
  InformationalComponentInput,
  InformationalComponentResponse,
  InformationalContent,
} from "@/lib/api/generated/types.gen";
import { zInformationalContent } from "@/lib/api/generated/zod.gen";
import { informationalRetrieveQueryOptions } from "@/lib/queries/component";

const informationSchema = zInformationalContent.extend({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const defaultValues: z.infer<typeof informationSchema> = {
  name: "",
  title: "",
  lede: "",
  content: "",
};

const transformResponseToForm = (
  response: InformationalComponentResponse,
  locale: string,
) => {
  const localeData = response.data[locale] as InformationalContent | undefined;
  return {
    name: response.name,
    title: localeData?.title ?? "",
    lede: localeData?.lede ?? "",
    content: localeData?.content ?? "",
  };
};

const transformInformationFormToInput = (
  formData: z.infer<typeof informationSchema>,
  locale: string,
  existingData?: InformationalComponentData,
): InformationalComponentInput => ({
  name: formData.name,
  data: {
    ...existingData,
    [locale]: {
      title: formData.title,
      lede: formData.lede,
      content: formData.content,
    },
  },
});

export const useInformationForm = (locale: string) => {
  const params = useParams({ strict: false });
  const isEditing = !!params.component && !!params.study;

  const { data: componentResponse } = useQuery({
    ...informationalRetrieveQueryOptions({
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
    formSchema: informationSchema,
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

  const toInput = (formData: z.infer<typeof informationSchema>) =>
    transformInformationFormToInput(formData, locale, componentResponse?.data);

  return { form, componentData: componentResponse, toInput };
};

export type InformationForm = ReturnType<typeof useInformationForm>["form"];
