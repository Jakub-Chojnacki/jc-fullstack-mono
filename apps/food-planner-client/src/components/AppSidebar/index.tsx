import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@jcmono/ui";
import * as React from "react";

import NavMain from "@components/NavMain";
import NavUser from "@components/NavUser";
import ThemeToggle from "@components/ThemeToggle";

import { navMainItems } from "./const";

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" {...props} className="min-h-screen">
      <SidebarHeader>
        <div className="flex items-center justify-between truncate">
          <span className="text-lg font-semibold">Food Planner</span>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
