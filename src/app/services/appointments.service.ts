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
  private appointments: ReplaySubject<ExtendedCalendarEvent[]> = new ReplaySubject<ExtendedCalendarEvent[]>()
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

  getAppointmentsByBasicDate(basicDate: BasicDate): Observable<ExtendedCalendarEvent[]> {
    let from = this.functionsService.generateDateFromBasicDate(basicDate);
    let to = this.functionsService.generateDateFromBasicDate(basicDate, 23, 59, 59);
    return this.httpClientService.loadDataInDateRangeWithDates(from, to)
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
    let newTime: AppointmentTime = {
      hour: date.getHours(),
      minute: date.getMinutes()
    }
    this.preferredTime.next(newTime);
  }

  // DATA MANAGEMENT

  saveAppointment(title: String, focussedDay: BasicDate, startTime: AppointmentTime, endTime: AppointmentTime, details: String) {
    const startAsValidDate = new Date(focussedDay.year, focussedDay.month-1, focussedDay.day, startTime.hour, startTime.minute)
    const endAsValidDate: Date = new Date(focussedDay.year, focussedDay.month-1, focussedDay.day, endTime.hour, endTime.minute)
    const newAppointment = {
      title,
      startTime,
      endTime,
      start: startAsValidDate,
      end: endAsValidDate,
      details
    }
    this.httpClientService.saveData(newAppointment).pipe(take(1)).subscribe(savedAppointment => {
      this.appointments.pipe(take(1)).subscribe((response: ExtendedCalendarEvent[]) => {
        console.log(response);
        console.log(savedAppointment);
        console.log(response.push(savedAppointment));
        let newArray = response;
        newArray.push(savedAppointment);
        // let newArray = response.push(savedAppointment);
        this.appointments.next(newArray);
      })
    })
  }

  initLoadAppointments() {
    this.dateRange.pipe(
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
      .subscribe(response => {
        this.appointments.next(response);
    })
  }
}
