//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { NavigationBlocker } from "@/components/interfaces/NavigationBlocker";
import { Card } from "@/components/ui/Card";
import { SaveButton } from "@/components/ui/SaveButton";
import { useUpdateStudyMutation } from "@/lib/queries/study";
import { ParticipationForm } from "./components/ParticipationForm";
import { ParticipationLayout } from "./components/ParticipationLayout";
import { useParticipationForm } from "./lib/useParticipationForm";

const ParticipationRouteComponent = () => {
  const params = Route.useParams();
  const { form } = useParticipationForm();
  const updateStudy = useUpdateStudyMutation();

  const handleSubmit = form.handleSubmit((data) => {
    updateStudy.mutate(
      {
        path: { studyId: params.study },
        body: {
          participationCriterion: data.participationCriterion ?? undefined,
        },
      },
      {
        onSuccess: (updatedStudy) => {
          form.reset({
            participationCriterion: updatedStudy.participationCriterion,
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
    <ParticipationLayout
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
          <ParticipationForm form={form} onSubmit={handleSubmit} />
        </Card>
      </div>
      <NavigationBlocker shouldBlock={form.formState.isDirty} />
    </ParticipationLayout>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/$group/$study/configuration/participation",
)({
  component: ParticipationRouteComponent,
});
