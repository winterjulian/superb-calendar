export interface WeekDayModel {
  date: Date;
  day: number;
  isFuture: boolean;
  isPast: boolean;
  isToday: boolean;
  isWeekend: boolean;
}
