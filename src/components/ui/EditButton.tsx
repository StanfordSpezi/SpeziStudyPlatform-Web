//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, buttonVariance } from "@stanfordspezi/spezi-web-design-system";
import { createLink } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import { Edit } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/cn";

export const EditButton = ({
  size = "sm",
  variant = "outline",
  ...props
}: Omit<ComponentProps<typeof Button>, "children">) => {
  return (
    <Button size={size} variant={variant} {...props}>
      <Edit className="size-3.5 opacity-80" />
      Edit
    </Button>
  );
};

interface BasicEditButtonLinkProps
  extends
    Omit<ComponentProps<"a">, "children">,
    VariantProps<typeof buttonVariance> {}

const BasicEditButtonLink = ({
  className,
  size = "sm",
  variant = "outline",
  ...props
}: BasicEditButtonLinkProps) => {
  return (
    <a className={cn(buttonVariance({ variant, size }), className)} {...props}>
      <Edit className="size-3.5 opacity-80" />
      Edit
    </a>
  );
};

export const EditButtonLink = createLink(BasicEditButtonLink);
