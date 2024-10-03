import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CalendarMonthComponent } from "./calendar-month.component";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatButton} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatDatepickerModule,
        MatCardModule,
        MatButton,
    ],
  providers: [provideNativeDateAdapter()],
  declarations: [CalendarMonthComponent],
  exports: [CalendarMonthComponent]
})
export class CalendarMonthComponentModule { }
