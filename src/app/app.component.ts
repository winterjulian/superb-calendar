import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {OrganizerComponent} from "./organizer/organizer.component";
import {SpecifyerComponent} from "./specifyer/specifyer.component";
import {CalendarMonthComponentModule} from "./calendar-month/calendar-month-component.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CalendarWeekModule} from "angular-calendar";
import {MatCalendar} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrganizerComponent, SpecifyerComponent, CalendarMonthComponentModule, MatSlideToggleModule, CalendarWeekModule, MatCalendar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperbCalendar';
  today: Date = new Date();
  constructor(private dateAdapter: DateAdapter<Date>) {
    // Set start day of month calendar to monday
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }
}
