import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CalendarBody} from "./components/calendar-body/calendar-body.component";
import {CalendarSpecifier} from "./components/calendar-specifier/calendar-specifier.component";
import {CalendarMonthComponentModule} from "./components/calendar-month/calendar-month-component.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CalendarWeekModule} from "angular-calendar";
import {MatCalendar} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarBody, CalendarSpecifier, CalendarMonthComponentModule, MatSlideToggleModule, CalendarWeekModule, MatCalendar, CalendarComponent, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperbCalendar';
  constructor(
    private dateAdapter: DateAdapter<Date>,
  ) {
    // Set start day of month calendar to monday
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  // TODO: Introduce NGRX
  // TODO: Add a "last-created-appointments" logic (under calendar-month)
  // TODO: Implement Tailwind Css
  // TODO: Migrate to inject() for constructor initialization
  // TODO: Implement Lazy-Loading for router components
  // TODO: Outsource subscription calls in services
  // TODO: Dissolve nested subscriptions
}
