import { Component } from '@angular/core';
import {CalendarDisplay} from "../organizer/calendar-display.component";
import {CalendarSpecifier} from "../calendar-specifier/calendar-specifier.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
    imports: [
        CalendarDisplay,
        CalendarSpecifier
    ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
