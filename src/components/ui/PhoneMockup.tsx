//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const PhoneTopBar = () => {
  return (
    <div
      aria-hidden
      className="absolute top-(--phone-top-bar-padding-top) left-0 flex h-(--phone-top-bar-content-height) w-full items-center justify-between"
    >
      <div className="flex h-full flex-1 items-center justify-start pl-[8%]">
        <div className="bg-fill-tertiary h-1/3 w-1/2 rounded-full" />
      </div>
      <div className="flex-center h-full flex-1">
        <div className="bg-fill-tertiary h-3/5 w-full rounded-full" />
      </div>
      <div className="flex h-full flex-1 items-center justify-end gap-[8%] pr-[8%]">
        <div className="bg-fill-tertiary aspect-square h-1/3 rounded-full" />
        <div className="bg-fill-tertiary aspect-square h-1/3 rounded-full" />
        <div className="bg-fill-tertiary aspect-square h-1/3 rounded-full" />
      </div>
    </div>
  );
};

interface PhoneMockupProps {
  children?: ReactNode;
}

export const PhoneMockup = ({ children }: PhoneMockupProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // The parent container is fluid in both width and height, so CSS’s
  // aspect-ratio alone can’t pick whether to constrain by width or height.
  // At runtime we measure the parent’s dimensions, compare its W∶H ratio
  // against 9∶16, and then apply either `width:100%; height:auto;` or
  // `height:100%; width:auto;` to maintain the aspect and prevent overflow.
  useEffect(() => {
    const parentElement = parentRef.current;
    const innerElement = innerRef.current;
    if (!parentElement || !innerElement) return;

    const adjustAspectRatio = () => {
      const computedStyle = getComputedStyle(parentElement);
      const paddingX =
        parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight);
      const paddingY =
        parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom);
      const availableWidth = parentElement.clientWidth - paddingX;
      const availableHeight = parentElement.clientHeight - paddingY;
      const effectiveRatio = availableWidth / availableHeight;
      const targetRatio = 9 / 16;

      if (effectiveRatio >= targetRatio) {
        // Limit by height
        innerElement.style.width = "auto";
        innerElement.style.height = "100%";
      } else {
        // Limit by width
        innerElement.style.width = "100%";
        innerElement.style.height = "auto";
      }

      const boundingRect = innerElement.getBoundingClientRect();
      innerElement.style.setProperty(
        "--phone-width",
        `${boundingRect.width}px`,
      );
      innerElement.style.setProperty(
        "--phone-height",
        `${boundingRect.height}px`,
      );
    };

    adjustAspectRatio();

    let debounceTimeout: NodeJS.Timeout | null = null;
    const observer = new ResizeObserver(() => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(adjustAspectRatio, 10);
    });

    observer.observe(parentElement);

    return () => {
      observer.disconnect();
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, []);

  return (
    <div ref={parentRef} className="flex-center size-full px-6">
      <div
        ref={innerRef}
        data-testid="phone-mockup"
        className={cn(
          "[--phone-top-bar-content-height:calc(0.08*var(--phone-height))] [--phone-top-bar-padding-top:calc(0.02*var(--phone-height))]",
          "[--phone-top-bar-height:calc(var(--phone-top-bar-content-height)+var(--phone-top-bar-padding-top))]",
          "relative aspect-[9/16] size-full overflow-hidden rounded-[12%/6.75%] border shadow-lg",
        )}
      >
        {children}
        <PhoneTopBar />
      </div>
    </div>
  );
};
