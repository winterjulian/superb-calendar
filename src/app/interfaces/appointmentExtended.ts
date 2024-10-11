import {AppointmentTime} from "./appointmentTime";

export interface AppointmentExtended {
  title: String,
  startTime: AppointmentTime,
  endTime: AppointmentTime
  start: Date;
  end: Date,
  details: String,
}
