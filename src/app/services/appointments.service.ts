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
  private dateRange: Subject<DateRange | undefined> = new Subject<DateRange | undefined>()
  private appointments: Subject<ExtendedCalendarEvent[]> = new Subject<ExtendedCalendarEvent[]>()
  private preferredTime: ReplaySubject<AppointmentTime> = new ReplaySubject<AppointmentTime>(1)

  constructor(
    public functionsService: FunctionsService,
    public httpClientService: HttpClientService
  ) {
    this.initLoadAppointments();
  }

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

  // SETTER

  setFocussedBasicDate(dateInput: BasicDate | null): void {
    this.focussedBasicDate.next(dateInput);
  }

  setFocussedBasicDateByDate(dateInput: Date): void {
    this.focussedBasicDate.next(this.functionsService.extractBasicDateFromDate(dateInput))
  }

  setDateRange(dateRange: DateRange): void {
    this.dateRange.next(dateRange);
  }

  setPreferredTime(date: Date) {
    console.log('>>> setPreferredTime');
    let newTime: AppointmentTime = {
      hour: date.getHours(),
      minute: date.getMinutes()
    }
    this.preferredTime.next(newTime);
  }

  // DATA MANAGEMENT

  saveAppointment(title: String, focussedDay: BasicDate, startTime: AppointmentTime, endTime: AppointmentTime, details: String) {
    const refinedStart = new Date(focussedDay.year, focussedDay.month-1, focussedDay.day, startTime.hour, startTime.minute)
    const refinedEnd: Date = new Date(focussedDay.year, focussedDay.month-1, focussedDay.day, endTime.hour, endTime.minute)
    const newAppointment = {
      title,
      startTime,
      endTime,
      start: refinedStart,
      end: refinedEnd,
      details
    }
    console.log(newAppointment);
    this.httpClientService.saveData(newAppointment)
  }

  initLoadAppointments() {
    this.dateRange.pipe(
      distinctUntilChanged(((prev, curr) =>
        prev?.from.getTime() === curr?.from.getTime() &&
        prev?.to.getTime() === curr?.to.getTime()
      ))
    ).subscribe(dateRange => {
      console.log(dateRange);
      this.loadAppointments(dateRange!);
    })
  }

  loadAppointments(dateRange: DateRange) {
    console.log('LOADING');
    this.httpClientService.loadDataInDateRangeWithDates(dateRange.from, dateRange.to)
      .subscribe(response => {
        console.log(response);
        this.appointments.next(response);
    })
  }
}
