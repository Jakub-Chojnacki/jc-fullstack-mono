import AppSidebar from "@/components/AppSidebar";
import SidebarHeader from "@/components/SidebarHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
