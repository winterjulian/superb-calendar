import {Injectable} from "@angular/core";
import {extendedAppointment} from "../interfaces/extendedAppointment";
import {Observable} from "rxjs";
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";
import * as config from '../../../json-server.json';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiEndpoint = 'http://localhost:' + config.port;

  loadDataInDateRangeWithDates(from: Date, to: Date): Observable<ExtendedCalendarEvent[]> {
    // TODO: reposition into appointmentsService
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
    console.log('>>> loadingData');

    return new Observable(observer => {
      fetch(this.apiEndpoint + "/appointments" +
        "?" + "start_gte=" + from + "&start_lte=" + to, {
        method: "GET"
      }).then((response: Response) => {
        return response.json();
      }).then((response: Array<ExtendedCalendarEvent>) => {
        response.forEach((appointment: ExtendedCalendarEvent) => {
          if (appointment.start && appointment.end) {
            appointment.start = new Date(appointment.start);
            appointment.end = new Date(appointment.end);
          } else {
            console.warn('an appointment from the db had no valid start or end')
          }
        })
        observer.next(response);
        observer.complete();
      })
    })
  }

  saveData(input: extendedAppointment): Observable<ExtendedCalendarEvent> {
    /**
     * input: extended appointment
     */

    return new Observable(observer => {
      fetch(this.apiEndpoint + "/appointments", {
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

  deleteData(id: string) {
    /**
     * id: string or number given by JSON-server
     * stringified at this point
     */
    return new Observable(observer => {
      fetch(this.apiEndpoint + "/appointments/" + id, {
        method: "DELETE",
      }).then(response => {
        return response.json();
      }).then(response => {
        observer.next(response);
        observer.complete();
      })
    })
  }
}
