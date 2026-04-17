//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Dialog,
  DropdownMenuSeparator,
  Skeleton,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { studyListQueryOptions } from "@/lib/queries/study";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
import { HeaderSelectorSkeleton } from "./HeaderSelectorSkeleton";
import { NewStudyDialogContent } from "../NewStudyDialog";

export const StudySelector = () => {
  const { group, study: studyId } = useParams({ strict: false });
  const { data: studies } = useQuery({
    ...studyListQueryOptions({ groupId: group ?? "" }),
    enabled: !!group,
  });
  const selectedStudy = studies?.find((study) => study.id === studyId);

  const newStudyDialog = useOpenState();

  if (!studyId || !group) {
    return null;
  }

  if (!studies) {
    return <HeaderSelectorSkeleton hasIcon={false} />;
  }

  const title = selectedStudy?.title ?? (
    <Skeleton className="bg-fill-tertiary h-4 w-20 rounded-sm" />
  );

  return (
    <>
      <HeaderSelector selectedItem={{ title }}>
        <HeaderSelectorMenuLabel>Studies</HeaderSelectorMenuLabel>
        {studies.map((study) => (
          <HeaderSelectorMenuItem
            key={study.id}
            linkOptions={{
              to: "/$group/$study",
              params: {
                group,
                study: study.id,
              },
            }}
          >
            {study.title}
          </HeaderSelectorMenuItem>
        ))}
        <DropdownMenuSeparator />
        <HeaderSelectorMenuItem
          icon="plus"
          className="text-text-tertiary"
          onSelect={newStudyDialog.open}
        >
          Add study
        </HeaderSelectorMenuItem>
      </HeaderSelector>
      <Dialog
        open={newStudyDialog.isOpen}
        onOpenChange={newStudyDialog.setIsOpen}
      >
        <NewStudyDialogContent
          groupId={group}
          onSuccess={newStudyDialog.close}
        />
      </Dialog>
    </>
  );
};
