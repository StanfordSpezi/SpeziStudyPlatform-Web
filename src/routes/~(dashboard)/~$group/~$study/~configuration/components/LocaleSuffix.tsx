//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

export const LocaleSuffix = ({ locale }: { locale: string }) => (
  <span className="text-text-tertiary font-normal"> · {locale}</span>
);
