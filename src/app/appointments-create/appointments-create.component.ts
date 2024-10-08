import {Component, Input, OnInit} from '@angular/core';
import {MatDateRangeInput} from "@angular/material/datepicker";
import {NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../interfaces/basicDate";

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
  public start = {
    "hour": 13,
    "minute": 30
  }
  public end = {
    "hour": 0,
    "minute": 0
  }

  ngOnInit() {
    this.end.hour = this.start.hour + 1;
    this.end.minute = this.start.minute;
  }

  save() {
    const newTitle = this.title;
    const newAppointmentStartDate = new Date(this.focussedDay.year, this.focussedDay.month-1, this.focussedDay.day, this.start.hour, this.start.minute)
    const newAppointmentEndDate: Date = new Date(this.focussedDay.year, this.focussedDay.month-1, this.focussedDay.day, this.end.hour, this.start.minute)

    console.log(newTitle, newAppointmentStartDate, newAppointmentEndDate, this.details)


  }

  dismiss() {

  }

  reload() {

  }
}
