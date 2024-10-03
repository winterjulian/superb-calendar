import { NgModule } from '@angular/core';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {CommonModule, registerLocaleData} from "@angular/common";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarWeekComponent} from "./calendar-week.component";
import {DailyAppointmentComponent} from "../daily-appointment/daily-appointment.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PictureTitlePairComponent} from "../daily-appointment/picture-title-pair/picture-title-pair.component";
import {AppointmentEntryComponent} from "../daily-appointment/appointment-entry/appointment-entry.component";
import {MatCalendar} from "@angular/material/datepicker";
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

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
        PictureTitlePairComponent,
        AppointmentEntryComponent,
        MatCalendar,
    ],
  declarations: [CalendarWeekComponent, DailyAppointmentComponent],
  exports: [CalendarWeekComponent]
})
export class CalendarWeekComponentModule { }
