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
  RepetitionPattern,
  ScheduleDefinition,
  StudyLifecycleEvent,
  WeeklyRepetition,
} from "@/lib/api/generated/types.gen";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

const DEFAULT_HOUR = 9;
const DEFAULT_MINUTE = 30;

/**
 * Single source of truth for default schedule form values.
 */
export const SCHEDULE_DEFAULTS: ComponentSchedule = {
  scheduleDefinition: {
    type: "once",
    pattern: {
      type: "event",
      time: { hour: DEFAULT_HOUR, minute: DEFAULT_MINUTE },
      event: { type: "enrollment" },
    },
  },
  completionPolicy: "anytime",
  notification: false,
};

/**
 * Extracts the time and completedTask flag from any ScheduleDefinition.
 */
export const extractScheduleTime = (definition: ScheduleDefinition) => {
  if (definition.type === "once" && definition.pattern.type === "event") {
    return {
      hour: definition.pattern.time?.hour ?? DEFAULT_HOUR,
      minute: definition.pattern.time?.minute ?? DEFAULT_MINUTE,
      isCompletedTask: definition.pattern.event.type === "completedTask",
    };
  }
  if (definition.type === "repeated") {
    return {
      hour: definition.pattern.hour,
      minute: definition.pattern.minute ?? DEFAULT_MINUTE,
      isCompletedTask: false,
    };
  }
  return { hour: DEFAULT_HOUR, minute: DEFAULT_MINUTE, isCompletedTask: false };
};

export const SCHEDULE_TYPE_OPTIONS = [
  { value: "once", label: "Once" },
  { value: "repeated", label: "Repeated" },
] as const satisfies ReadonlyArray<SelectOption<ScheduleDefinition["type"]>>;

export const EVENT_TYPE_OPTIONS = [
  { value: "enrollment", label: "Enrollment" },
  { value: "activation", label: "Activation" },
  { value: "unenrollment", label: "Unenrollment" },
  { value: "studyEnd", label: "Study end" },
  { value: "completedTask", label: "Completed task" },
] as const satisfies ReadonlyArray<SelectOption<StudyLifecycleEvent["type"]>>;

export const REPEAT_PATTERN_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
] as const satisfies ReadonlyArray<SelectOption<RepetitionPattern["type"]>>;

type Weekday = NonNullable<WeeklyRepetition["weekday"]>;

export const WEEKDAY_OPTIONS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
] as const satisfies ReadonlyArray<SelectOption<Weekday>>;

export const COMPLETION_POLICY_OPTIONS = [
  { value: "sameDay", label: "Same day" },
  { value: "afterStart", label: "After start" },
  { value: "sameDayAfterStart", label: "Same day after start" },
  { value: "duringEvent", label: "During event" },
  { value: "anytime", label: "Anytime" },
] as const satisfies ReadonlyArray<SelectOption<AllowedCompletionPolicy>>;

/**
 * Builds a repeated schedule definition for the given pattern type and time.
 */
export const makeRepeatedDefinition = (
  patternType: RepetitionPattern["type"],
  hour: number,
  minute: number,
): ComponentSchedule["scheduleDefinition"] => {
  const sharedPatternFields = { interval: 1, hour, minute, second: 0 };
  if (patternType === "weekly") {
    return {
      type: "repeated",
      pattern: { type: "weekly", ...sharedPatternFields },
    };
  }
  if (patternType === "monthly") {
    return {
      type: "repeated",
      pattern: { type: "monthly", ...sharedPatternFields },
    };
  }
  return {
    type: "repeated",
    pattern: { type: "daily", ...sharedPatternFields },
  };
};

/**
 * Builds a once/event schedule definition for the given time.
 */
export const makeOnceDefinition = (
  hour: number,
  minute: number,
): ComponentSchedule["scheduleDefinition"] => ({
  type: "once",
  pattern: {
    type: "event",
    event: { type: "enrollment" },
    offsetInDays: 0,
    time: { hour, minute, second: 0 },
  },
});
