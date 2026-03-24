//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { normalizeComponentType } from "@/lib/api/types";
import { useLocale } from "@/lib/locale";
import {
  useUpdateInformationalMutation,
  useUpdateQuestionnaireMutation,
  useUpdateHealthDataMutation,
} from "@/lib/queries/component";
import { useHealthDataForm } from "../../lib/useHealthDataForm";
import { useInformationForm } from "../../lib/useInformationForm";
import { useQuestionnaireForm } from "../../lib/useQuestionnaireForm";
import { ComponentPageShell } from "../components/ComponentPageShell";
import { EditComponentLayout } from "../components/EditComponentLayout";
import { HealthDataComponentForm } from "../components/HealthDataComponentForm";
import { InformationComponentForm } from "../components/InformationComponentForm";
import { QuestionnaireComponentForm } from "../components/QuestionnaireComponentForm";

const EditInformationPage = () => {
  const params = Route.useParams();
  const { locale } = useLocale();
  const { form, toInput } = useInformationForm(locale);
  const mutation = useUpdateInformationalMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        path: { studyId: params.study, componentId: params.component },
        body: toInput(data),
      },
      {
        onSuccess: () => {
          form.reset(form.getValues());
        },
      },
    );
  });

  return (
    <ComponentPageShell
      form={form}
      mutation={mutation}
      onSubmit={handleSubmit}
      layout={EditComponentLayout}
    >
      <InformationComponentForm form={form} onSubmit={handleSubmit} />
    </ComponentPageShell>
  );
};

const EditQuestionnairePage = () => {
  const params = Route.useParams();
  const { locale } = useLocale();
  const { form, toInput } = useQuestionnaireForm(locale);
  const mutation = useUpdateQuestionnaireMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        path: { studyId: params.study, componentId: params.component },
        body: toInput(data),
      },
      {
        onSuccess: () => {
          form.reset(form.getValues());
        },
      },
    );
  });

  return (
    <ComponentPageShell
      form={form}
      mutation={mutation}
      onSubmit={handleSubmit}
      layout={EditComponentLayout}
    >
      <QuestionnaireComponentForm form={form} onSubmit={handleSubmit} />
    </ComponentPageShell>
  );
};

const HealthDataEditLayout = (props: {
  saveButton: ReactNode;
  children: ReactNode;
}) => <EditComponentLayout showScheduleButton={false} {...props} />;

const EditHealthDataPage = () => {
  const params = Route.useParams();
  const { form, toInput } = useHealthDataForm();
  const mutation = useUpdateHealthDataMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        path: { studyId: params.study, componentId: params.component },
        body: toInput(data),
      },
      {
        onSuccess: () => {
          form.reset(form.getValues());
        },
      },
    );
  });

  return (
    <ComponentPageShell
      form={form}
      mutation={mutation}
      onSubmit={handleSubmit}
      layout={HealthDataEditLayout}
    >
      <HealthDataComponentForm form={form} onSubmit={handleSubmit} />
    </ComponentPageShell>
  );
};

const EditComponentRoute = () => {
  const { componentType } = Route.useParams();
  const normalized = normalizeComponentType(componentType);

  switch (normalized) {
    case "informational":
      return <EditInformationPage />;
    case "questionnaire":
      return <EditQuestionnairePage />;
    case "health-data":
      return <EditHealthDataPage />;
    default: {
      const _exhaustiveCheck: never = normalized;
      return _exhaustiveCheck;
    }
  }
};

export const Route = createFileRoute(
  "/(dashboard)/$group/$study/configuration/components/$componentType/$component",
)({
  component: EditComponentRoute,
});
