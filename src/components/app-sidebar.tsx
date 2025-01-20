"use client";

import * as React from "react";
import { GalleryVerticalEnd, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
export const data = {
  teams: [
    {
      name: "Data SD WAN",
      logo: GalleryVerticalEnd,
      plan: "Insight",
    },
  ],
  navMain: [
    {
      title: "Net Profit",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      vizUrl: process.env.NEXT_PUBLIC_VIZ_URL as string,
      items: [
        {
          title: "Gross Profit",
          url: "#",
        },
        {
          title: "Net Profit",
          url: "#",
        },
        {
          title: "Profit & Loss Statement",
          url: "#",
        },
      ],
    },
    {
      title: "Informasi 2",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      vizUrl: process.env.NEXT_PUBLIC_VIZ_URL2 as string,
      items: [
        {
          title: "Item 1",
          url: "#",
        },
        {
          title: "Item 2",
          url: "#",
        },
        {
          title: "Item 3",
          url: "#",
        },
      ],
    },
    {
      title: "Informasi 3",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Item 1",
          url: "#",
        },
        {
          title: "Item 2",
          url: "#",
        },
        {
          title: "Item 3",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({
  onSelect,
  ...props
}: { onSelect: (vizUrl: string) => void } & React.ComponentProps<
  typeof Sidebar
>) {
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.fullName, // Assuming fullName is the name
            email: data.email,
            avatar: data.avatar, // Ensure avatar is included in the API response
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          onSelect={(vizUrl) => {
            onSelect(vizUrl);
          }}
        />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
