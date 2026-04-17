//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ChangeEvent } from "react";

interface FormField<T> {
  value: T;
  onBlur: () => void;
  onChange: (value: unknown) => void;
}

interface WrapFieldOptions {
  valueAsNumber?: boolean;
  onBlur?: () => void;
}

/**
 * Enhances a form field by wrapping its onBlur handler and ensuring the value is not null.
 *
 * @example
 * import { enhanceField } from "@/utils/enhanceField";
 *
 * <Input {...enhanceField(field, { onBlur: handleBlur })} />
 */
export const enhanceField = <T>(
  field: FormField<T>,
  options: WrapFieldOptions = {},
) => {
  return {
    ...field,
    onChange: (event: unknown) => {
      if (options.valueAsNumber) {
        const { target } = event as ChangeEvent<HTMLInputElement>;
        const value = target.value === "" ? null : target.valueAsNumber;
        field.onChange(value);
        return;
      }

      field.onChange(event);
    },
    onBlur: () => {
      field.onBlur();
      options.onBlur?.();
    },
    value: field.value ?? "",
  };
};
