import type { LucideIcon } from "lucide-react";

export type TNavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
};

export type TNavMainProps = {
  items: TNavMainItem[];
};
