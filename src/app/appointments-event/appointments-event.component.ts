import {Component, EventEmitter, Input} from '@angular/core';
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgIf} from "@angular/common";
import {TimePipe} from "../helpers/time.pipe";
import {AppointmentsService} from "../services/appointments.service";

@Component({
  selector: 'app-appointments-event',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    DatePipe,
    TimePipe
  ],
  templateUrl: './appointments-event.component.html',
  styleUrl: './appointments-event.component.css'
})
export class AppointmentsEventComponent {
  @Input() event!: ExtendedCalendarEvent;

  constructor(private appointmentsService: AppointmentsService) {}

  deleteAppointment(id: number | string | undefined) {
    if (id) {
      this.appointmentsService.deleteAppointment(String(id))
    } else {
      console.warn('The given id was neither valid string nor valid number')
    }
  }
}
