import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import { OrganizerComponent } from "./organizer/organizer.component";
import { EstatePreviewComponent } from "./estate-preview/estate-preview.component";
import { SpecifyerComponent } from "./specifyer/specifyer.component";
import { CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {CommonModule, registerLocaleData} from "@angular/common";
import { CalendarMonthComponentModule} from "./calendar-month/calendar-month-component.module";
import { CalendarWeekComponentModule} from "./calendar-week/calendar-week-component.module";
import { MatButtonModule} from "@angular/material/button";
import { MatDialogModule} from "@angular/material/dialog";
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule} from "@angular/material/select";
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    CalendarMonthComponentModule,
    CalendarWeekComponentModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    OrganizerComponent,
    AppComponent,
    EstatePreviewComponent,
    SpecifyerComponent,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ]
})
export class AppModule { }
