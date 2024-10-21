import {Injectable} from "@angular/core";
import {BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, Subject, take} from "rxjs";
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
  private calendarReset: BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(undefined);
  private dailyAppointmentReload: Subject<boolean> = new Subject<boolean>()

  constructor(
    public functionsService: FunctionsService,
    public httpClientService: HttpClientService
  ) {this.initLoadAppointments();}

  private focussedBasicDate: BehaviorSubject<BasicDate | null> = new BehaviorSubject<BasicDate | null>(null);

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

  getResetCalendar(): Subject<boolean | undefined> {
    return this.calendarReset;
  }

  // SETTER

  setFocussedBasicDate(dateInput: BasicDate | null): void {
    this.focussedBasicDate.next(dateInput);
  }

  setFocussedBasicDateByDate(dateInput: Date): void {
    this.focussedBasicDate.next(this.functionsService.extractBasicDateFromDate(dateInput))
  }

  setWeekRange(dateRange: DateRange): void {
    this.weekRange.next(dateRange);
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
    this.weekRange
      .pipe(take(1))
      .subscribe(range => {
        if (range) {
          this.loadAppointments(range)
        }
      })
  }

  initLoadAppointments() {
    this.weekRange.pipe(
      distinctUntilChanged(((prev, curr) =>
        prev?.from.getTime() === curr?.from.getTime() &&
        prev?.to.getTime() === curr?.to.getTime()
      ))
    ).subscribe(dateRange => {
      this.loadAppointments(dateRange!);
    })
  }

  loadAppointments(dateRange: DateRange) {
    this.httpClientService.loadDataInDateRangeWithDates(dateRange.from, dateRange.to)
      .pipe(take(1))
      .subscribe(response => {
        this.appointments.next(response);
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

  resetCalendar(time: number = 500) {
    this.calendarReset.next(true);
    setTimeout(() => {
      this.setCurrentlyFocussedDateToToday();
      this.calendarReset.next(false)
    }, time)
  }
}
