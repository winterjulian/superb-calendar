import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FunctionsService } from "../services/functions.service";
import { NodeModel } from "../interfaces/node.model";
import {BasicDate} from "../interfaces/basicDate";

@Component({
  selector: 'app-daily-appointment',
  templateUrl: './daily-appointment.component.html',
  styleUrl: './daily-appointment.component.scss'
})
export class DailyAppointmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {currentDate: BasicDate}
  ) {}
}
