//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system";
import {
  createFileRoute,
  redirect,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { ListPlus } from "lucide-react";
import { NewStudyDialog } from "@/components/interfaces/NewStudyDialog";
import { ErrorLayout } from "@/components/layouts/ErrorLayout";
import { MinimalDashboardLayout } from "@/components/layouts/MinimalDashboardLayout";
import { Card } from "@/components/ui/Card";
import { FeaturedIconContainer } from "@/components/ui/FeaturedIconContainer";
import { groupRetrieveQueryOptions } from "@/lib/queries/group";
import { studyListQueryOptions } from "@/lib/queries/study";
import { cn } from "@/utils/cn";

const GroupRoute = () => {
  const params = Route.useParams();
  return (
    <MinimalDashboardLayout>
      <div className="flex-center size-full px-4">
        <Card className="aspect-video max-w-xl">
          <div className="bg-dots size-full">
            <div
              className={cn(
                "from-layer size-full bg-radial from-50%",
                "flex-center flex-col gap-6 p-6 text-center",
              )}
            >
              <FeaturedIconContainer>
                <div className="bg-bg flex-center size-full inset-shadow-sm">
                  <ListPlus className="opacity-80" />
                </div>
              </FeaturedIconContainer>
              <div className="flex-center flex-col gap-2">
                <h1 className="text-text max-w-48 text-lg/tight font-medium text-balance">
                  Welcome to the Spezi Study Platform!
                </h1>
                <p>Create and launch your first study today.</p>
              </div>
              <NewStudyDialog groupId={params.group}>
                <Button>Create study</Button>
              </NewStudyDialog>
            </div>
          </div>
        </Card>
      </div>
    </MinimalDashboardLayout>
  );
};

/*
 Redirect them to the first available study in their group, if available.
 */
const GroupErrorComponent = (props: ErrorComponentProps) => (
  <MinimalDashboardLayout>
    <ErrorLayout {...props} entityName="Group" />
  </MinimalDashboardLayout>
);

export const Route = createFileRoute("/(dashboard)/$group/")({
  errorComponent: GroupErrorComponent,
  beforeLoad: async ({ context: { queryClient }, params }) => {
    // We validate that the `params.group` exists, so we can throw a more
    // meaningful error if it doesn't.
    await queryClient.ensureQueryData(
      groupRetrieveQueryOptions({ groupId: params.group }),
    );

    const studies = await queryClient.fetchQuery(
      studyListQueryOptions({ groupId: params.group }),
    );
    const firstStudy = studies.at(0);

    if (firstStudy) {
      throw redirect({
        to: "/$group/$study",
        params: {
          group: params.group,
          study: firstStudy.id,
        },
      });
    }
  },
  component: GroupRoute,
});
