import {Component, Input} from '@angular/core';
import {ExtendedCalendarEvent} from "../../interfaces/extendedCalendarEvent";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {TimePipe} from "../../helpers/time.pipe";
import {MatDialog} from "@angular/material/dialog";
import {BasicDate} from "../../interfaces/basicDate";
import {DialogDeleteComponent} from "../../dialogs/dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-appointments-event',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    DatePipe,
    TimePipe,
    NgClass
  ],
  templateUrl: './appointments-event.component.html',
  styleUrl: './appointments-event.component.css'
})
export class AppointmentsEventComponent {
  @Input() focussedDay!: BasicDate;
  @Input() event!: ExtendedCalendarEvent;

  constructor(
    public dialog: MatDialog,
  ) {}

  openDeleteDialog(event: ExtendedCalendarEvent): void {
    this.dialog.open(DialogDeleteComponent, {
      panelClass: 'custom-dialog-container',
      width: "350px",
      data: {
        event: event,
        focussedDay: this.focussedDay,
      }
    });
  }
}
