import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarEvent, CalendarEventTitleFormatter} from "angular-calendar";
import { CustomEventTitleFormatter } from '../providers/custom-event-title-formatter.provider';
import {StoreService} from "../services/store.service";
import {MatDialog} from "@angular/material/dialog";
import {DailyAppointmentComponent} from "../daily-appointment/daily-appointment.component";
import {FunctionsService} from "../services/functions.service";
import {Subject} from "rxjs";
import {WeekDayModel} from "../interfaces/weekDay.model";
import {Router} from "@angular/router";
import {AppointmentsService} from "../services/appointments.service";
import {HttpClientService} from "../services/http-client.service";

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarWeekComponent implements OnInit {
  constructor(
    private router: Router,
    private storeService: StoreService,
    private appointmentsService: AppointmentsService,
    private functionsService: FunctionsService,
    private httpClientService: HttpClientService,
    public dialog: MatDialog
  ) {
    // Initialization inside the constructor
    this.clickedDate = new Date();
  }

  // To prevent NG0100: Expression has changed after it was checked
  public isSet: Subject<boolean> = new Subject();
  // For next + previous buttons
  public viewDate: Date = new Date();
  public clickedDate: Date;
  public events: CalendarEvent[] = this.storeService.getAppointmentData();
  public startDayWeek: number = 0;
  public endDayWeek: number = 0;
  public startMonth: string = '';
  public endMonth: string = '';
  public startYear: any = '';
  public endYear: any = '';
  public days: Array<string> = [];
  public view: 'month' | 'week' | 'day' = 'week';
  public resetting: boolean | undefined = undefined;

  ngOnInit() {
    this.storeService.getResetCalendar().subscribe((reset: boolean | undefined) => {
      this.resetting = reset;
    })
    this.storeService.getCurrentlyFocussedDate().subscribe((date): void => {
      if (date != undefined) {
        this.viewDate = date;
      }
    })
  }

  hourSegmentClicked(e: any) {
    this.appointmentsService.setFocussedBasicDateByDate(e.date);
    this.router.navigate([
      { outlets:
          { primary: 'calendar',
            side: ['appointments', this.functionsService.getBasicDateFromDateAsString(e.date) ]
          }
      }]
    );
    // this.openDialog(e);
  }

  eventClicked(e: any): void {
    console.log(e);
    this.openDialog(e);
  }

  openDialog(e: any): void {
    let clickedDate: string | undefined = undefined;
    let data: Record<string, any[]> = {};

    if (e.event && e.event.start) {
      clickedDate = this.functionsService.extractDate(e.event.start);
      data = this.storeService.getDailyAppointmentDataByDate(clickedDate);
    }
    const dialogRef = this.dialog.open(DailyAppointmentComponent, {
      width: this.storeService.getDialogWidth(),
      height: this.storeService.getDialogHeight(),
      data: {
        currentDate: clickedDate,
        nodeData: data
      }
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   console.warn('CalendarWeekComponent: The dialog was closed');
    // });
  }

  setDateInformation(e: any): void {

    // header = array with 7 objects (=all weekdays)
    if (e.header != undefined) {
      e.header.forEach((weekDay: WeekDayModel, index: number) => {
        this.days[index] = weekDay.date.getDate() + ' ' + this.storeService.getBasicDayString(index);

        if (index === 0) {
          // get 1st day
          this.startDayWeek = weekDay.date.getDate();
          this.startMonth = this.getDisplayableMonth(weekDay);
          this.startYear = weekDay.date.getFullYear();
        }
        if (index === 6) {
          // get last day
          this.endDayWeek = weekDay.date.getDate();
          this.endMonth = this.getDisplayableMonth(weekDay);
          this.endYear = weekDay.date.getFullYear();

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

    this.isSet.next(true);
  }

  getDisplayableMonth(day: any) {
    return day.date.getFullYear() + '-' + (day.date.getMonth() + 1)
  }

  resetFocussedDay() {
    this.storeService.setCurrentlyFocussedDate(undefined);
  }

  testFunc(input: any) {
    console.log(input)
  }

  loadData() {
    this.httpClientService.loadDataInDateRange(
      '2024-10-07T00:00:00.000Z', // from greater than + equal
      '2024-10-13T23:59:59.000Z' // to lesser than + equal
    ).subscribe(response => {
      this.events = response;
    })
  }
}
