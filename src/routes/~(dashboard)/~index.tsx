//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute, redirect } from "@tanstack/react-router";
import { groupListQueryOptions } from "@/lib/queries/group";
import { studyListQueryOptions } from "@/lib/queries/study";

/*
  If a user lands on the root path, we want to redirect them to the
  first group and study they have access to. If they have no groups,
  they will be redirected to the onboarding page.
 */
export const Route = createFileRoute("/(dashboard)/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const groups = await queryClient.ensureQueryData(groupListQueryOptions());

    const firstGroup = groups.at(0);

    if (!firstGroup) {
      throw redirect({ to: "/onboarding" });
    }

    const studies = await queryClient.fetchQuery(
      studyListQueryOptions({ groupId: firstGroup.id }),
    );
    const firstStudy = studies.at(0);

    if (!firstStudy) {
      throw redirect({
        to: "/$group",
        params: { group: firstGroup.id },
      });
    }

    throw redirect({
      to: "/$group/$study",
      params: {
        group: firstGroup.id,
        study: firstStudy.id,
      },
    });
  },
});
