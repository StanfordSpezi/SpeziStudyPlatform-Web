//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Removes leading and trailing whitespace from each line of a template string,
 * filters out empty lines, and joins the result with newlines.
 *
 * @example
 * const result = dedent`
 *   This is a template string
 *   with multiple lines.
 *   It will be dedented.
 * `;
 * console.log(result);
 * // Output:
 * // This is a template string
 * // with multiple lines.
 * // It will be dedented.
 */
export const dedent = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  // Combine the template string and values
  const raw = strings.reduce(
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    (acc, str, i) => acc + str + String(values[i] ?? ""),
    "",
  );

  // Split into lines, trim each line, and filter out empty lines
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
};
