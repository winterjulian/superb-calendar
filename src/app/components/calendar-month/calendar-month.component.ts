import {Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {MatCalendar} from "@angular/material/datepicker";
import {CalendarMonthHeaderComponent} from "../calendar-month-header/calendar-month-header.component";
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrl: './calendar-month.component.css'
})
export class CalendarMonthComponent implements OnInit {
  @ViewChild('calendar', {static: false}) calendar!: MatCalendar<Date>;

  constructor(
    public storeService: StoreService,
    private dateAdapter: DateAdapter<Date>
  ) {
    // initialization
    this.clickedDate = new Date();
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  public resetting: boolean | undefined = undefined;
  public clickedDate: Date;
  public focussedDate: Date | undefined = undefined;

  ngOnInit() {
    this.storeService.getResetCalendar().subscribe((reset: boolean | undefined) => {
      this.resetting = reset;
    })
    this.storeService.getCurrentlyFocussedDate().subscribe((date: Date | undefined) => {
      this.focussedDate = date;
      if (date) {
        this.goToMonthInCalendar(date)
      }
    })
  }

  onDateValueChange(e: Date | undefined | null) {
    if (e) {
      this.forceSetDate(e);
    } else {
      console.warn('CalendarMonthComponent: Date change event was not a date')
    }
  }

  forceSetStringDate(string: string) {
    this.focussedDate = new Date(string);
    this.setFocussedDate();
  }

  forceSetDate(input?: Date) {
    if (!input) {
      input = this.clickedDate;
    }
    this.focussedDate = input
    this.setFocussedDate();
  }

  setFocussedDate() {
    this.storeService.setCurrentlyFocussedDate(this.focussedDate);
  }

  public goToMonthInCalendar(date: Date) {
    this.calendar._goToDateInView(date, 'month')
  }

  protected readonly CalendarMonthHeaderComponent = CalendarMonthHeaderComponent;
}
