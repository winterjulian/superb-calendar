import {Component, ViewChild} from '@angular/core';
import {CalendarMonthComponentModule} from "../calendar-month/calendar-month-component.module";
import {CalendarWeekComponentModule} from "../calendar-week/calendar-week-component.module";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {CalendarWeekComponent} from "../calendar-week/calendar-week.component";

@Component({
  selector: 'app-calendar-display',
  standalone: true,
  imports: [CalendarMonthComponentModule, CalendarWeekComponentModule, MatButton, DatePipe],
  templateUrl: './calendar-display.component.html',
  styleUrl: './calendar-display.component.css'
})
export class CalendarDisplay {
  @ViewChild(CalendarWeekComponent) child!: CalendarWeekComponent;

  constructor() {}
}
