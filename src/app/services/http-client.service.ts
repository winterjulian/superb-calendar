import {Injectable} from "@angular/core";
import {extendedAppointment} from "../interfaces/extendedAppointment";
import {Observable} from "rxjs";
import {CalendarEvent} from "angular-calendar";
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";
import {BasicDate} from "../interfaces/basicDate";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiEndpoint = 'http://localhost:3000'
  // loadData() {
  //   fetch("http://localhost:3000/appointments", {
  //     method: "GET"
  //   }).then(response => {
  //     console.log('response', response)
  //     return response.json();
  //   }).then(data => {
  //     console.log(data);
  //   })
  // }

  loadDataInDateRangeWithDates(from: Date, to: Date): Observable<ExtendedCalendarEvent[]> {
    /**
     * from: date object;
     * to: date object;
     * alternative for load data with date strings
     */
    return this.loadDataInDateRangeWithStrings(from.toISOString(), to.toISOString());
  }

  loadDataInDateRangeWithStrings(from: string, to: string): Observable<ExtendedCalendarEvent[]> {
    /**
     * from: date string; equal or greater than the start of requested appointments
     * to: date string; equal or lesser than the end of requested appointments
     */
    return new Observable(observer => {
      fetch(this.apiEndpoint + "/appointments" +
        "?" + "start_gte=" + from + "&start_lte=" + to, {
        method: "GET"
      }).then((response: Response) => {
        return response.json();
      }).then((response: Array<ExtendedCalendarEvent>) => {
        response.forEach((appointment: any) => {
          appointment.start = new Date(appointment.start);
          appointment.end = new Date(appointment.end);
        })
        observer.next(response);
        observer.complete();
      })
    })
  }

  loadDataWithBasicDate(basicDate: BasicDate) {
  }

  saveData(input: extendedAppointment): Observable<ExtendedCalendarEvent> {
    /**
     * input: extended appointment
     */

    // TODO: return Observable
    return new Observable(observer => {
      fetch("http://localhost:3000/appointments", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        return response.json();
      }).then((response: ExtendedCalendarEvent) => {
        observer.next(response);
        observer.complete();
      })
    })
  }

  deleteData(input: extendedAppointment) {
    fetch("", {
      // TODO
    })
  }
}
