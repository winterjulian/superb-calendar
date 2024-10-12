import {AppointmentTime} from "./appointmentTime";

export interface extendedAppointment {
  title: String,
  startTime: AppointmentTime,
  endTime: AppointmentTime
  start: Date;
  end: Date,
  details: String,
}
