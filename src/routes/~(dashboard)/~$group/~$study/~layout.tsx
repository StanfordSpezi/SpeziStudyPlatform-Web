//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useParams,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ErrorLayout } from "@/components/layouts/ErrorLayout";
import { LocaleProvider } from "@/lib/locale";
import { groupRetrieveQueryOptions } from "@/lib/queries/group";
import { studyRetrieveQueryOptions } from "@/lib/queries/study";

const DashboardLayoutRoute = () => {
  const { study: studyId } = useParams({ from: "/(dashboard)/$group/$study" });
  const { data: study } = useQuery(studyRetrieveQueryOptions({ studyId }));
  return (
    <LocaleProvider studyId={studyId} supportedLocales={study?.locales ?? []}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </LocaleProvider>
  );
};

const StudyErrorComponent = (props: ErrorComponentProps) => (
  <DashboardLayout>
    <ErrorLayout {...props} entityName="Study" />
  </DashboardLayout>
);

export const Route = createFileRoute("/(dashboard)/$group/$study")({
  component: DashboardLayoutRoute,
  errorComponent: StudyErrorComponent,
  beforeLoad: async ({ context: { queryClient }, params }) => {
    // We validate that the `params.group` and `params.study` exist before
    // loading the dashboard, so we can redirect to the error page if they don't.
    await Promise.all([
      queryClient.fetchQuery(
        groupRetrieveQueryOptions({ groupId: params.group }),
      ),
      queryClient.fetchQuery(
        studyRetrieveQueryOptions({ studyId: params.study }),
      ),
    ]);
  },
});
