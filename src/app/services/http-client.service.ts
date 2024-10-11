import {Injectable} from "@angular/core";
import {AppointmentExtended} from "../interfaces/appointmentExtended";
import {Observable} from "rxjs";
import {CalendarEvent} from "angular-calendar";
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";

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

  loadDataInDateRange(from: string, to: string): Observable<ExtendedCalendarEvent[]> {
    /**
     * from: date string; equal or greater than the start of requested appointments
     * to: date string; equal or lesser than the end of requested appointments
     */
    return new Observable(observer => {
      fetch(this.apiEndpoint + "/appointments" +
        "?" + "start_gte=" + from + "&end_lte" + to, {
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

  saveData(input: AppointmentExtended) {
    fetch("http://localhost:3000/appointments", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      console.log(response)
      return response.json();
    }).then(data => {
      console.log(data)
    })
  }
}
