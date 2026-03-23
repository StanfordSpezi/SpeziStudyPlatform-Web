//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useParams } from "@tanstack/react-router";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { StudyResponse } from "@/lib/api/generated/types.gen";
import { KeyValueCard } from "@/components/interfaces/KeyValueCard";
import { EditButtonLink } from "@/components/ui/EditButton";
import { useLocale } from "@/lib/locale";

interface GeneralCardProps {
  study?: StudyResponse;
  isLoading?: boolean;
}

export const GeneralCard = ({ study, isLoading }: GeneralCardProps) => {
  const params = useParams({
    from: "/(dashboard)/$group/$study/configuration/",
  });
  const { locale } = useLocale();
  const details = study?.details[locale];

  return (
    <KeyValueCard
      title="General"
      description="Set your study's title, description, and how it appears to participants."
      actions={
        <EditButtonLink
          aria-label="Edit general settings"
          data-testid="edit-general"
          from="/"
          to="/$group/$study/configuration/general"
          params={params}
          className="h-8 text-sm"
        />
      }
      isLoading={isLoading}
      items={[
        {
          key: "Title",
          tooltip:
            "The title of your study, which will be displayed to participants.",
          value: details?.title,
        },
        {
          key: "Short title",
          tooltip: "Used in tight spaces where the full title won't fit.",
          value: details?.shortTitle,
        },
        {
          key: "Icon",
          tooltip: "The icon representing your study.",
          value:
            study?.icon ?
              <DynamicIcon
                name={study.icon as IconName}
                className="size-4 opacity-80"
              />
            : null,
        },
        {
          key: "Explanation",
          tooltip: "This helps participants decide if they want to join.",
          value: details?.explanationText,
        },
        {
          key: "Short explanation",
          tooltip: "A short summary for preview cards and search results.",
          value: details?.shortExplanationText,
        },
      ]}
    />
  );
};
