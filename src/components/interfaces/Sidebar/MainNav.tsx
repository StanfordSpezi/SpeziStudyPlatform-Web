//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Link,
  useMatchRoute,
  type ValidateLinkOptions,
} from "@tanstack/react-router";
import {
  Bolt,
  ChartBar,
  Home,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { notImplementedToast } from "@/utils/notImplementedToast";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./Sidebar";

interface NavBarItem {
  id?: string;
  title: string;
  linkOptions?: ValidateLinkOptions;
  onClick?: () => void;
  fuzzy?: boolean;
  icon?: LucideIcon;
  subMenu?: NavBarItem[];
}

const navBarItems: NavBarItem[] = [
  {
    id: "search",
    title: "Search",
    icon: Search,
    onClick: () => notImplementedToast("Search"),
  },
  {
    id: "home",
    title: "Home",
    icon: Home,
    linkOptions: { to: "/$group/$study" },
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Bolt,
    linkOptions: { to: "/$group/$study/configuration" },
    subMenu: [
      {
        id: "general",
        title: "General",
        linkOptions: { to: "/$group/$study/configuration/general" },
      },
      {
        id: "consent",
        title: "Consent",
        onClick: () => notImplementedToast("Consent"),
      },
      {
        id: "enrollment",
        title: "Enrollment",
        onClick: () => notImplementedToast("Enrollment"),
      },
      {
        id: "participation",
        title: "Participation",
        linkOptions: { to: "/$group/$study/configuration/participation" },
      },
      {
        id: "components",
        title: "Components",
        linkOptions: { to: "/$group/$study/configuration/components" },
        fuzzy: true,
      },
    ],
  },
  {
    id: "participants",
    title: "Participants",
    icon: Users,
    onClick: () => notImplementedToast("Participants"),
  },
  {
    id: "results",
    title: "Results",
    icon: ChartBar,
    onClick: () => notImplementedToast("Results"),
  },
];

const MainNavButton = ({
  item,
  isSubMenu,
}: {
  item: NavBarItem;
  isSubMenu?: boolean;
}) => {
  const matchRoute = useMatchRoute();
  const MenuButton = isSubMenu ? SidebarMenuSubButton : SidebarMenuButton;
  if (item.linkOptions) {
    return (
      <MenuButton
        asChild
        tooltip={item.title}
        isActive={!!matchRoute({ to: item.linkOptions.to, fuzzy: item.fuzzy })}
      >
        <Link from="/" {...item.linkOptions}>
          {item.icon && <item.icon className="opacity-80" />}
          <span>{item.title}</span>
        </Link>
      </MenuButton>
    );
  }

  return (
    <MenuButton tooltip={item.title} onClick={item.onClick}>
      {item.icon && <item.icon className="opacity-80" />}
      <span>{item.title}</span>
    </MenuButton>
  );
};

export const MainNav = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navBarItems.map((item) => (
          <SidebarMenuItem key={item.id}>
            <MainNavButton item={item} />
            {item.subMenu && (
              <SidebarMenuSub>
                {item.subMenu.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.id}>
                    <MainNavButton item={subItem} isSubMenu />
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
