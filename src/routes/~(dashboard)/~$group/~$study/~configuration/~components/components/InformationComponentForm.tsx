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
import { MarkdownEditor } from "@/components/ui/MarkdownEditor";
import { useLocale } from "@/lib/locale";
import { enhanceField } from "@/utils/enhanceField";
import { LocaleSuffix } from "../../components/LocaleSuffix";
import type { InformationForm } from "../../lib/useInformationForm";

interface InformationComponentFormProps {
  form: InformationForm;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
}

export const InformationComponentForm = ({
  form,
  onSubmit,
}: InformationComponentFormProps) => {
  const { locale } = useLocale();

  return (
    <>
      <CardHeader
        title="Information component"
        description="Display text and images to provide instructions, explanations, or context to participants."
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
          name="title"
          label={
            <FieldLabel
              title={
                <>
                  Title
                  <LocaleSuffix locale={locale} />
                </>
              }
              description="The heading participants see for this information section."
            />
          }
          className="border-border-tertiary border-b px-6 pt-6"
          render={({ field }) => <Input {...enhanceField(field)} />}
        />
        <Field
          control={form.control}
          name="lede"
          label={
            <FieldLabel
              title={
                <>
                  Lede
                  <LocaleSuffix locale={locale} />
                </>
              }
              description="A short introductory text or subtitle shown below the title."
            />
          }
          className="border-border-tertiary border-b px-6 pt-6"
          render={({ field }) => <Input {...enhanceField(field)} />}
        />
        <Field
          control={form.control}
          name="content"
          label={
            <FieldLabel
              title={
                <>
                  Content
                  <LocaleSuffix locale={locale} />
                </>
              }
              description="The main content participants will read."
            />
          }
          className="px-6 pt-6"
          render={({ field }) => <MarkdownEditor {...enhanceField(field)} />}
        />
      </form>
    </>
  );
};
