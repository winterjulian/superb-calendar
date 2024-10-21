import { Component } from '@angular/core';
import {OrganizerComponent} from "../organizer/organizer.component";
import {SpecifierComponent} from "../specifier/specifier.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
    imports: [
        OrganizerComponent,
        SpecifierComponent
    ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
