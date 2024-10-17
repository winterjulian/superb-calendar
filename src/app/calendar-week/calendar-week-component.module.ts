import { NgModule } from '@angular/core';
import {
  CalendarModule,
  DateAdapter
} from 'angular-calendar';
import {CommonModule} from "@angular/common";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarWeekComponent} from "./calendar-week.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCalendar} from "@angular/material/datepicker";

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
  exports: [CalendarWeekComponent]
})
export class CalendarWeekComponentModule {}
