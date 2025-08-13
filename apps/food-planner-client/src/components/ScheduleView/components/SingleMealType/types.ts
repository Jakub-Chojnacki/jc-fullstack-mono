import type { EMealTypes, TScheduleMealsGet } from "@jcmono/api-contract";

export type MealCardProps = {
  mealType: EMealTypes;
  foundMeal: TScheduleMealsGet | undefined;
  currentViewDay: Date;
};
