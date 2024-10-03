import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FunctionsService} from "../../functions.service";

@Component({
  selector: 'app-appointment-entry',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './appointment-entry.component.html',
  styleUrl: './appointment-entry.component.css'
})
export class AppointmentEntryComponent {
  @Input() date: Date | string = new Date();
  @Input() attendee: number = 0;
  @Input() maxInvitee: number = 0;

  constructor(public functionsService: FunctionsService) {
    this.date = new Date(this.date);
  }
}
