import useIsMobile from "@hooks/useIsMobile";

import { Separator } from "@components/ui/separator";

import { SidebarTrigger } from "../ui/sidebar";

function MobileSidebarHeader() {
  const isMobile = useIsMobile();

  return (
    <header className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-background ${!isMobile && "hidden"}`}>
      <div className="flex items-center gap-2 px-4 w-full">

        <div className="flex items-center w-full">
          <div className="flex items-center justify-between truncate">
            <span className="text-lg font-semibold">Food Planner</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <SidebarTrigger />
          </div>
        </div>

        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
    </header>
  );
}

export default MobileSidebarHeader;
