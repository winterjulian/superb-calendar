import { Component } from '@angular/core';
import {OrganizerComponent} from "../organizer/organizer.component";
import {SpecifyerComponent} from "../specifyer/specifyer.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
    imports: [
        OrganizerComponent,
        SpecifyerComponent
    ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
