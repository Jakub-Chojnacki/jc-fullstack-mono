import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@components/ui/sidebar";
import { Link } from "@tanstack/react-router";

import type { TNavMainProps } from "./types";

function NavMain({ items }: TNavMainProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(({ url, title, ...item }) => (
          <Link to={url} key={title}>
            <SidebarMenuButton tooltip={title}>
              {item.icon && <item.icon />}
              <span>{title}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default NavMain;
