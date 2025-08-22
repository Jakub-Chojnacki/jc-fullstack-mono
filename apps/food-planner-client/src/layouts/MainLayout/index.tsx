import { SidebarInset, SidebarProvider } from "@jcmono/ui";

import AppSidebar from "@/layouts/MainLayout/components/AppSidebar";
import MobileSidebarHeader from "@/layouts/MainLayout/components/MobileSidebarHeader";

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
