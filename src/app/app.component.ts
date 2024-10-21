import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {OrganizerComponent} from "./components/organizer/organizer.component";
import {SpecifierComponent} from "./components/specifier/specifier.component";
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
  imports: [RouterOutlet, OrganizerComponent, SpecifierComponent, CalendarMonthComponentModule, MatSlideToggleModule, CalendarWeekModule, MatCalendar, CalendarComponent, RouterLink, NgClass],
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

  // TODO: Add angular animations
  // TODO: Finalize event template (calendar-week)
  // TODO: Add a "last-created-appointments" logic (under calendar-month)
  // TODO: rename organizer (=>calendar-display)
  // TODO: rename specifier (=>calendar-specifier)
}
