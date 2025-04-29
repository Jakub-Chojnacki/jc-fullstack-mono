import AppSidebar from "@components/AppSidebar";
import SidebarHeader from "@components/SidebarHeader";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";

function MainLayout({ children }: { children: React.ReactElement }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarHeader />
        <div className="flex flex-1 flex-col gap-4 pt-0 p-4 lg:pt-4 max-h-dvh max-w-screen-xl mx-auto w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;
