//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Field, Input } from "@stanfordspezi/spezi-web-design-system";
import type { BaseSyntheticEvent } from "react";
import { CardHeader } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/MultiSelect";
import { enhanceField } from "@/utils/enhanceField";
import { healthDataTypes } from "../../lib/healthDataTypes";
import type { HealthDataForm } from "../../lib/useHealthDataForm";

interface HealthDataComponentFormProps {
  form: HealthDataForm;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
}

export const HealthDataComponentForm = ({
  form,
  onSubmit,
}: HealthDataComponentFormProps) => {
  return (
    <>
      <CardHeader
        title="Health data component"
        description="Collect health data from participants."
      />
      <form onSubmit={onSubmit} className="py-6">
        <Field
          control={form.control}
          name="name"
          label={
            <FieldLabel
              title="Name"
              description="An internal identifier for this component."
            />
          }
          className="border-border-tertiary border-b px-6"
          render={({ field }) => <Input {...enhanceField(field)} />}
        />
        <Field
          control={form.control}
          name="sampleTypes"
          label={
            <FieldLabel
              title="Sample types"
              description="The types of health data to collect from participants."
            />
          }
          className="px-6 pt-6"
          render={({ field }) => (
            <MultiSelect values={field.value} onValuesChange={field.onChange}>
              <MultiSelectTrigger>
                <MultiSelectValue
                  className="[&_[data-selected-item=true]]:bg-fill-tertiary"
                  overflowBehavior="wrap"
                />
              </MultiSelectTrigger>
              <MultiSelectContent>
                {Object.entries(healthDataTypes).map(([category, values]) => (
                  <MultiSelectGroup key={category} heading={category}>
                    {values.map(({ label, value }) => (
                      <MultiSelectItem
                        key={value}
                        value={value}
                        keywords={[label, category]}
                      >
                        {label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                ))}
              </MultiSelectContent>
            </MultiSelect>
          )}
        />
      </form>
    </>
  );
};
