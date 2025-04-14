import type {
  LucideIcon,
} from "lucide-react";
import {
  Apple,
  NotebookPen,
  ShoppingBasket,
  Utensils,
} from "lucide-react";

import type { SinglePath } from "@/main";

type TNavMainItem = { title: string; url: SinglePath; icon?: LucideIcon };

export const navMainItems: TNavMainItem[] = [
  { title: "Dashboard", url: "/app", icon: NotebookPen },
  { title: "Ingredients", url: "/app/ingredients", icon: Apple },
  { title: "Recipes", url: "/app/recipes", icon: Utensils },
  { title: "Shopping List", url: "/app/shopping", icon: ShoppingBasket },
];
