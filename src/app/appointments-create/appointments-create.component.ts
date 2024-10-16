import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDateRangeInput} from "@angular/material/datepicker";
import {NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../interfaces/basicDate";
import {AppointmentsService} from "../services/appointments.service";
import {Subject, takeUntil} from "rxjs";
import {NgIf} from "@angular/common";
import {AppointmentTime} from "../interfaces/appointmentTime";
import {FunctionsService} from "../services/functions.service";

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [
    MatDateRangeInput,
    NgbTimepicker,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './appointments-create.component.html',
  styleUrl: './appointments-create.component.css'
})
export class AppointmentsCreateComponent implements OnInit, OnDestroy {
  @Input() focussedDay!: BasicDate;

  @Output() emitToggleCreating = new EventEmitter<void>

  public appointmentsForm: FormGroup = this.fb.group({
      title: [null, Validators.required],
      focussedDay: this.focussedDay,
      startTime: {
        "hour": 13,
        "minute": 30
      },
      endTime:  {
        "hour": 0,
        "minute": 0
      },
      details: undefined
    })
  private unsubscriber: Subject<void> = new Subject()

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.appointmentsService.getPreferredTime()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((response: AppointmentTime) => {
        console.log(response);
        this.appointmentsForm.patchValue({startTime: {hour: response.hour, minute: response.minute}});
        this.appointmentsForm.patchValue({endTime: this.functionsService.add30MinutesToAppointmentTime(response)});
    })
  }

  ngOnDestroy() {
    this.unsubscriber.next()
    this.unsubscriber.complete()
  }

  getErrors(input: string): ValidationErrors | null | undefined {
    return this.appointmentsForm.get(input)?.errors;
  }

  toggleCreating() {
    this.emitToggleCreating.emit();
  }

  submit(e: any) {
    if (!this.appointmentsForm.valid) {
      this.appointmentsForm.markAllAsTouched();
    } else {
      this.appointmentsService.saveAppointment(
        this.appointmentsForm.value.title,
        this.focussedDay,
        this.appointmentsForm.value.startTime,
        this.appointmentsForm.value.endTime,
        this.appointmentsForm.value.details
      )
      this.appointmentsService.triggerDailyAppointmentReload();
      this.toggleCreating();
    }
  }
}
