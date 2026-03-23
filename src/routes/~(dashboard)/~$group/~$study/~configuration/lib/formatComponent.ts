//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Activity, CheckSquare, FileText, type LucideIcon } from "lucide-react";
import {
  type ComponentSummary,
  type ComponentType,
  normalizeComponentType,
} from "@/lib/api/types";

interface ComponentLabel {
  text: string;
  icon: LucideIcon;
  className: string;
}

const componentStyles: Record<
  ComponentType,
  { icon: LucideIcon; className: string }
> = {
  informational: { icon: FileText, className: "bg-blue-500 text-blue-50" },
  questionnaire: {
    icon: CheckSquare,
    className: "bg-orange-500 text-orange-50",
  },
  "health-data": { icon: Activity, className: "bg-green-500 text-green-50" },
};

export const getComponentLabel = (
  component: ComponentSummary,
): ComponentLabel => {
  const componentStyle =
    componentStyles[normalizeComponentType(component.type)];
  return { text: component.name, ...componentStyle };
};
