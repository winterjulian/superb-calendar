import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: string[]): string {
    let stringyfiedValue = String(value);

    if (stringyfiedValue.length === 1) {
      if (args[0] === 'h') {
        return '0' + stringyfiedValue;
      } else {
        return stringyfiedValue + '0';
      }
    } else {
      return value;
    }
  }

}
