//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type {
  AllowedCompletionPolicy,
  ComponentSchedule,
  ScheduleDefinition,
  StudyLifecycleEvent,
} from "@/lib/api/generated/types.gen";
import { extractScheduleTime } from "./scheduleTransforms";

const getOrdinalSuffix = (number: number): string => {
  const lastTwoDigits = number % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";

  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const eventLabels = {
  enrollment: "enrollment",
  activation: "activation",
  unenrollment: "unenrollment",
  studyEnd: "study end",
  completedTask: "task completion",
} satisfies Record<StudyLifecycleEvent["type"], string>;

const policyLabels = {
  sameDay: "same day",
  afterStart: "after start",
  sameDayAfterStart: "same day after start",
  duringEvent: "during event",
  anytime: "anytime",
} satisfies Record<AllowedCompletionPolicy, string>;

const formatFrequency = (definition: ScheduleDefinition): string => {
  if (definition.type === "once") {
    if (definition.pattern.type !== "event") return "Scheduled once";
    const { event, offsetInDays } = definition.pattern;
    const eventLabel = eventLabels[event.type];
    const delayDays = offsetInDays ?? 0;
    const delaySuffix =
      delayDays > 0 ? ` + ${delayDays} day${delayDays > 1 ? "s" : ""}` : "";
    return `Once on ${eventLabel}${delaySuffix}`;
  }

  const { pattern } = definition;
  const interval = pattern.interval ?? 1;
  const ordinal = `${interval}${getOrdinalSuffix(interval)}`;

  if (pattern.type === "daily") {
    return interval === 1 ? "Daily" : `Every ${ordinal} day`;
  }
  if (pattern.type === "weekly") {
    const weekdaySuffix =
      pattern.weekday ? ` on ${capitalize(pattern.weekday)}` : "";
    return interval === 1 ?
        `Weekly${weekdaySuffix}`
      : `Every ${ordinal} week${weekdaySuffix}`;
  }
  // monthly
  const daySuffix =
    pattern.day ? ` on the ${pattern.day}${getOrdinalSuffix(pattern.day)}` : "";
  return interval === 1 ?
      `Monthly${daySuffix}`
    : `Every ${ordinal} month${daySuffix}`;
};

export const formatSchedule = ({
  scheduleDefinition: definition,
  completionPolicy,
}: ComponentSchedule) => {
  const { hour, minute } = extractScheduleTime(definition);
  const frequency = formatFrequency(definition);
  const offsetInDays =
    definition.type === "repeated" ? (definition.offset?.day ?? 0) : 0;

  const timeDate = new Date();
  timeDate.setHours(hour, minute);
  const timeString = timeDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const policyLabel = policyLabels[completionPolicy];
  const offsetSuffix =
    offsetInDays > 0 ?
      ` Starting ${offsetInDays} day${offsetInDays > 1 ? "s" : ""} after enrollment.`
    : "";

  return `${frequency} at ${timeString}.${offsetSuffix} Completion: ${policyLabel}.`;
};
