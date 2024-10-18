import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {BasicDate} from "../../interfaces/basicDate";

@Component({
  selector: 'app-appointments-header',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    NgClass
  ],
  templateUrl: './appointments-header.component.html',
  styleUrl: './appointments-header.component.css'
})
export class AppointmentsHeaderComponent implements OnChanges {
  @Input() isRenewed!: boolean;
  @Input() today!: Date;
  @Input() focussedDay!: BasicDate;

  @Output() emitNavigateToDate = new EventEmitter<void>();
  @Output() emitTriggerIsRenewed = new EventEmitter<void>();
  @Output() emitSetToToday = new EventEmitter<void>();
  @Output() emitClose = new EventEmitter<void>();

  public currentTime: number;
  public focussedDayIsToday: boolean = false;

  constructor() {
    this.currentTime = Date.now();
    setInterval(() => {this.currentTime = Date.now()}, 1000);
  }

  ngOnChanges() {
    this.focussedDayIsToday =
      this.today.getDate() === this.focussedDay.day
      && (this.today.getMonth() + 1) === this.focussedDay.month
      && this.today.getFullYear() === this.focussedDay.year;
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
