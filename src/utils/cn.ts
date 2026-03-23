//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cn as _cn } from "@stanfordspezi/spezi-web-design-system";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Parameters<typeof _cn>) =>
  twMerge(_cn(...inputs));
