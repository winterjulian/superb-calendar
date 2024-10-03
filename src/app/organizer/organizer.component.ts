import { Component } from '@angular/core';
import {EstatePreviewComponent} from "../estate-preview/estate-preview.component";
import {CalendarMonthComponentModule} from "../calendar-month/calendar-month-component.module";
import {CalendarWeekComponentModule} from "../calendar-week/calendar-week-component.module";
import {MatButton} from "@angular/material/button";
import {StoreService} from "../store.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [EstatePreviewComponent, CalendarMonthComponentModule, CalendarWeekComponentModule, MatButton, DatePipe],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.css'
})
export class OrganizerComponent {
  constructor(public storeService: StoreService) {}


}
