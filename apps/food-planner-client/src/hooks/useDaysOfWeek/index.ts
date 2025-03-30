import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { useState } from "react";

import { TUseDaysOfWeek } from "./types";

const useDaysOfWeek = ():TUseDaysOfWeek => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });

  const previousWeek = (): void => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const nextWeek = (): void => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  return {
    daysOfWeek,
    startDate,
    endDate,
    currentDate,
    previousWeek,
    nextWeek,
  };
};

export default useDaysOfWeek;
