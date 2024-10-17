import {Component, EventEmitter, Input, Output} from '@angular/core';
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
export class AppointmentsHeaderComponent {
  @Input() isRenewed!: boolean;
  @Input() today!: Date;
  @Input() focussedDay!: BasicDate;

  @Output() emitNavigateToDate = new EventEmitter<void>();
  @Output() emitTriggerIsRenewed = new EventEmitter<void>();
  @Output() emitSetToToday = new EventEmitter<void>();
  @Output() emitClose = new EventEmitter<void>();

  public currentTime: number;

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
