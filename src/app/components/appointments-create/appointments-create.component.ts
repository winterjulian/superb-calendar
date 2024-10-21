import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDateRangeInput} from "@angular/material/datepicker";
import {NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../../interfaces/basicDate";
import {AppointmentsService} from "../../services/appointments.service";
import {Subject, takeUntil} from "rxjs";
import { NgClass } from "@angular/common";
import {AppointmentTime} from "../../interfaces/appointmentTime";
import {FunctionsService} from "../../services/functions.service";
import {appointmentEndValidator} from "../../helpers/appointment-end.directive";

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [
    MatDateRangeInput,
    NgbTimepicker,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    NgClass
],
  templateUrl: './appointments-create.component.html',
  styleUrls: ['./appointments-create.component.css', '/src/styles.css']
})
export class AppointmentsCreateComponent implements OnInit, OnDestroy {
  @Input() focussedDay!: BasicDate;

  @Output() emitToggleCreating = new EventEmitter<void>

  public appointmentsForm: FormGroup = this.fb.group({
      title: [null, Validators.required],
      focussedDay: this.focussedDay,
      time: this.fb.group({
        startTime: {
          "hour": 13,
          "minute": 30
        },
        endTime: {
          "hour": 0,
          "minute": 0
        },
      }, { validators: appointmentEndValidator()}),
      details: undefined
    })
  private unsubscriber: Subject<void> = new Subject()

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.getPreferredTime();
  }

  ngOnDestroy() {
    this.unsubscriber.next()
    this.unsubscriber.complete()
  }

  // GETTER

  getPreferredTime() {
    this.appointmentsService.getPreferredTime()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((response: AppointmentTime) => {
        this.appointmentsForm.patchValue({
          time: {
            startTime: {
              hour: response.hour, minute: response.minute
            }
          }
        });
        this.appointmentsForm.patchValue({
          time: {
            endTime: this.functionsService.add30MinutesToAppointmentTime(response)
          }
        });
      })
  }

  getErrors(input: string): ValidationErrors | null | undefined {
    return this.appointmentsForm.get(input)?.errors;
  }

  // OTHERS

  toggleCreating() {
    this.emitToggleCreating.emit();
  }

  submit() {
    if (!this.appointmentsForm.valid) {
      this.appointmentsForm.markAllAsTouched();
    } else {
      this.appointmentsService.saveAppointment(
        this.appointmentsForm.value.title,
        this.focussedDay,
        this.appointmentsForm.value.time.startTime,
        this.appointmentsForm.value.time.endTime,
        this.appointmentsForm.value.details
      )
      this.toggleCreating();
    }
  }
}
