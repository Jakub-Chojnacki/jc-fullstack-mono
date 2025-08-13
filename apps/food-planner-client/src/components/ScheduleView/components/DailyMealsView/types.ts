import type { TScheduleMealsGet } from "@jcmono/api-contract";

export type DailyMealsViewProps = {
  meals: TScheduleMealsGet[];
  currentViewDay: Date;
};
