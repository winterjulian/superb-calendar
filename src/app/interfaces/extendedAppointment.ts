import {AppointmentTime} from "./appointmentTime";

export interface extendedAppointment {
  title: string,
  startTime: AppointmentTime,
  endTime: AppointmentTime
  start: Date;
  end: Date,
  details: string | undefined,
}
