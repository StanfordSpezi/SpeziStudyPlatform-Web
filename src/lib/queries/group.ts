//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  getGroupsOptions,
  getGroupsByGroupIdOptions,
} from "../api/generated/@tanstack/react-query.gen";

// --- Queries ---

export const groupListQueryOptions = () => getGroupsOptions();

export const groupRetrieveQueryOptions = ({ groupId }: { groupId: string }) =>
  getGroupsByGroupIdOptions({ path: { groupId } });
