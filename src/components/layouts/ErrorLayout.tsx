//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ErrorState } from "@stanfordspezi/spezi-web-design-system";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { ApiError } from "@/lib/api/client";

interface ErrorLayoutProps extends ErrorComponentProps {
  entityName?: string;
}

const getErrorMessage = (error: Error, entityName?: string) => {
  if (error instanceof ApiError) {
    if (error.detail) return error.detail;
    switch (error.status) {
      case 404:
        return entityName ?
            `${entityName} not found.`
          : "The page you're looking for doesn't exist.";
      case 403:
        return "You don't have permission to access this page.";
      default:
        return "Something went wrong.";
    }
  }
  return "Something went wrong.";
};

export const ErrorLayout = ({ error, entityName }: ErrorLayoutProps) => {
  return (
    <div className="flex-center size-full">
      <ErrorState>
        <div className="flex flex-col items-center gap-4">
          <p>{getErrorMessage(error, entityName)}</p>
        </div>
      </ErrorState>
    </div>
  );
};
