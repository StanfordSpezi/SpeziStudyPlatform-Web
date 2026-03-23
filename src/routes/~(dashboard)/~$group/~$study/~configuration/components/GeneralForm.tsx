//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Input,
  Field,
  Textarea,
  Label,
  Button,
} from "@stanfordspezi/spezi-web-design-system";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { IconPicker } from "@/components/ui/IconPicker";
import { cn } from "@/utils/cn";
import { enhanceField } from "@/utils/enhanceField";
import { LocaleSuffix } from "./LocaleSuffix";
import type { GeneralForm as GeneralFormType } from "../lib/useGeneralForm";

interface GeneralFormProps {
  form: GeneralFormType;
  locale: string;
  onSubmit: () => void;
  onFieldFocus?: (fieldName: string) => void;
  onFieldBlur?: () => void;
}

export const GeneralForm = ({
  form,
  locale,
  onSubmit,
  onFieldFocus,
  onFieldBlur,
}: GeneralFormProps) => {
  return (
    <form onSubmit={onSubmit} className="py-6">
      <Field
        control={form.control}
        name="title"
        label={
          <FieldLabel
            title={
              <>
                Title
                <LocaleSuffix locale={locale} />
              </>
            }
            description="Be descriptive but keep it under 100 characters."
          />
        }
        className="border-border-tertiary border-b px-6"
        render={({ field }) => (
          <Input
            className="focus:ring-border-info"
            onFocus={() => onFieldFocus?.("title")}
            {...enhanceField(field, { onBlur: onFieldBlur })}
          />
        )}
      />
      <Label className="mb-2 flex px-6 pt-6">
        <FieldLabel
          title={
            <>
              Study icon & name
              <LocaleSuffix locale={locale} />
            </>
          }
          description="Used in tight spaces where the full title won't fit."
        />
      </Label>
      <div className="border-border-tertiary flex gap-4 border-b px-6">
        <Field
          control={form.control}
          name="icon"
          render={({ field: { value, onChange, ...field } }) => (
            <IconPicker
              value={value as IconName}
              onValueChange={onChange}
              {...field}
            >
              <Button
                size={null}
                variant="outline"
                className="bg-bg size-10 rounded-md"
              >
                <DynamicIcon
                  name={(value ?? "box-select") as IconName}
                  className={cn(
                    "size-4 opacity-80",
                    !value && "text-text-tertiary",
                  )}
                />
              </Button>
            </IconPicker>
          )}
        />
        <Field
          control={form.control}
          name="shortTitle"
          className="flex-1"
          render={({ field }) => <Input {...enhanceField(field)} />}
        />
      </div>
      <Field
        control={form.control}
        name="explanationText"
        label={
          <FieldLabel
            title={
              <>
                Explanation
                <LocaleSuffix locale={locale} />
              </>
            }
            description="This helps participants decide if they want to join."
          />
        }
        className="border-border-tertiary border-b px-6 pt-6"
        render={({ field }) => (
          <Textarea
            className="focus:ring-border-info"
            onFocus={() => onFieldFocus?.("explanationText")}
            {...enhanceField(field, { onBlur: onFieldBlur })}
          />
        )}
      />
      <Field
        control={form.control}
        name="shortExplanationText"
        label={
          <FieldLabel
            title={
              <>
                Short explanation
                <LocaleSuffix locale={locale} />
              </>
            }
            description="A short summary for preview cards and search results."
          />
        }
        className="px-6 pt-6"
        render={({ field }) => <Textarea {...enhanceField(field)} />}
      />
    </form>
  );
};
