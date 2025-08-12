import { format, isSameDay } from "date-fns";
import { NotebookPen } from "lucide-react";

import { YEAR_MONTH_DAY_FORMAT } from "@/constants/dates";

import type { ScheduleHeaderProps } from "./types";

function ScheduleHeader({ currentViewDay }: ScheduleHeaderProps) {
  const displayDate = format(currentViewDay, YEAR_MONTH_DAY_FORMAT);
  const isToday = isSameDay(currentViewDay, new Date());

  return (
    <div className="flex items-center justify-center md:justify-between mb-6">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <NotebookPen className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            Meal Schedule
          </span>
        </div>
        <h1 className="text-2xl font-bold">
          {displayDate}
          {isToday && (
            <span className="ml-2 text-sm bg-primary text-primary-foreground px-2 py-1 rounded-full">
              Today
            </span>
          )}
        </h1>
      </div>
    </div>
  );
}

export default ScheduleHeader;
