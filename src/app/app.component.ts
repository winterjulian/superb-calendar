import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {OrganizerComponent} from "./organizer/organizer.component";
import {SpecifyerComponent} from "./specifyer/specifyer.component";
import {CalendarMonthComponentModule} from "./calendar-month/calendar-month-component.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrganizerComponent, SpecifyerComponent, CalendarMonthComponentModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuperbCalendar';

  constructor() {}
}
