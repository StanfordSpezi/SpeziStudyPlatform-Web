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
  HealthDataComponentInput,
  HealthDataComponentResponse,
} from "@/lib/api/generated/types.gen";
import { zSampleTypesCollection } from "@/lib/api/generated/zod.gen";
import { healthDataRetrieveQueryOptions } from "@/lib/queries/component";

const healthDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sampleTypes: zSampleTypesCollection.min(
    1,
    "At least one sample type is required",
  ),
});

const defaultValues: z.infer<typeof healthDataSchema> = {
  name: "Health Data",
  sampleTypes: [],
};

const transformResponseToForm = (response: HealthDataComponentResponse) => ({
  name: response.name,
  sampleTypes: response.data.sampleTypes,
});

const transformHealthDataFormToInput = (
  formData: z.infer<typeof healthDataSchema>,
): HealthDataComponentInput => ({
  name: formData.name,
  data: {
    sampleTypes: formData.sampleTypes,
  },
});

export const useHealthDataForm = () => {
  const params = useParams({ strict: false });
  const isEditing = !!params.component && !!params.study;

  const { data: componentResponse } = useQuery({
    ...healthDataRetrieveQueryOptions({
      studyId: params.study ?? "",
      componentId: params.component ?? "",
    }),
    enabled: isEditing,
  });

  const formValues =
    componentResponse ? transformResponseToForm(componentResponse) : undefined;

  const form = useForm({
    formSchema: healthDataSchema,
    defaultValues: formValues ?? defaultValues,
  });

  useEffect(() => {
    if (formValues) form.reset(formValues);
    // form.reset identity changes every render; including it would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentResponse]);

  return {
    form,
    componentData: componentResponse,
    toInput: transformHealthDataFormToInput,
  };
};

export type HealthDataForm = ReturnType<typeof useHealthDataForm>["form"];
