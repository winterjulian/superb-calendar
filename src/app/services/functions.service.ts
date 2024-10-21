import {Injectable} from "@angular/core";
import {AddressModel} from "../interfaces/address.model";
import {UrlSegment} from "@angular/router";
import {BasicDate} from "../interfaces/basicDate";
import {AppointmentTime} from "../interfaces/appointmentTime";

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  extractDate(givenDate: Date): string {
    // returns a standardized date-format by a given date
    const day: number = givenDate.getDate();
    const month: number = givenDate.getMonth();
    const year: number = givenDate.getFullYear();

    return (String(year+'-'+month+'-'+day));
  }

  getTotalMinutes(endDate: Date, startDate: Date): number {
    return (endDate.getTime() - startDate.getTime()) / 60000
  }

  extractBasicDateFromURL(urlSegment: Array<UrlSegment>): BasicDate | null {
    if (urlSegment.length > 1) {
      const dateShardsArray: Array<string> = String(urlSegment[1].path).split('-');
      if (dateShardsArray.length === 3) {
        return {
          year: Number(dateShardsArray[0]),
          month: Number(dateShardsArray[1]),
          day: Number(dateShardsArray[2])
        }
      } else {
        console.warn('The date shards array\'s length did not equal 3');
        return null
      }
    } else {
      console.warn('The given URL segment was longer than the expected lenght of 2');
      return null
    }
  }

  generateDateFromBasicDate(basicDate: BasicDate, hour = 0, minutes = 0, seconds = 0) {
    return new Date(basicDate.year, basicDate.month-1, basicDate.day, hour, minutes, seconds);
  }

  generateAddress(addressObject: AddressModel): string {
    return addressObject.street
      + ' ' + addressObject.houseNumber
      + ', ' + addressObject.zipCode
      + ' ' + addressObject.city
      + ', ' + addressObject.country
  }

  getBasicDateFromDateAsString(date: Date, delimiter = '-'): string {
    const dateShards: BasicDate = this.extractBasicDateFromDate(date);
    return dateShards.year + delimiter + dateShards.month + delimiter + dateShards.day;

  }

  extractBasicDateFromDate(date: Date): BasicDate {
    return {
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate(),
    }
  }

  addDayToDate(date: Date, daysAmount = 1) {
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + daysAmount));
  }

  add30MinutesToAppointmentTime(input: AppointmentTime): AppointmentTime {
    return {
      hour: input.minute + 30 > 59 ? input.hour + 1 : input.hour,
      minute: (input.minute + 30) % 60,
    };
  }
}
