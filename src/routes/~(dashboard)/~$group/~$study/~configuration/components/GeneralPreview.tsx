//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn } from "@/utils/cn";
import type { GeneralForm } from "../lib/useGeneralForm";

interface GeneralPreviewProps {
  form: GeneralForm;
  highlightedField?: string;
}

const HighlightOverlay = () => (
  <div
    data-testid="phone-preview-highlight"
    className={cn(
      "[--offset:10%]",
      "absolute -top-(--offset) -left-(--offset)",
      "bg-fill-info/5 border-border-info pointer-events-none size-[calc(100%+var(--offset)*2)] rounded-[calc(var(--phone-width)*0.03)] border-[1.5px]",
    )}
  />
);

export const GeneralPreview = ({
  form,
  highlightedField,
}: GeneralPreviewProps) => {
  const [title, explanation] = form.watch(["title", "explanationText"]);
  return (
    <>
      <div className="bg-bg-secondary flex-center absolute top-0 left-0 h-1/2 w-full flex-col gap-[8%] px-[10%] pt-(--phone-top-bar-height)">
        <div className="bg-surface aspect-square h-2/5 rounded-[10%] shadow-md"></div>
        <div
          data-testid="phone-title"
          className={cn(
            "relative max-w-full text-center text-[calc(var(--phone-width)*0.07)] leading-tight break-words",
            !title && "text-text-tertiary",
          )}
        >
          {highlightedField === "title" && <HighlightOverlay />}
          <span>{title || "Title"}</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 h-1/2 w-full p-[10%]">
        <div
          data-testid="phone-explanation"
          className="relative flex size-full flex-col"
        >
          <div className="text-[calc(var(--phone-width)*0.05)] font-medium">
            Explanation
          </div>
          <div
            className={cn(
              "scrollbar-thin size-full overflow-y-auto rounded-md text-[calc(var(--phone-width)*0.05)] text-ellipsis outline-none",
              "focus-visible:ring-border-focus focus-visible:ring-2 focus-visible:ring-offset-4",
              !explanation && "text-text-tertiary",
            )}
          >
            {highlightedField === "explanationText" && <HighlightOverlay />}
            <span>{explanation ?? "Explanation"}</span>
          </div>
        </div>
      </div>
    </>
  );
};
