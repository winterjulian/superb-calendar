import { Component } from '@angular/core';
import {CalendarBody} from "../calendar-body/calendar-body.component";
import {CalendarSpecifier} from "../calendar-specifier/calendar-specifier.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
    imports: [
        CalendarBody,
        CalendarSpecifier
    ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
