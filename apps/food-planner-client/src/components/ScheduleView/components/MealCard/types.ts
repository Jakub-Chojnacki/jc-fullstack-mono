import type { EMealTypes, TScheduleMealsGet } from "@jcmono/api-contract";

export type MealCardProps = {
  mealType: string;
  foundMeal: TScheduleMealsGet | undefined;
  selectedDay: Date;
  onAddMeal: (day: Date, mealType: EMealTypes) => void;
};
