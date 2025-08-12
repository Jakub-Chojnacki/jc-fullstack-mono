import { mealTypes } from "../../const";
import MealCard from "../MealCard";

import type { DailyMealsViewProps } from "./types";

function DailyMealsView({
  selectedDay,
  meals,
  onAddMeal,
}: DailyMealsViewProps) {
  const isPast = selectedDay < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div className={`max-w-4xl mx-auto ${isPast ? "opacity-85" : ""}`}>
      <div className="grid gap-4">
        {mealTypes.map((mealType) => {
          const foundMeal = meals.find(
            meal =>
              meal.mealType === mealType
              && (typeof meal.scheduledAt === "string"
                ? meal.scheduledAt === selectedDay.toISOString()
                : meal.scheduledAt.toISOString() === selectedDay.toISOString()),
          );

          return (
            <MealCard
              key={mealType}
              mealType={mealType}
              foundMeal={foundMeal}
              selectedDay={selectedDay}
              onAddMeal={onAddMeal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DailyMealsView;
