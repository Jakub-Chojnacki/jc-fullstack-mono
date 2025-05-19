import type { TLandingSingleFeatureProps } from "../LandingSingleFeature/types";

type TFeature = {
  icon: TLandingSingleFeatureProps["icon"];
  title: string;
  description: string;
};

export const features: TFeature[] = [
  {
    icon: "ClipboardList",
    title: "Ingredient Management",
    description:
      "Add, organize, and track your ingredients and get access to public ingredients added by others.",
  },
  {
    icon: "ChefHat",
    title: "Recipe Collection",
    description:
      "Create and store your favorite recipes with ingredient lists.",
  },
  {
    icon: "CalendarDays",
    title: "Meal Scheduling",
    description:
      "Plan your meals for days, weeks, or months ahead with our intuitive calendar interface.",
  },
  {
    icon: "ShoppingBag",
    title: "Shopping Lists",
    description:
      "Automatically generate shopping lists based on your meal plan or input them manually",
  },
];
