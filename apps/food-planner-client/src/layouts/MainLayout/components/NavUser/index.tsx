import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@jcmono/ui";
import { LogOut } from "lucide-react";

import useAuthMe from "@/queries/useAuthMe";
import useLogout from "@/queries/useLogout";

function NavUser() {
  const { data, isLoading } = useAuthMe();
  const { mutate } = useLogout();

  const handleLogout = (): void => {
    mutate({});
  };

  if (isLoading) {
    return <SidebarMenuItem>Loading...</SidebarMenuItem>;
  }

  if (data) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            className="w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
}

export default NavUser;
