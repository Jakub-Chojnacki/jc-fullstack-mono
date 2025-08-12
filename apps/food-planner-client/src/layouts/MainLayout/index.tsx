import AppSidebar from "@components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";

import MobileSidebarHeader from "@/components/MobileSidebarHeader";

function MainLayout({ children }: { children: React.ReactElement }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MobileSidebarHeader />
        <div className="flex flex-1 flex-col gap-4 pt-0 p-4  max-h-dvh max-w-screen-2xl mx-auto w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;
