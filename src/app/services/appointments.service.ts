import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, pairwise, ReplaySubject, Subject, take} from "rxjs";
import {BasicDate} from "../interfaces/basicDate";
import {FunctionsService} from "./functions.service";
import {HttpClientService} from "./http-client.service";
import {AppointmentTime} from "../interfaces/appointmentTime";
import {DateRange} from "../interfaces/DateRange";
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private today: Date = new Date();
  private weekRange: ReplaySubject<DateRange | undefined> = new ReplaySubject<DateRange | undefined>(1)
  private appointments: ReplaySubject<ExtendedCalendarEvent[]> = new ReplaySubject<ExtendedCalendarEvent[]>(1)
  private preferredTime: ReplaySubject<AppointmentTime> = new ReplaySubject<AppointmentTime>(1)
  private currentlyFocussedDate: Subject<Date | undefined> = new Subject();
  private calendarReset: Subject<boolean> = new Subject<boolean>();
  private dailyAppointmentReload: Subject<boolean> = new Subject<boolean>()
  private focussedBasicDate: BehaviorSubject<BasicDate | null> = new BehaviorSubject<BasicDate | null>(null);

  private reloadAnimationTime: number = 500;

  constructor(
    public functionsService: FunctionsService,
    public httpClientService: HttpClientService
  ) {
    this.initLoadAppointments();
    this.setWeekRange(undefined)
  }


  // GETTER

  getFocussedBasicDate(): Observable<BasicDate | null> {
    return this.focussedBasicDate.asObservable();
  }

  getAppointments(): Observable<ExtendedCalendarEvent[]> {
    return this.appointments;
  }

  getPreferredTime(): Observable<AppointmentTime> {
    return this.preferredTime;
  }

  getAppointmentsByBasicDate(basicDate: BasicDate): Observable<ExtendedCalendarEvent[]> {
    const from = this.functionsService.generateDateFromBasicDate(basicDate);
    const to = this.functionsService.generateDateFromBasicDate(basicDate, 23, 59, 59);
    return this.httpClientService.loadDataInDateRangeWithDates(from, to)
  }

  getDailyAppointmentReload(): Subject<boolean> {
    return this.dailyAppointmentReload;
  }

  getCurrentlyFocussedDate() {
    return this.currentlyFocussedDate;
  }

  getResetCalendar(): Subject<boolean> {
    return this.calendarReset;
  }

  getReloadAnimationTime(): number {
    return this.reloadAnimationTime;
  }

  // SETTER

  setFocussedBasicDate(dateInput: BasicDate | null): void {
    this.focussedBasicDate.next(dateInput);
  }

  setFocussedBasicDateByDate(dateInput: Date): void {
    this.focussedBasicDate.next(this.functionsService.extractBasicDateFromDate(dateInput))
  }

  setWeekRange(dateRange: DateRange | undefined): void {
    this.weekRange.next(dateRange);
  }

  setWeekRangeToThisWeek() {
    let currentWeekDay = this.today.getDay();
    /*
    sunday equals 0.
    If sunday, set to 7 easier for ongoing calculations
     */
    currentWeekDay = currentWeekDay === 7 ? 0 : currentWeekDay;

    const monday = this.addDays(this.today, (-currentWeekDay + 1));
    monday.setHours(0)
    monday.setMinutes(0)
    monday.setSeconds(0)
    monday.setMilliseconds(0)
    const sunday = this.addDays(this.today, (-currentWeekDay + 7))
    sunday.setHours(23)
    sunday.setMinutes(59)
    sunday.setSeconds(59)
    sunday.setMilliseconds(0)

    this.setWeekRange({from: monday, to: sunday})
  }

  addDays(date: Date, days: number) {
    /*
     date must be re-casted as a new Date
     */
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  setPreferredTime(date: Date) {
    const newTime: AppointmentTime = {
      hour: date.getHours(),
      minute: date.getMinutes()
    }
    this.preferredTime.next(newTime);
  }

  setCurrentlyFocussedDate(date: Date | undefined): void {
    this.currentlyFocussedDate.next(date);
  }

  setCurrentlyFocussedDateToToday() {
    this.currentlyFocussedDate.next(this.today);
  }

  // DATA MANAGEMENT

  triggerDailyAppointmentReload() {
    this.dailyAppointmentReload.next(true);
  }

  triggerWeeklyAppointmentReload() {
    /*
    singular (pipe(take(1))) reload of appointments after saving for example
     */
    this.weekRange
      .pipe(take(1))
      .subscribe(range => {
        if (range) {
          this.loadAppointments(range)
        }
      })
  }

  // initLoadAppointments() {
  //   this.weekRange.pipe(
  //     distinctUntilChanged(((prev, curr) =>
  //       prev?.from.getTime() === curr?.from.getTime() &&
  //       prev?.to.getTime() === curr?.to.getTime()
  //     ))
  //   ).subscribe(dateRange => {
  //     this.loadAppointments(dateRange!);
  //   })
  // }

  initLoadAppointments() {
    this.weekRange
      .pipe(pairwise())
      .subscribe((dateRangeArray: Array<DateRange | undefined>) => {
        const prev = dateRangeArray[0];
        const curr = dateRangeArray[1];
        if (prev?.from.getTime() === curr?.from.getTime()) {
          setTimeout(() => {
            this.calendarReset.next(false);
          }, this.reloadAnimationTime);
        } else {
          this.loadAppointments(curr!);
        }

    })
  }

  loadAppointments(dateRange: DateRange) {
    this.httpClientService.loadDataInDateRangeWithDates(dateRange.from, dateRange.to)
      .pipe(take(1))
      .subscribe(response => {
        this.appointments.next(response);
        this.calendarReset.next(false);
    })
  }

  saveAppointment(
    title: string,
    focussedDay: BasicDate,
    startTime: AppointmentTime,
    endTime: AppointmentTime,
    details: string | undefined
  ) {
    const startAsValidDate = new Date(focussedDay.year, focussedDay.month-1, focussedDay.day, startTime.hour, startTime.minute)
    const endAsValidDate: Date = new Date(focussedDay.year, focussedDay.month-1, focussedDay.day, endTime.hour, endTime.minute)
    const newAppointment = {
      title,
      startTime,
      endTime,
      start: startAsValidDate,
      end: endAsValidDate,
      details: details,
      totalMinutes: this.functionsService.getTotalMinutes(endAsValidDate, startAsValidDate)
    }
    this.httpClientService.saveData(newAppointment)
      .pipe(take(1))
      .subscribe(() => {
        this.triggerDailyAppointmentReload();
        this.triggerWeeklyAppointmentReload();
      })
  }

  deleteAppointment(id: string) {
    this.httpClientService.deleteData(id)
      .pipe(take(1))
      .subscribe(() => {
        this.triggerDailyAppointmentReload();
        this.triggerWeeklyAppointmentReload();
      })
  }

  resetCalendar() {
    this.calendarReset.next(true);
    /*
    set timeout for animation to end successfully
     */
    setTimeout(() => {
      this.setCurrentlyFocussedDateToToday();
      this.setWeekRangeToThisWeek();
    }, this.reloadAnimationTime)
  }
}
