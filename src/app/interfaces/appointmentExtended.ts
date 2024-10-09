import {AppointmentTime} from "./appointmentTime";

export interface AppointmentExtended {
  title: String,
  start: AppointmentTime,
  end: AppointmentTime
  startDate: Date;
  endDate: Date,
  details: String,
}
