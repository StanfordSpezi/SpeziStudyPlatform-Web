//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, toast } from "@stanfordspezi/spezi-web-design-system";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { BrandIconGroup } from "@/components/interfaces/BrandIconGroup";
import { getKeycloak } from "@/lib/auth/keycloak";

const SignInRoute = () => {
  const handleSignIn = () => {
    const keycloak = getKeycloak();
    keycloak.login().catch(() => {
      toast.error("Unable to start sign-in. Please try again.");
    });
  };

  return (
    <div className="flex-center relative size-full flex-col gap-10 p-4">
      <div className="bg-dots absolute inset-0 -z-10" />
      <div className="bg-bg absolute inset-0 -z-10 mask-radial-from-10% mask-radial-to-140%" />
      <BrandIconGroup />
      <div className="flex-center flex-col gap-6">
        <h1 className="text-text max-w-48 text-center text-xl/snug font-medium text-balance">
          Welcome to the Spezi Study Platform
        </h1>
        <p className="text-text-secondary max-w-96 text-center text-balance">
          Create, manage, and analyze research studies together with your team.
        </p>
      </div>
      <Button onClick={handleSignIn} size="lg" variant="outline">
        Sign into the dashboard
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-text-tertiary text-sm"
        asChild
      >
        <a href="https://github.com/StanfordSpezi/SpeziStudyPlatform-Web/issues">
          Trouble signing in?
        </a>
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInRoute,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ search }) => {
    // Check if the user is already authenticated
    // if so, redirect them to the specified path or home
    const keycloak = getKeycloak();
    if (keycloak.authenticated) {
      throw redirect({ to: search.redirect ?? "/" });
    }
  },
});
