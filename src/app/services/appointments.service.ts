import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {BasicDate} from "../interfaces/basicDate";
import {FunctionsService} from "./functions.service";
import {HttpClientService} from "./http-client.service";
import {AppointmentTime} from "../interfaces/appointmentTime";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  constructor(
    public functionsService: FunctionsService,
    public httpClientService: HttpClientService
  ) {
  }

  private focussedBasicDate: BehaviorSubject<BasicDate | null> = new BehaviorSubject<BasicDate | null>(null);

  // GETTER
  getFocussedBasicDate(): Observable<BasicDate | null> {
    return this.focussedBasicDate.asObservable();
  }

  // SETTER

  setFocussedBasicDate(dateInput: BasicDate | null): void {
    this.focussedBasicDate.next(dateInput);
  }

  setFocussedBasicDateByDate(dateInput: Date): void {
    this.focussedBasicDate.next(this.functionsService.extractBasicDateFromDate(dateInput))
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
}
