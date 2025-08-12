import { EMealTypes } from "@jcmono/api-contract";
import { useState } from "react";

import ScheduleMealForm from "@/forms/ScheduleMealForm";
import useDaysOfWeek from "@/hooks/useDaysOfWeek";
import useGetScheduledMeals from "@/queries/useGetScheduledMeals";

import { DailyMealsView, DayNavigation, ScheduleHeader } from "./components";

function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [currentViewDay, setCurrentViewDay] = useState<Date>(() => new Date());
  const [selectedMealType, setSelectedMealType] = useState<EMealTypes>(
    EMealTypes.BREAKFAST,
  );

  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);

  const { daysOfWeek, startDate, endDate, previousWeek, nextWeek }
    = useDaysOfWeek();

  const { data } = useGetScheduledMeals({
    query: {
      startDate,
      endDate,
    },
  });

  const openAddMealDialog = (day: Date, mealType: EMealTypes): void => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setAddMealDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setSelectedDay(null);
    setSelectedMealType(EMealTypes.BREAKFAST);
    setAddMealDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-6 px-4">
        <ScheduleHeader currentViewDay={currentViewDay} />
        <DayNavigation
          daysOfWeek={daysOfWeek}
          currentViewDay={currentViewDay}
          onDayChange={setCurrentViewDay}
          onPreviousWeek={previousWeek}
          onNextWeek={nextWeek}
        />
        <DailyMealsView
          selectedDay={currentViewDay}
          meals={data?.body || []}
          onAddMeal={openAddMealDialog}
        />
        {addMealDialogOpen && (
          <ScheduleMealForm
            addMealDialogOpen={addMealDialogOpen}
            initialSelectedDay={selectedDay}
            initialMealType={selectedMealType}
            handleCloseDialog={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
}

export default ScheduleView;
