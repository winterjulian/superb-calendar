import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BasicDate} from "../../interfaces/basicDate";
import {ExtendedCalendarEvent} from "../../interfaces/extendedCalendarEvent";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {AppointmentsService} from "../../services/appointments.service";
import {take} from "rxjs";

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [
    DatePipe,
    MatButton
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: '/src/styles.css'
})
export class DialogDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DialogDeleteComponent>);
  constructor(
    public appointmentsService: AppointmentsService,
    @Inject(MAT_DIALOG_DATA) public data: { event: ExtendedCalendarEvent, focussedDay : BasicDate }
  ) {}

  abort() {
    this.dialogRef.close();
  }

  check() {
    this.deleteAppointment(this.data.event.id)
    this.dialogRef.close();
  }

  deleteAppointment(id: number | string | undefined) {
    if (id) {
      this.appointmentsService.deleteAppointment(String(id))
      this.appointmentsService.newDeleteAppointment(String(id))
        .pipe(take(1))
        .subscribe(() => {
          console.log('done');
        })
    } else {
      console.warn('The given id was neither valid string nor valid number')
    }
  }
}
