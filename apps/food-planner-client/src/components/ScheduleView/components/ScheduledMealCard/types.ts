import type { TScheduleMealsGet } from "@jcmono/api-contract";

export type ScheduledMealCardProps = {
  foundMeal: TScheduleMealsGet;
  handleDeleteMeal: (mealId: number) => void;
  handleCreateShoppingList: (mealId: number) => void;
  isCreateShoppingListFromMealPending: boolean;
};
