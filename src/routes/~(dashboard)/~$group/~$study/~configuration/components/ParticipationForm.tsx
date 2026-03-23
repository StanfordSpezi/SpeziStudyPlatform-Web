//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Field } from "@stanfordspezi/spezi-web-design-system";
import { CriteriaTreeBuilder } from "@/components/interfaces/CriteriaTreeBuilder";
import { FieldLabel } from "@/components/ui/FieldLabel";
import type { ParticipationForm as ParticipationFormType } from "../lib/useParticipationForm";

interface ParticipationFormProps {
  form: ParticipationFormType;
  onSubmit: () => void;
}

export const ParticipationForm = ({
  form,
  onSubmit,
}: ParticipationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="py-6">
      <Field
        control={form.control}
        name="participationCriterion"
        label={
          <FieldLabel
            title="Participation criteria"
            description="Define the criteria that participants must meet to enroll in your study."
          />
        }
        className="px-6"
        render={({ field: { value, onChange } }) => (
          <CriteriaTreeBuilder value={value} onChange={onChange} />
        )}
      />
    </form>
  );
};
