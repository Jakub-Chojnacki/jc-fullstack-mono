import type { EMealTypes, TScheduleMealsGet } from "@jcmono/api-contract";

export type DailyMealsViewProps = {
  selectedDay: Date;
  meals: TScheduleMealsGet[];
  onAddMeal: (day: Date, mealType: EMealTypes) => void;
};
