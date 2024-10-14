import {Component, Input} from '@angular/core';
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgIf} from "@angular/common";
import {TimePipe} from "../helpers/time.pipe";

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

  testFunc() {
    console.log('DELETE');
  }
}
