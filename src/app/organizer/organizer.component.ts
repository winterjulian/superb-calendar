import { Component } from '@angular/core';
import {CalendarMonthComponentModule} from "../calendar-month/calendar-month-component.module";
import {CalendarWeekComponentModule} from "../calendar-week/calendar-week-component.module";
import {MatButton} from "@angular/material/button";
import {StoreService} from "../services/store.service";
import {DatePipe} from "@angular/common";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [CalendarMonthComponentModule, CalendarWeekComponentModule, MatButton, DatePipe],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.css'
})
export class OrganizerComponent {
  constructor(
    public storeService: StoreService,
    public dataService: DataService
  ) {}

  saveData() {
    this.dataService.saveData( { title: 'TEST', views: 999 } );
  }

  loadData() {
    this.dataService.loadData();
  }
}
