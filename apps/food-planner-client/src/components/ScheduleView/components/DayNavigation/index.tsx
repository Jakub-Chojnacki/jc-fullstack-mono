import { Button } from "@jcmono/ui";
import { format, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  DAY_FORMAT,
  SHORT_DAY_OF_WEEK_FORMAT,
} from "@/constants/dates";

import type { DayNavigationProps } from "./types";

function DayNavigation({
  daysOfWeek,
  currentViewDay,
  onDayChange,
  onPreviousWeek,
  onNextWeek,
}: DayNavigationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPreviousWeek}
        className="hover:bg-primary/10 hover:text-primary rounded-xl"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex gap-1 bg-muted/30 rounded-xl p-1">
        {daysOfWeek.map((day) => {
          const isSelected = isSameDay(day, currentViewDay);
          const isToday = isSameDay(day, new Date());
          const dayOfWeek = format(day, SHORT_DAY_OF_WEEK_FORMAT);
          const dayOfMonth = format(day, DAY_FORMAT);
          const handleDayChange = () => onDayChange(day);

          return (
            <button
              key={day.toString()}
              type="button"
              onClick={handleDayChange}
              className={`flex flex-col items-center px-3 py-1.5 rounded-lg transition-all duration-200 min-w-[50px] ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : isToday
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "hover:bg-background hover:shadow-sm"
              }`}
            >
              <span className="text-xs font-medium">{dayOfWeek}</span>
              <span className="text-sm font-bold">{dayOfMonth}</span>
            </button>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNextWeek}
        className="hover:bg-primary/10 hover:text-primary rounded-xl"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default DayNavigation;
