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
  public startTime: AppointmentTime = {
    "hour": 13,
    "minute": 30
  }
  public endTime: AppointmentTime = {
    "hour": 0,
    "minute": 0
  }

  constructor(
    private appointmentsService: AppointmentsService,
  ) {}

  ngOnInit() {
    this.endTime.hour = this.startTime.hour + 1;
    this.endTime.minute = this.startTime.minute;
  }

  save() {
    const newTitle = this.title;
    this.appointmentsService.saveAppointment(this.title, this.focussedDay, this.startTime, this.endTime, this.details)
  }

  dismiss() {

  }

  reload() {

  }
}
