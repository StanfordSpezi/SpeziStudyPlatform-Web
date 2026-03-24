//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  useForm,
} from "@stanfordspezi/spezi-web-design-system";
import { useNavigate } from "@tanstack/react-router";
import { ListPlus } from "lucide-react";
import { type ReactNode } from "react";
import { z } from "zod";
import { useCreateStudyMutation } from "@/lib/queries/study";
import { FeaturedIconContainer } from "../ui/FeaturedIconContainer";
import { FieldLabel } from "../ui/FieldLabel";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

interface NewStudyDialogContentProps {
  groupId: string;
  onSuccess?: () => Promise<void> | void;
}

export const NewStudyDialogContent = ({
  groupId,
  onSuccess,
}: NewStudyDialogContentProps) => {
  const navigate = useNavigate();
  const createStudy = useCreateStudyMutation();
  const form = useForm({
    formSchema,
    defaultValues: { title: "" },
  });

  const handleSubmit = form.handleSubmit(async ({ title }) => {
    const study = await createStudy.mutateAsync({
      path: { groupId },
      body: { title, icon: "heart" },
    });
    await navigate({
      to: "/$group/$study",
      params: { group: groupId, study: study.id },
    });
    await onSuccess?.();
  });

  return (
    <DialogContent className="max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader className="items-center sm:items-start">
          <FeaturedIconContainer
            icon={ListPlus}
            className="border-border-tertiary mb-4 size-8 rounded-lg shadow-xs"
          />
          <DialogTitle>Create a new study</DialogTitle>
          <DialogDescription>
            Enter a title to get started. You can always change this later.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <Field
            control={form.control}
            name="title"
            label={<FieldLabel title="Study title" />}
            render={({ field }) => (
              <Input placeholder="Enter study title" {...field} />
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="default"
            size="sm"
            isPending={createStudy.isPending}
          >
            Create study
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

interface NewStudyDialogProps {
  groupId: string;
  children: ReactNode;
}

export const NewStudyDialog = ({ children, groupId }: NewStudyDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <NewStudyDialogContent groupId={groupId} />
    </Dialog>
  );
};
