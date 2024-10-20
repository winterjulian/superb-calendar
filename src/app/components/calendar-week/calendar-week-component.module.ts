import {Injectable, NgModule} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarModule, CalendarNativeDateFormatter,
  DateAdapter, DateFormatterParams
} from 'angular-calendar';
import {CommonModule} from "@angular/common";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarWeekComponent} from "./calendar-week.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCalendar} from "@angular/material/datepicker";

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {

  public override dayViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    return new Intl.DateTimeFormat('ca', {hour: 'numeric', minute: 'numeric', hour12: false}).format(date);
  }
  public override weekViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    return new Intl.DateTimeFormat('ca', {hour: 'numeric', minute: 'numeric', hour12: false}).format(date);
  }

}

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
    }),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCalendar,
  ],
  declarations: [CalendarWeekComponent],
  exports: [CalendarWeekComponent],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]
})
export class CalendarWeekComponentModule {}
