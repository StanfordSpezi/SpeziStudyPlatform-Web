//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { normalizeComponentType } from "@/lib/api/types";
import { useLocale } from "@/lib/locale";
import {
  useCreateInformationalMutation,
  useCreateQuestionnaireMutation,
  useCreateHealthDataMutation,
} from "@/lib/queries/component";
import { useHealthDataForm } from "../../lib/useHealthDataForm";
import { useInformationForm } from "../../lib/useInformationForm";
import { useQuestionnaireForm } from "../../lib/useQuestionnaireForm";
import { ComponentPageShell } from "../components/ComponentPageShell";
import { HealthDataComponentForm } from "../components/HealthDataComponentForm";
import { InformationComponentForm } from "../components/InformationComponentForm";
import { NewComponentLayout } from "../components/NewComponentLayout";
import { QuestionnaireComponentForm } from "../components/QuestionnaireComponentForm";

const useNavigateToComponentList = () => {
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  return () =>
    void navigate({
      to: "/$group/$study/configuration/components",
      params: { group: params.group, study: params.study },
    });
};

const NewInformationPage = () => {
  const params = Route.useParams();
  const navigateToList = useNavigateToComponentList();
  const { locale } = useLocale();
  const { form, toInput } = useInformationForm(locale);
  const mutation = useCreateInformationalMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        path: { studyId: params.study },
        body: toInput(data),
      },
      {
        onSuccess: () => {
          form.reset(form.getValues());
          navigateToList();
        },
      },
    );
  });

  return (
    <ComponentPageShell
      form={form}
      mutation={mutation}
      onSubmit={handleSubmit}
      layout={NewComponentLayout}
      blockOnlyWhileIdle
    >
      <InformationComponentForm form={form} onSubmit={handleSubmit} />
    </ComponentPageShell>
  );
};

const NewQuestionnairePage = () => {
  const params = Route.useParams();
  const navigateToList = useNavigateToComponentList();
  const { locale } = useLocale();
  const { form, toInput } = useQuestionnaireForm(locale);
  const mutation = useCreateQuestionnaireMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        path: { studyId: params.study },
        body: toInput(data),
      },
      {
        onSuccess: () => {
          form.reset(form.getValues());
          navigateToList();
        },
      },
    );
  });

  return (
    <ComponentPageShell
      form={form}
      mutation={mutation}
      onSubmit={handleSubmit}
      layout={NewComponentLayout}
      blockOnlyWhileIdle
    >
      <QuestionnaireComponentForm form={form} onSubmit={handleSubmit} />
    </ComponentPageShell>
  );
};

const NewHealthDataPage = () => {
  const params = Route.useParams();
  const navigateToList = useNavigateToComponentList();
  const { form, toInput } = useHealthDataForm();
  const mutation = useCreateHealthDataMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        path: { studyId: params.study },
        body: toInput(data),
      },
      {
        onSuccess: () => {
          form.reset(form.getValues());
          navigateToList();
        },
      },
    );
  });

  return (
    <ComponentPageShell
      form={form}
      mutation={mutation}
      onSubmit={handleSubmit}
      layout={NewComponentLayout}
      blockOnlyWhileIdle
    >
      <HealthDataComponentForm form={form} onSubmit={handleSubmit} />
    </ComponentPageShell>
  );
};

const NewComponentRoute = () => {
  const { componentType } = Route.useParams();
  const normalized = normalizeComponentType(componentType);

  switch (normalized) {
    case "informational":
      return <NewInformationPage />;
    case "questionnaire":
      return <NewQuestionnairePage />;
    case "health-data":
      return <NewHealthDataPage />;
    default: {
      const _exhaustiveCheck: never = normalized;
      return _exhaustiveCheck;
    }
  }
};

export const Route = createFileRoute(
  "/(dashboard)/$group/$study/configuration/components/$componentType/new",
)({
  component: NewComponentRoute,
});
