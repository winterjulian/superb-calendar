import {Component, computed, EventEmitter, Input, Output, input, InputSignal} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../../interfaces/basicDate";
import {scrollDownAnimation} from "../../../styles/animations";

@Component({
  selector: 'app-appointments-header',
  standalone: true,
  templateUrl: './appointments-header.component.html',
  styleUrl: './appointments-header.component.css',
  imports: [
    DatePipe,
    MatButton,
    NgClass
  ],
  animations: [
    scrollDownAnimation
  ]
})
export class AppointmentsHeaderComponent {
  @Input() isRenewed!: boolean;
  @Input() isReloading!: boolean;
  @Input() today!: Date;

  @Output() emitNavigateToDate = new EventEmitter<void>();
  @Output() emitTriggerIsRenewed = new EventEmitter<void>();
  @Output() emitSetToToday = new EventEmitter<void>();
  @Output() emitClose = new EventEmitter<void>();

  public currentTime: number;
  public focussedDay: InputSignal<BasicDate> = input.required<BasicDate>();
  public focussedDayIsToday = computed(() => {
    return (this.today.getDate() === this.focussedDay().day
      && (this.today.getMonth() + 1) === this.focussedDay().month
      && this.today.getFullYear() === this.focussedDay().year)
  })

  constructor() {
    this.currentTime = Date.now();
    setInterval(() => {this.currentTime = Date.now()}, 1000);
  }

  navigateToDate() {
    this.emitNavigateToDate.emit();
  }

  triggerIsRenewed() {
    this.emitTriggerIsRenewed.emit();
  }

  setToToday() {
    this.emitSetToToday.emit()
  }

  close() {
    this.emitClose.emit();
  }
}
