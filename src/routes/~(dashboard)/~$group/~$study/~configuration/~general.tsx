//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { NavigationBlocker } from "@/components/interfaces/NavigationBlocker";
import { PhonePreview } from "@/components/interfaces/PhonePreview";
import { Card } from "@/components/ui/Card";
import { SaveButton } from "@/components/ui/SaveButton";
import type { StudyDetailContent } from "@/lib/api/generated/types.gen";
import { useLocale } from "@/lib/locale";
import { useUpdateStudyMutation } from "@/lib/queries/study";
import { GeneralForm } from "./components/GeneralForm";
import { GeneralLayout } from "./components/GeneralLayout";
import { GeneralPreview } from "./components/GeneralPreview";
import { useGeneralForm } from "./lib/useGeneralForm";

const GeneralRouteComponent = () => {
  const params = Route.useParams();
  const { locale } = useLocale();
  const { form, studyResponse } = useGeneralForm(locale);
  const updateStudy = useUpdateStudyMutation();

  const [highlightedField, setHighlightedField] = useState<
    string | undefined
  >();

  const handleSubmit = form.handleSubmit((data) => {
    const { icon, ...textFields } = data;
    const localeContent: StudyDetailContent = {
      title: textFields.title,
      ...(textFields.shortTitle != null && {
        shortTitle: textFields.shortTitle,
      }),
      ...(textFields.explanationText != null && {
        explanationText: textFields.explanationText,
      }),
      ...(textFields.shortExplanationText != null && {
        shortExplanationText: textFields.shortExplanationText,
      }),
    };

    updateStudy.mutate(
      {
        path: { studyId: params.study },
        body: {
          ...(icon != null && { icon }),
          details: { ...studyResponse?.details, [locale]: localeContent },
        },
      },
      {
        onSuccess: (response) => {
          const details = response.details[locale];
          form.reset({
            icon: response.icon,
            title: details.title,
            shortTitle: details.shortTitle,
            explanationText: details.explanationText,
            shortExplanationText: details.shortExplanationText,
          });
        },
      },
    );
  });

  useHotkeys(
    "meta+enter",
    () => void handleSubmit(),
    { enableOnFormTags: ["input", "textarea"] },
    [form],
  );

  return (
    <GeneralLayout
      saveButton={
        <SaveButton
          size="sm"
          className="text-sm"
          onClick={handleSubmit}
          isPending={updateStudy.isPending}
          isSuccess={updateStudy.isSuccess}
          isError={updateStudy.isError}
        />
      }
    >
      <div className="flex max-w-7xl gap-8 p-6">
        <Card>
          <GeneralForm
            form={form}
            locale={locale}
            onSubmit={handleSubmit}
            onFieldFocus={setHighlightedField}
            onFieldBlur={() => setHighlightedField(undefined)}
          />
        </Card>
        <PhonePreview>
          <GeneralPreview form={form} highlightedField={highlightedField} />
        </PhonePreview>
      </div>
      <NavigationBlocker shouldBlock={form.formState.isDirty} />
    </GeneralLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$group/$study/configuration/general",
)({
  component: GeneralRouteComponent,
});
