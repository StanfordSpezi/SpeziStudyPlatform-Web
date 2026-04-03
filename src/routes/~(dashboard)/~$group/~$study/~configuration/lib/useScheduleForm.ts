//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast, useForm } from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import type { ComponentScheduleInput } from "@/lib/api/generated/types.gen";
import { zComponentSchedule } from "@/lib/api/generated/zod.gen";
import {
  componentListQueryOptions,
  scheduleListQueryOptions,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} from "@/lib/queries/component";
import { SCHEDULE_DEFAULTS } from "./scheduleTransforms";

export const useScheduleForm = () => {
  const params = useParams({
    from: "/(dashboard)/$group/$study/configuration/components/$componentType/$component",
  });

  const componentPath = {
    studyId: params.study,
    componentId: params.component,
  };

  const { data: schedules } = useQuery(scheduleListQueryOptions(componentPath));

  const { data: components } = useQuery(
    componentListQueryOptions({ studyId: params.study }),
  );

  const existingSchedule = schedules?.[0];
  const hasExistingSchedule = !!existingSchedule?.id;

  const form = useForm({
    formSchema: zComponentSchedule.omit({ id: true }),
    defaultValues: SCHEDULE_DEFAULTS,
  });

  useEffect(() => {
    if (existingSchedule) {
      const { id: _, ...scheduleWithoutId } = existingSchedule;
      form.reset(scheduleWithoutId);
    }
    // form.reset identity changes every render; including it would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingSchedule]);

  const createSchedule = useCreateScheduleMutation();
  const updateSchedule = useUpdateScheduleMutation();
  const deleteSchedule = useDeleteScheduleMutation();

  const submitSchedule = (data: ComponentScheduleInput, onSuccess: () => void) => {
    const scheduleId = existingSchedule?.id;

    if (scheduleId) {
      updateSchedule.mutate(
        { path: { ...componentPath, scheduleId }, body: data },
        {
          onSuccess: () => {
            toast.success("Schedule updated");
            onSuccess();
          },
        },
      );
    } else {
      createSchedule.mutate(
        { path: componentPath, body: data },
        {
          onSuccess: () => {
            toast.success("Schedule created");
            onSuccess();
          },
        },
      );
    }
  };

  const removeSchedule = (onSuccess: () => void) => {
    if (!existingSchedule?.id) return;
    deleteSchedule.mutate(
      { path: { ...componentPath, scheduleId: existingSchedule.id } },
      {
        onSuccess: () => {
          toast.success("Schedule deleted");
          form.reset(SCHEDULE_DEFAULTS);
          onSuccess();
        },
      },
    );
  };

  return {
    form,
    hasExistingSchedule,
    components: components ?? [],
    submitSchedule,
    removeSchedule,
  };
};
