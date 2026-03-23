//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Checkbox,
  ConfirmDeleteDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";
import { CalendarSync } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { TimeSelect, type TimeSelectValue } from "@/components/ui/TimeSelect";
import type {
  RepetitionPattern,
  StudyLifecycleEvent,
} from "@/lib/api/generated";
import { cn } from "@/utils/cn";
import { enhanceField } from "@/utils/enhanceField";
import { formatSchedule } from "../../lib/formatSchedule";
import {
  COMPLETION_POLICY_OPTIONS,
  EVENT_TYPE_OPTIONS,
  extractScheduleTime,
  makeOnceDefinition,
  makeRepeatedDefinition,
  REPEAT_PATTERN_OPTIONS,
  SCHEDULE_TYPE_OPTIONS,
  WEEKDAY_OPTIONS,
  type SelectOption,
} from "../../lib/scheduleTransforms";
import { useScheduleForm } from "../../lib/useScheduleForm";

const OptionsSelect = ({
  options,
  placeholder,
  ...props
}: Omit<ComponentProps<typeof Select>, "children"> & {
  options: readonly SelectOption[];
  placeholder?: string;
}) => (
  <Select {...props}>
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const FormRow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "border-border-tertiary bg-layer flex gap-8 border-b px-6 pt-6",
      className,
    )}
  >
    {children}
  </div>
);

export const ScheduleDialog = () => {
  const dialog = useOpenState();
  const {
    form,
    hasExistingSchedule,
    components,
    submitSchedule,
    removeSchedule,
  } = useScheduleForm();
  const formValues = form.watch();

  const definition = formValues.scheduleDefinition;
  const isOnce = definition.type === "once";
  const { hour, minute, isCompletedTask } = extractScheduleTime(definition);

  const isWeekly = !isOnce && definition.pattern.type === "weekly";
  const isMonthly = !isOnce && definition.pattern.type === "monthly";

  const handleSubmit = form.handleSubmit((data) => {
    submitSchedule(data, dialog.close);
  });

  const deleteDialog = useOpenState();
  const handleDelete = () => {
    removeSchedule(() => {
      dialog.close();
    });
    deleteDialog.close();
  };

  const setTime = ({ hours, minutes }: TimeSelectValue) => {
    if (definition.type === "once") {
      form.setValue("scheduleDefinition.pattern.time", {
        hour: hours,
        minute: minutes,
        second: 0,
      });
    } else {
      form.setValue("scheduleDefinition.pattern.hour", hours);
      form.setValue("scheduleDefinition.pattern.minute", minutes);
    }
  };

  const switchScheduleType = (type: string) => {
    switch (type) {
      case "once": {
        form.setValue("scheduleDefinition", makeOnceDefinition(hour, minute));
        return;
      }
      case "repeated": {
        form.setValue(
          "scheduleDefinition",
          makeRepeatedDefinition("daily", hour, minute),
        );
        return;
      }
    }
  };

  const switchEventType = (type: string) => {
    form.setValue("scheduleDefinition.pattern.event", {
      type,
      ...(type === "completedTask" && { componentId: "" }),
    } as StudyLifecycleEvent);
  };

  const switchRepeatPattern = (patternType: string) => {
    form.setValue(
      "scheduleDefinition",
      makeRepeatedDefinition(
        patternType as RepetitionPattern["type"],
        hour,
        minute,
      ),
    );
  };

  return (
    <>
      <Dialog open={dialog.isOpen} onOpenChange={dialog.setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-sm">
            {hasExistingSchedule ? "Edit schedule" : "Add schedule"}
          </Button>
        </DialogTrigger>
        <DialogContent size="3xl" className="px-0">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="items-center px-6 pb-6 sm:items-start">
              <FeaturedIconContainer
                icon={CalendarSync}
                className="border-border-tertiary mb-4 size-8 rounded-lg shadow-xs"
              />
              <DialogTitle className="leading-none">Schedule</DialogTitle>
              <DialogDescription>
                Define when this component becomes active during the study.
              </DialogDescription>
            </DialogHeader>

            <FormRow className="border-y">
              <Field
                control={form.control}
                name="scheduleDefinition.type"
                label={
                  <FieldLabel
                    title="Schedule type"
                    description="Fire once or repeat on a pattern."
                  />
                }
                className="flex-1"
                render={({ field: { value, ...field } }) => (
                  <OptionsSelect
                    onValueChange={switchScheduleType}
                    value={value}
                    options={SCHEDULE_TYPE_OPTIONS}
                    {...field}
                  />
                )}
              />
              {isOnce ?
                <Field
                  key="eventType"
                  control={form.control}
                  name="scheduleDefinition.pattern.event.type"
                  label={
                    <FieldLabel
                      title="Trigger event"
                      description="The study event that triggers this schedule."
                    />
                  }
                  className="flex-1"
                  render={({ field: { onChange: _onChange, ...field } }) => (
                    <OptionsSelect
                      onValueChange={switchEventType}
                      options={EVENT_TYPE_OPTIONS}
                      {...field}
                    />
                  )}
                />
              : <Field
                  key="repeatPattern"
                  control={form.control}
                  name="scheduleDefinition.pattern.type"
                  label={
                    <FieldLabel
                      title="Repeat pattern"
                      description="How often the schedule recurs."
                    />
                  }
                  className="flex-1"
                  render={({ field: { value, ...field } }) => (
                    <OptionsSelect
                      onValueChange={switchRepeatPattern}
                      value={value}
                      options={REPEAT_PATTERN_OPTIONS}
                      {...field}
                    />
                  )}
                />
              }
            </FormRow>

            {isOnce && (
              <FormRow>
                {isCompletedTask && (
                  <Field
                    control={form.control}
                    name="scheduleDefinition.pattern.event.componentId"
                    label={
                      <FieldLabel
                        title="Component"
                        description="The component whose completion triggers this."
                      />
                    }
                    className="flex-1"
                    render={({ field: { onChange, value, ...field } }) => (
                      <OptionsSelect
                        onValueChange={onChange}
                        value={typeof value === "string" ? value : ""}
                        placeholder="Select component"
                        options={components
                          .filter(
                            (component) =>
                              component.type !== "healthDataCollection",
                          )
                          .map((component) => ({
                            value: component.id,
                            label: component.name,
                          }))}
                        {...field}
                      />
                    )}
                  />
                )}
                <Field
                  control={form.control}
                  name="scheduleDefinition.pattern.offsetInDays"
                  label={
                    <FieldLabel
                      title="Delay"
                      description="Days after the event before this fires."
                    />
                  }
                  className="flex-1"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="0"
                      {...enhanceField(field, { valueAsNumber: true })}
                    />
                  )}
                />
                {!isCompletedTask && <div className="flex-1" />}
              </FormRow>
            )}

            {!isOnce && (
              <FormRow>
                <Field
                  control={form.control}
                  name="scheduleDefinition.pattern.interval"
                  label={
                    <FieldLabel
                      title="Repeat interval"
                      description="The spacing between each occurrence."
                    />
                  }
                  className="flex-1"
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...enhanceField(field, { valueAsNumber: true })}
                    />
                  )}
                />
                {isWeekly && (
                  <Field
                    control={form.control}
                    name="scheduleDefinition.pattern.weekday"
                    label={
                      <FieldLabel
                        title="Weekday"
                        description="Day of the week (optional)."
                      />
                    }
                    className="flex-1"
                    render={({ field: { onChange, value, ...field } }) => (
                      <OptionsSelect
                        onValueChange={onChange}
                        value={typeof value === "string" ? value : ""}
                        placeholder="Any"
                        options={WEEKDAY_OPTIONS}
                        {...field}
                      />
                    )}
                  />
                )}
                {isMonthly && (
                  <Field
                    control={form.control}
                    name="scheduleDefinition.pattern.day"
                    label={
                      <FieldLabel
                        title="Day of month"
                        description="Day of the month (optional)."
                      />
                    }
                    className="flex-1"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="Any"
                        {...enhanceField(field, { valueAsNumber: true })}
                      />
                    )}
                  />
                )}
              </FormRow>
            )}

            <FormRow>
              <div className="flex-1">
                <Label className="mb-2 flex">
                  <FieldLabel
                    title="Schedule time"
                    description="Time of day for the schedule."
                  />
                </Label>
                <TimeSelect
                  value={{ hours: hour, minutes: minute as 0 | 30 }}
                  onChange={setTime}
                />
              </div>
              <Field
                control={form.control}
                name="completionPolicy"
                label={
                  <FieldLabel
                    title="Completion policy"
                    description="When users can mark tasks as complete."
                  />
                }
                className="flex-1"
                render={({ field: { onChange, ...field } }) => (
                  <OptionsSelect
                    onValueChange={onChange}
                    options={COMPLETION_POLICY_OPTIONS}
                    {...field}
                  />
                )}
              />
            </FormRow>

            {!isOnce && (
              <FormRow>
                <Field
                  control={form.control}
                  name="scheduleDefinition.offset.day"
                  label={
                    <FieldLabel
                      title="Start delay"
                      description="Days after enrollment before the schedule activates."
                    />
                  }
                  className="flex-1"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="0"
                      {...enhanceField(field, { valueAsNumber: true })}
                    />
                  )}
                />
                <div className="flex-1" />
              </FormRow>
            )}

            <div className="border-border-tertiary bg-layer flex items-center gap-3 border-b px-6 py-4">
              <Field
                control={form.control}
                name="notification"
                render={({
                  field: { value, onChange, ref, name, disabled },
                }) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="notification"
                      ref={ref}
                      name={name}
                      disabled={disabled}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                    <Label htmlFor="notification" className="cursor-pointer">
                      Enable notifications
                    </Label>
                  </div>
                )}
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-6 pt-6">
              <p className="text-text-tertiary text-sm">
                {form.formState.isValid && formatSchedule(formValues)}
              </p>
              <div className="flex gap-4">
                {hasExistingSchedule && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={deleteDialog.open}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" variant="default" size="sm">
                  {hasExistingSchedule ? "Save schedule" : "Add schedule"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.setIsOpen}
        entityName="schedule"
        onDelete={handleDelete}
      />
    </>
  );
};
