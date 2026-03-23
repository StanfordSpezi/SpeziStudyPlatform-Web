//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
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
import { parseStudyResponse, toStudyPatchInput } from "@/lib/api/transforms";
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
    updateStudy.mutate(
      {
        path: { studyId: params.study },
        body: toStudyPatchInput(data, locale, studyResponse?.details),
      },
      {
        onSuccess: (data) => {
          form.reset(parseStudyResponse(data, locale));
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
