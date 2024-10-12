import {Component, Input, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {MatDateRangeInput} from "@angular/material/datepicker";
import {NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../interfaces/basicDate";
import {AppointmentsService} from "../services/appointments.service";
import {AppointmentTime} from "../interfaces/appointmentTime";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [
    MatDateRangeInput,
    NgbTimepicker,
    FormsModule,
    MatButton
  ],
  templateUrl: './appointments-create.component.html',
  styleUrl: './appointments-create.component.css'
})
export class AppointmentsCreateComponent implements OnInit, OnDestroy {
  @Input() focussedDay!: BasicDate;

  public title: String = '';
  public details: String = '';
  public startTime: WritableSignal<AppointmentTime> = signal({
    "hour": 13,
    "minute": 30
  });
  public endTime: WritableSignal<AppointmentTime> = signal({
    "hour": 0,
    "minute": 0
  });

  private unsubscriber: Subject<void> = new Subject()

  constructor(
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit() {
    // this.endTime.hour = this.startTime.hour + 1;
    // this.endTime.minute = this.startTime.minute;
    this.appointmentsService.getPreferredTime()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((response: AppointmentTime) => {
        console.log('SUBSCRIBE')
        console.log(response)
        this.startTime.set(response);
        this.endTime.set({
          "hour": response.hour + 1,
          "minute": response.minute,
        })
        // setTimeout(() => {
        //   console.log('UPDATING');
        //   this.startTime.set(response);
        //   this.endTime.set({
        //     "hour": response.hour + 1,
        //     "minute": response.minute,
        //   })
        // }, 3000)
    })
  }

  ngOnDestroy() {
    this.unsubscriber.next()
    this.unsubscriber.complete()
  }

  save() {
    const newTitle = this.title;
    this.appointmentsService.saveAppointment(this.title, this.focussedDay, this.startTime(), this.endTime(), this.details)
  }

  dismiss() {

  }

  reload() {

  }
}
