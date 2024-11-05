import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FunctionsService} from "../../services/functions.service";
import {distinctUntilChanged, Subject} from "rxjs";
import {WeekDay} from "../../interfaces/weekDay";
import {Router} from "@angular/router";
import {AppointmentsService} from "../../services/appointments.service";
import {ExtendedCalendarEvent} from "../../interfaces/extendedCalendarEvent";
import {reloadTransition} from "../../../styles/animations";

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
  animations: [
    reloadTransition
  ]
})
export class CalendarWeekComponent implements OnInit, OnDestroy {
  public isSet: Subject<boolean> = new Subject();
  public viewDate: Date = new Date();
  public clickedDate: Date;
  public events: ExtendedCalendarEvent[];
  public startDayWeek: number = 0;
  public endDayWeek: number = 0;
  public startMonth: string = '';
  public endMonth: string = '';
  public startYear: string = '';
  public endYear: string = '';
  public days: Array<Record<'display' | 'isToday', boolean | string>> = [];
  public view: 'month' | 'week' | 'day' = 'week';

  public isReloading = false;
  public isOpen = true;

  private basicDayStrings: Array<string> = ['Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat', 'Sun']
  /*
  calendar updates whole view when events are passed
  prevent double updating for animations
   */
  private preventDoubleUpdating: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  constructor(
    private router: Router,
    private appointmentsService: AppointmentsService,
    private functionsService: FunctionsService,
    public dialog: MatDialog
  ) {
    this.clickedDate = new Date();
    this.events = [];
  }

  ngOnInit() {
    this.appointmentsService.getResetCalendar()
      .pipe(
        distinctUntilChanged(((prev, curr) => prev === curr)))
      .subscribe((reset: boolean) => {
        this.isReloading = reset;
    })
    this.appointmentsService.getCurrentlyFocussedDate().subscribe((date: Date | undefined): void => {
      if (date != undefined) {
        this.viewDate = date;
      }
    })
    this.appointmentsService.getAppointments()
      .subscribe(response => {
        this.preventDoubleUpdating = true;
        this.events = response
      })
  }

  ngOnDestroy() {}

  // GETTER

  getWeekDayName(index: number): string {
    return this.basicDayStrings[index];
  }

  getDisplayableMonth(day: Record<'date', Date>) {
    return day.date.getFullYear() + '-' + (day.date.getMonth() + 1)
  }

  // SETTER

  setDateInformation(e: Record<'header', undefined | Array<any>>): void {
    // header = array with 7 objects (=all weekdays)
    if (e.header != undefined) {

      if (!this.preventDoubleUpdating) {
        this.setDateRange(e.header);
      }

      e.header.forEach((weekDay: WeekDay, index: number) => {

        this.days[index] = {
          display: weekDay.date.getDate() + ' ' + this.getWeekDayName(index),
          isToday: weekDay.isToday
        }

        if (index === 0) {
          // get 1st day
          this.startDayWeek = weekDay.date.getDate();
          this.startMonth = this.getDisplayableMonth(weekDay);
          this.startYear = String(weekDay.date.getFullYear());
        }
        if (index === 6) {
          // get last day
          this.endDayWeek = weekDay.date.getDate();
          this.endMonth = this.getDisplayableMonth(weekDay);
          this.endYear = String(weekDay.date.getFullYear());

          // Makes double months invisible, only last one appears (endMonth)

          if (this.startMonth === this.endMonth) {
            this.startMonth = '';
          }
          if (this.startYear === this.endYear) {
            this.startYear = '';
          }
        }
      })
    }

    this.preventDoubleUpdating = false;
    this.isSet.next(true);
  }

  setDateRange(header: Array<any>) {
    if (header.length === 7) {
      this.appointmentsService.setWeekRange({
        from: header[0].date,
        to: this.functionsService.addDayToDate(header[6].date)
      });
    } else {
      console.warn('Given week header was not 7 days long')
    }
  }

  // OTHERS

  hourSegmentClicked(e: Record<'date', Date>) {
    this.appointmentsService.setFocussedBasicDateByDate(e.date);
    this.router.navigate([
      {
        outlets:
          {
            primary: 'calendar',
            side: ['appointments', this.functionsService.getBasicDateFromDateAsString(e.date)]
          }
       }]
    ).then();
    this.appointmentsService.setPreferredTime(e.date)
  }

  eventClicked(e: any): void {
    this.hourSegmentClicked({date: e.event.start});
  }

  resetFocussedDay() {
    this.appointmentsService.setCurrentlyFocussedDate(undefined);
  }

  loadData() {
    this.appointmentsService.getAppointments()
      .subscribe(response => {
        this.events = response;
    })
  }
}
