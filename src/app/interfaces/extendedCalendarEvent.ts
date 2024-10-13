import {CalendarEvent} from "angular-calendar";
import {AppointmentTime} from "./appointmentTime";

export interface ExtendedCalendarEvent extends CalendarEvent {
  // +CalendarEvent properties
  startTime: AppointmentTime,
  endTime: AppointmentTime,
  details: string,
}
