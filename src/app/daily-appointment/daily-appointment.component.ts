import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FunctionsService } from "../functions.service";
import { NodeModel } from "../interfaces/node.model";

@Component({
  selector: 'app-daily-appointment',
  templateUrl: './daily-appointment.component.html',
  styleUrl: './daily-appointment.component.scss'
})
export class DailyAppointmentComponent {
  constructor(
    public functionsService: FunctionsService,
    @Inject(MAT_DIALOG_DATA) public data: {currentDate: string, nodeData: Record<string, Array<NodeModel>>}
  ) {}

  store: Record<string, Array<NodeModel>> = this.data.nodeData;
}
