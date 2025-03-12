import { Apple, NotebookPen, ShoppingBasket, Utensils } from "lucide-react";

export const mockUserData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const navMainItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: NotebookPen,
  },
  {
    title: "Ingredients",
    url: "#",
    icon: Apple,
  },
  {
    title: "Recipes",
    url: "#",
    icon: Utensils,
  },
  {
    title: "Shopping List",
    url: "#",
    icon: ShoppingBasket,
  },
];
