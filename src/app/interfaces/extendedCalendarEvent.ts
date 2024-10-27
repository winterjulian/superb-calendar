import {CalendarEvent} from "angular-calendar";
import {AppointmentTime} from "./appointmentTime";

export interface ExtendedCalendarEvent extends CalendarEvent {
  startTime: AppointmentTime,
  endTime: AppointmentTime,
  details: string | undefined,
  totalMinutes: number
}
