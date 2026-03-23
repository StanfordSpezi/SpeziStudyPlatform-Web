//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Field,
  Input,
  Textarea,
} from "@stanfordspezi/spezi-web-design-system";
import { useRef, type BaseSyntheticEvent, type ChangeEvent } from "react";
import { CardHeader } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { useLocale } from "@/lib/locale";
import { enhanceField } from "@/utils/enhanceField";
import { LocaleSuffix } from "../../components/LocaleSuffix";
import type { QuestionnaireForm } from "../../lib/useQuestionnaireForm";

const formatJson = (json: string): string =>
  JSON.stringify(JSON.parse(json), null, 2);

const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

interface QuestionnaireComponentFormProps {
  form: QuestionnaireForm;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
}

export const QuestionnaireComponentForm = ({
  form,
  onSubmit,
}: QuestionnaireComponentFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const questionnaireJson = form.watch("questionnaire");

  const setQuestionnaireJson = (json: string) => {
    form.setValue("questionnaire", json, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    form.clearErrors("questionnaire");
  };

  const setQuestionnaireError = (message: string) => {
    form.setError("questionnaire", { message });
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setQuestionnaireJson(formatJson(text));
    } catch {
      setQuestionnaireError(
        "Invalid JSON file. Please upload a valid JSON document.",
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleDownload = () => {
    if (!questionnaireJson.trim()) {
      setQuestionnaireError("There is no JSON to download yet.");
      return;
    }

    try {
      downloadFile(formatJson(questionnaireJson), "questionnaire.json");
      form.clearErrors("questionnaire");
    } catch {
      setQuestionnaireError(
        "JSON is invalid. Please fix it before downloading.",
      );
    }
  };

  const handleFormat = () => {
    if (!questionnaireJson.trim()) return;

    try {
      setQuestionnaireJson(formatJson(questionnaireJson));
    } catch {
      setQuestionnaireError(
        "JSON is invalid. Please fix it before formatting.",
      );
    }
  };

  const { locale } = useLocale();

  return (
    <>
      <CardHeader
        title="Questionnaire component"
        description="Collect questionnaire responses from participants."
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
          name="questionnaire"
          label={
            <FieldLabel
              title={
                <>
                  FHIR questionnaire JSON
                  <LocaleSuffix locale={locale} />
                </>
              }
              description="The FHIR Questionnaire JSON to collect responses from participants."
            />
          }
          className="px-6 pt-6"
          render={({ field }) => (
            <div>
              <Textarea {...field} rows={10} className="w-full font-mono" />
              <div className="flex flex-wrap justify-end gap-2 pt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,application/fhir+json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  type="button"
                  size="xs"
                  variant="outlineBg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload JSON
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outlineBg"
                  onClick={handleDownload}
                >
                  Download JSON
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outlineBg"
                  onClick={handleFormat}
                >
                  Format JSON
                </Button>
              </div>
            </div>
          )}
        />
      </form>
    </>
  );
};
