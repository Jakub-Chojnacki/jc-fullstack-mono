import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { TNavMainProps } from "./types";
import { Link } from "@tanstack/react-router";

const NavMain = ({ items }: TNavMainProps) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(({ url, title, ...item }) => (
          <Link to={url}>
            <SidebarMenuButton tooltip={title}>
              {item.icon && <item.icon />}
              <span>{title}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
