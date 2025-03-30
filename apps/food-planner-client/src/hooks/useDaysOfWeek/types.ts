export type TUseDaysOfWeek = {
  daysOfWeek: Date[];
  startDate: Date;
  endDate: Date;
  currentDate: Date;
  previousWeek: () => void;
  nextWeek: () => void;
};
