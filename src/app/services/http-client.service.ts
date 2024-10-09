import {Injectable} from "@angular/core";
import {AppointmentExtended} from "../interfaces/appointmentExtended";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  loadData() {
    fetch("http://localhost:3000/appointments", {
      method: "GET"
    }).then(response => {
      console.log('response', response)
      return response.json();
    }).then(data => {
      console.log(data);
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
