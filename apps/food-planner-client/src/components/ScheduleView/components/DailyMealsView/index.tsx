import type { EMealTypes } from "@jcmono/api-contract";
import { isPast, isSameDay, isToday } from "date-fns";

import { mealTypes } from "../../const";
import SingleMealType from "../SingleMealType";

import type { DailyMealsViewProps } from "./types";

function DailyMealsView({
  meals,
  currentViewDay,
}: DailyMealsViewProps) {
  const isInPast = isPast(currentViewDay) && !isToday(currentViewDay);

  return (
    <div className={`max-w-4xl mx-auto ${isInPast ? "opacity-85" : ""}`}>
      <div className="grid gap-4">
        {mealTypes.map((mealType) => {
          const foundMeal = meals.find(
            meal =>
              meal.mealType === mealType
              && isSameDay(meal.scheduledAt, currentViewDay),
          );

          return (
            <SingleMealType
              key={`meal-${mealType}-${currentViewDay.toISOString()}`}
              mealType={mealType as EMealTypes}
              foundMeal={foundMeal}
              currentViewDay={currentViewDay}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DailyMealsView;
