import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@jcmono/ui";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth";
import { router } from "@/main";
import useAuthMe from "@/queries/useAuthMe";

function NavUser() {
  const { data, isLoading } = useAuthMe();

  const handleLogout = async (): Promise<void> => {
    await authClient.signOut();
    router.navigate({ to: "/signin" });
    toast.success("Logged out successfully");
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
