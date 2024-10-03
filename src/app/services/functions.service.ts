import {Injectable} from "@angular/core";
import {AddressModel} from "../interfaces/address.model";

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  extractDate(givenDate: Date): string {
    // returns a standardized date-format by a given date
    let day: number = givenDate.getDate();
    let month: number = givenDate.getMonth();
    let year: number = givenDate.getFullYear();

    return (String(year+'-'+month+'-'+day));
  }

  generateAddress(addressObject: AddressModel): string {
    return addressObject.street
      + ' ' + addressObject.houseNumber
      + ', ' + addressObject.zipCode
      + ' ' + addressObject.city
      + ', ' + addressObject.country
  }

  demandEternalJustice() {
    console.log('Please stop clicking me! Thx <3')
  }
}
