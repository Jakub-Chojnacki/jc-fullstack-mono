import { useState } from "react";

import useDaysOfWeek from "@/hooks/useDaysOfWeek";
import useGetScheduledMeals from "@/queries/useGetScheduledMeals";

import { DailyMealsView, DayNavigation, ScheduleHeader } from "./components";

function ScheduleView() {
  const [currentViewDay, setCurrentViewDay] = useState<Date>(() => new Date());

  const { daysOfWeek, startDate, endDate, previousWeek, nextWeek }
    = useDaysOfWeek();

  const { data } = useGetScheduledMeals({
    query: {
      startDate,
      endDate,
    },
  });

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
          meals={data?.body || []}
          currentViewDay={currentViewDay}
        />
      </div>
    </div>
  );
}

export default ScheduleView;
