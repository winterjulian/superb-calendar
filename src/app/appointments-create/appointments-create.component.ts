import {Component, Input, OnInit} from '@angular/core';
import {MatDateRangeInput} from "@angular/material/datepicker";
import {NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../interfaces/basicDate";
import {AppointmentsService} from "../services/appointments.service";
import {AppointmentTime} from "../interfaces/appointmentTime";

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [
    MatDateRangeInput,
    NgbTimepicker,
    FormsModule,
    MatButton
  ],
  templateUrl: './appointments-create.component.html',
  styleUrl: './appointments-create.component.css'
})
export class AppointmentsCreateComponent implements OnInit {
  @Input() focussedDay!: BasicDate;

  public title: String = '';
  public details: String = '';
  public start: AppointmentTime = {
    "hour": 13,
    "minute": 30
  }
  public end: AppointmentTime = {
    "hour": 0,
    "minute": 0
  }

  constructor(
    private appointmentsService: AppointmentsService,
  ) {}

  ngOnInit() {
    this.end.hour = this.start.hour + 1;
    this.end.minute = this.start.minute;
  }

  save() {
    const newTitle = this.title;
    this.appointmentsService.saveAppointment(this.title, this.focussedDay, this.start, this.end, this.details)
  }

  dismiss() {

  }

  reload() {

  }
}
