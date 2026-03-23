//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { SpeziProvider, Toaster } from "@stanfordspezi/spezi-web-design-system";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ComponentProps } from "react";

export interface RouterAppContext {
  queryClient: QueryClient;
}

const routerProps: ComponentProps<typeof SpeziProvider>["router"] = {
  Link: ({ href, ...props }) => <Link to={href} {...props} />,
};

const RootComponent = () => {
  return (
    <>
      <HeadContent />
      <SpeziProvider router={routerProps}>
        <div className="grid h-svh grid-rows-[1fr]">
          <Outlet />
        </div>
        <Toaster position="top-center" />
      </SpeziProvider>
    </>
  );
};

/**
 * Minimal standalone error component for the root route.
 * Uses inline styles instead of design system components because this catches
 * errors that occur before SpeziProvider mounts.
 */
const RootErrorComponent = ({ error, reset }: ErrorComponentProps) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100svh",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    <div style={{ textAlign: "center", maxWidth: "24rem" }}>
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        Something went wrong
      </h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>{error.message}</p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          border: "1px solid #d1d5db",
          background: "white",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  </div>
);

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  head: () => ({
    meta: [
      { title: "Spezi Study Platform" },
      {
        name: "description",
        content:
          "Spezi Study Platform is a web application that allows users to create and manage studies.",
      },
    ],
    links: [{ rel: "icon", href: "favicon.ico" }],
  }),
});
