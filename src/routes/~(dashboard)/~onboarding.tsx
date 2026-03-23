//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { OnboardingLayout } from "@/components/layouts/OnboardingLayout";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { useAuth } from "@/lib/auth/AuthProvider";
import { groupListQueryOptions } from "@/lib/queries/group";

const OnboardingRoute = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    queryClient.clear();
    await logout();
    await navigate({ to: "/sign-in" });
  };

  return (
    <OnboardingLayout>
      <div className="flex-center max-w-lg flex-col gap-6 text-center">
        <FeaturedIconContainer>
          <div className="bg-bg flex-center size-full inset-shadow-sm">
            <SearchX className="opacity-80" />
          </div>
        </FeaturedIconContainer>
        <div className="flex-center flex-col gap-2">
          <h1 className="text-text max-w-48 text-lg/tight font-medium text-balance">
            You're not in a group
          </h1>
          <p>
            Groups are synced from your identity provider. Contact your
            organization's administrator to get started.
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export const Route = createFileRoute("/(dashboard)/onboarding")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const groups = await queryClient.ensureQueryData(groupListQueryOptions());
    const firstGroup = groups.at(0);
    if (firstGroup) {
      throw redirect({
        to: "/$group",
        params: { group: firstGroup.id },
      });
    }
  },
  component: OnboardingRoute,
});
