import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {OrganizerComponent} from "./organizer/organizer.component";
import {SpecifyerComponent} from "./specifyer/specifyer.component";
import {CalendarMonthComponentModule} from "./calendar-month/calendar-month-component.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CalendarWeekModule} from "angular-calendar";
import {MatCalendar} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";
import {DataService} from "./services/data.service";
import {CalendarComponent} from "./calendar/calendar.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrganizerComponent, SpecifyerComponent, CalendarMonthComponentModule, MatSlideToggleModule, CalendarWeekModule, MatCalendar, CalendarComponent, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperbCalendar';
  today: Date = new Date();
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private dataService: DataService
  ) {
    // Set start day of month calendar to monday
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }
}
