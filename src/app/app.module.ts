import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import { OrganizerComponent } from "./components/organizer/organizer.component";
import { SpecifyerComponent } from "./components/specifyer/specifyer.component";
import {
  CalendarDateFormatter,
  CalendarNativeDateFormatter,
} from 'angular-calendar';
import {CommonModule} from "@angular/common";
import { CalendarMonthComponentModule} from "./components/calendar-month/calendar-month-component.module";
import { CalendarWeekComponentModule} from "./components/calendar-week/calendar-week-component.module";
import { MatButtonModule} from "@angular/material/button";
import { MatDialogModule} from "@angular/material/dialog";
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule} from "@angular/material/select";
import localeDe from '@angular/common/locales/de';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    CommonModule,
    CalendarMonthComponentModule,
    CalendarWeekComponentModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    OrganizerComponent,
    AppComponent,
    SpecifyerComponent,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    {provide: CalendarDateFormatter, useClass: CalendarNativeDateFormatter}
  ]
})
export class AppModule { }
