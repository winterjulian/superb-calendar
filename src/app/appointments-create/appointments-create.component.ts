import { Component } from '@angular/core';
import {MatDateRangeInput} from "@angular/material/datepicker";

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [
    MatDateRangeInput
  ],
  templateUrl: './appointments-create.component.html',
  styleUrl: './appointments-create.component.css'
})
export class AppointmentsCreateComponent {

}
