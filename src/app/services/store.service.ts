import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import * as jsonData from '../../assets/data.json';
import {DataWrapperModel} from "../interfaces/dataWrapper.model";
import {CalendarEvent} from "angular-calendar";
import {addHours} from "date-fns";
import {NodeModel} from "../interfaces/node.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {
    this.refineRawAppointmentData();
  }

  private primaryColor: string = '#f7f7f7'; // equals oyster-black
  private secondaryColor: string = '#1d3a3d'; // equals oyster-black
  private dialogWidth: string = '725px';
  private dialogHeight: string = '500px';
  private today: Date = new Date();
  private currentlyFocussedDate: Subject<Date | undefined> = new Subject();
  private calendarReset: BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(undefined);
  // see "compilerOptions": { "resolveJsonModule": true ...};
  private rawAppointmentData: DataWrapperModel = jsonData;
  private appointmentData: CalendarEvent[] = [];
  private dailyAppointments: Record<string, Record<string, any[]>> = {};
  // Only works when week start = sunday
  // TODO: flexible week start
  private basicDayStrings: Array<string> = ['Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat', 'Sun']

  /* GENERAL */

  refineRawAppointmentData() {
    if (this.rawAppointmentData.data) {
      [this.getLastProperty()].forEach((node: NodeModel) => {

        this.createDailyAppointmentStore(node);

        let appointmentObject = this.createAppointmentObject(node);
        this.appointmentData.push(appointmentObject);
      })
    }
    console.log(this.appointmentData);
    /**
     *
     * end
     * :
     * Wed Oct 09 2024 14:45:00 GMT+0200 (Mitteleuropäische Sommerzeit)
     * [[Prototype]]
     * :
     * Object
     * start
     * :
     * Wed Oct 09 2024 13:15:00 GMT+0200 (Mitteleuropäische Sommerzeit)
     * [[Prototype]]
     * :
     * Object
     * title
     * :
     * "2 Zimmer in Stendal"
     */
  }

  createDailyAppointmentStore(node: NodeModel) {
    /**
     * Creates dailyAppointments by propertyId by day (y-m-d)
     * { 'y-m-d': { propertyId: [{node}] } }
     */
    let keyDate: string = this.createKeyDate(new Date(node.date));
    let keyPropId: string = String(node.property.id);

    if (this.dailyAppointments.hasOwnProperty(keyDate)) {
      if (this.dailyAppointments[keyDate].hasOwnProperty(keyPropId)) {
        this.dailyAppointments[keyDate][keyPropId].push(node);
      } else {
        this.dailyAppointments[keyDate][keyPropId] = [node];
      }
    } else {
      this.dailyAppointments[keyDate] = {};
      this.dailyAppointments[keyDate][keyPropId] = [node];
    }
  }

  createKeyDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return String(year+'-'+month+'-'+day);
  }

  createAppointmentObject(node: NodeModel) {
    return {
      title: String(node.property.name),
      start: new Date(node.date),
      end: addHours(new Date(node.date), 0.5),
    }
  }

  resetCalendar(time: number = 500) {
    this.calendarReset.next(true);
    setTimeout(() => {
      this.setCurrentlyFocussedDateToToday();
      this.calendarReset.next(false)
    }, time)
  }

  // resetCalendar() {
  //   this.calendarReset.next(true);
  //   this.setCurrentlyFocussedDateToToday();
  //   setTimeout(() => {this.calendarReset.next(false)}, 500)
  // }

  /* GETTER */

  getCurrentlyFocussedDate() {
    return this.currentlyFocussedDate;
  }

  getResetCalendar(): Subject<boolean | undefined> {
    return this.calendarReset;
  }

  getAppointmentData(): CalendarEvent[] {
    console.log(this.appointmentData);
    console.log(this.appointmentData[0].start);
    return this.appointmentData;
  }

  getDailyAppointmentDataByDate(date: string): Record<string, any[]> {
    return this.dailyAppointments[date];
  }

  getBasicDayString(index: number): string {
    return this.basicDayStrings[index];
  }

  getDialogWidth(): string {
    return this.dialogWidth;
  }

  getDialogHeight(): string {
    return this.dialogHeight;
  }

  getLastProperty(): NodeModel {
    return {
      "id": "2442449",
      "date": "2024-10-09T11:15:00.000+0000",
      "maxInviteeCount": 3,
      "attendeeCount": 2,
      "showContactInformation": false,
      "contact": {
        "firstName": "",
        "name": "",
        "email": "",
        "mobile": "",
        "phone": "",
        "address": {},
        "fullName": ""
      },
      "property": {
        "id": "2442379",
        "name": "2 Zimmer\nin Stendal",
        "inviteeCount": 2,
        "address": {
          "street": "Karlhagenbeckstr",
          "houseNumber": "31",
          "city": "Stendal",
          "country": "DE",
          "zipCode": "39576",
        },
        "attachments": [],
        "user": {
          "profile": {
            "firstname": "Max",
            "name": "Mustermann",
            "phone": "",
            "gender": "NA",
            "title": "NONE"
          },
          "usertype": "COMPANYADMIN",
        },
      },
    }
  }

  /* SETTER */

  setCurrentlyFocussedDate(date: Date | undefined): void {
    this.currentlyFocussedDate.next(date);
  }

  setCurrentlyFocussedDateToToday() {
    this.currentlyFocussedDate.next(this.today);
  }

}
