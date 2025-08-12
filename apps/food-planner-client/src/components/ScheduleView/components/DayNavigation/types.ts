export type DayNavigationProps = {
  daysOfWeek: Date[];
  currentViewDay: Date;
  onDayChange: (day: Date) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
};
