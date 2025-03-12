import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

const SidebarHeader = () => {
  const { isMobile } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <div className="flex items-center justify-between w-full">
          {isMobile && <SidebarTrigger />}
        </div>
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
    </header>
  );
};

export default SidebarHeader;
