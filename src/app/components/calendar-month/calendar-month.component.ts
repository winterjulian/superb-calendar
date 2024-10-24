import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar} from "@angular/material/datepicker";
import {DateAdapter} from '@angular/material/core';
import {AppointmentsService} from "../../services/appointments.service";
import {reloadAnimation} from "../../../styles/animations";
import {distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrl: './calendar-month.component.css',
  animations: [
    reloadAnimation
  ]
})
export class CalendarMonthComponent implements OnInit {
  @ViewChild('calendar', {static: false}) calendar!: MatCalendar<Date>;

  public clickedDate: Date;
  public focussedDate: Date | undefined = undefined;
  public isReloading = false;

  constructor(
    public appointmentsService: AppointmentsService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.clickedDate = new Date();
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  ngOnInit() {
    this.appointmentsService.getResetCalendar()
      .pipe((distinctUntilChanged(((prev, curr) => prev === curr))))
      .subscribe((reset: boolean) => {
        this.isReloading = reset;
    })
    this.appointmentsService.getCurrentlyFocussedDate().subscribe((date: Date | undefined) => {
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

  forceSetDate(input?: Date) {
    if (!input) {
      input = this.clickedDate;
    }
    this.focussedDate = input
    this.setFocussedDate();
  }

  setFocussedDate() {
    this.appointmentsService.setCurrentlyFocussedDate(this.focussedDate);
  }

  public goToMonthInCalendar(date: Date) {
    this.calendar._goToDateInView(date, 'month')
  }
}
