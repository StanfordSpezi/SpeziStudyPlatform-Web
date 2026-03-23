//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  ConfirmDeleteDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenuSeparator,
  Field,
  Input,
  useForm,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Languages, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { useLocale } from "@/lib/locale";
import {
  studyRetrieveQueryOptions,
  useUpdateStudyMutation,
} from "@/lib/queries/study";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";

const LOCALE_PATTERN = /^[a-z]{2}-[A-Z]{2}$/;

const addLocaleSchema = z.object({
  locale: z
    .string()
    .min(1, "Enter a locale code")
    .regex(LOCALE_PATTERN, "Use format: en-US"),
});

interface AddLocaleDialogContentProps {
  studyId: string;
  existingLocales: string[];
  onSuccess?: () => void;
}

const AddLocaleDialogContent = ({
  studyId,
  existingLocales,
  onSuccess,
}: AddLocaleDialogContentProps) => {
  const { setLocale } = useLocale();
  const updateStudy = useUpdateStudyMutation();
  const form = useForm({
    formSchema: addLocaleSchema,
    defaultValues: { locale: "" },
  });

  const handleSubmit = form.handleSubmit(async ({ locale }) => {
    if (existingLocales.includes(locale)) {
      form.setError("locale", { message: "Already added" });
      return;
    }
    await updateStudy.mutateAsync({
      path: { studyId },
      body: { locales: [...existingLocales, locale] },
    });
    setLocale(locale);
    onSuccess?.();
  });

  return (
    <DialogContent className="max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader className="items-center sm:items-start">
          <FeaturedIconContainer
            icon={Languages}
            className="border-border-tertiary mb-4 size-8 rounded-lg shadow-xs"
          />
          <DialogTitle>Add a locale</DialogTitle>
          <DialogDescription>
            Add a new language to your study. You can then switch to it and
            start editing content.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <Field
            control={form.control}
            name="locale"
            label={<FieldLabel title="Locale code" />}
            render={({ field }) => (
              <Input placeholder="e.g. de-DE" {...field} />
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="default"
            size="sm"
            isPending={updateStudy.isPending}
          >
            Add locale
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const LocaleSelectorContent = ({ studyId }: { studyId: string }) => {
  const { locale: activeLocale, setLocale } = useLocale();
  const addLocaleDialog = useOpenState();
  const deleteDialog = useOpenState();
  const [pendingDeleteLocale, setPendingDeleteLocale] = useState<string>();
  const updateStudy = useUpdateStudyMutation();

  const { data: study } = useQuery({
    ...studyRetrieveQueryOptions({ studyId }),
    enabled: !!studyId,
  });

  const locales = study?.locales ?? ["en-US"];

  const handleRemove = () => {
    if (!pendingDeleteLocale) return;
    const newLocales = locales.filter(
      (locale) => locale !== pendingDeleteLocale,
    );
    updateStudy.mutate(
      {
        path: { studyId },
        body: { locales: newLocales },
      },
      {
        onSuccess: () => {
          if (activeLocale === pendingDeleteLocale) {
            setLocale(newLocales[0] ?? "en-US");
          }
          deleteDialog.close();
          setPendingDeleteLocale(undefined);
        },
        onError: () => {
          deleteDialog.close();
          setPendingDeleteLocale(undefined);
        },
      },
    );
  };

  return (
    <>
      <HeaderSelector selectedItem={{ title: activeLocale }}>
        <HeaderSelectorMenuLabel>Locales</HeaderSelectorMenuLabel>
        {locales.map((locale) => (
          <HeaderSelectorMenuItem
            key={locale}
            onSelect={() => setLocale(locale)}
          >
            <span className="flex-1">{locale}</span>
            {locales.length > 1 && (
              <button
                type="button"
                className="text-text-tertiary hover:text-text -mr-1 rounded p-0.5"
                onClick={(event) => {
                  event.stopPropagation();
                  setPendingDeleteLocale(locale);
                  deleteDialog.open();
                }}
              >
                <X className="size-3.5" />
              </button>
            )}
          </HeaderSelectorMenuItem>
        ))}
        <DropdownMenuSeparator />
        <HeaderSelectorMenuItem
          icon="plus"
          className="text-text-tertiary"
          onSelect={addLocaleDialog.open}
        >
          Add locale
        </HeaderSelectorMenuItem>
      </HeaderSelector>
      <Dialog
        open={addLocaleDialog.isOpen}
        onOpenChange={addLocaleDialog.setIsOpen}
      >
        <AddLocaleDialogContent
          studyId={studyId}
          existingLocales={locales}
          onSuccess={addLocaleDialog.close}
        />
      </Dialog>
      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.setIsOpen}
        entityName="locale"
        itemName={pendingDeleteLocale}
        onDelete={handleRemove}
      />
    </>
  );
};

export const LocaleSelector = () => {
  const params = useParams({ strict: false });

  if (!params.study) {
    return null;
  }

  return <LocaleSelectorContent studyId={params.study} />;
};
