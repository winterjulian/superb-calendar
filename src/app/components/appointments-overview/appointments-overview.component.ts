import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AsyncPipe, DatePipe, NgClass } from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {AppointmentsCreateComponent} from "../appointments-create/appointments-create.component";
import {AppointmentsService} from "../../services/appointments.service";
import {distinctUntilChanged, Subject, take, takeUntil} from "rxjs";
import {FunctionsService} from "../../services/functions.service";
import {BasicDate} from "../../interfaces/basicDate";
import {ExtendedCalendarEvent} from "../../interfaces/extendedCalendarEvent";
import {AppointmentsHeaderComponent} from "../appointments-header/appointments-header.component";
import {AppointmentsEventComponent} from "../appointments-event/appointments-event.component";

@Component({
  selector: 'app-appointments-overview',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    DatePipe,
    MatButton,
    AppointmentsCreateComponent,
    AsyncPipe,
    AppointmentsHeaderComponent,
    AppointmentsEventComponent
],
  templateUrl: './appointments-overview.component.html',
  styleUrl: './appointments-overview.component.css'
})
export class AppointmentsOverviewComponent implements OnInit, OnDestroy {
  public isLoaded: boolean = false;
  public isCreating: boolean = false;
  public isRenewed: boolean = false;
  public focussedDay!: BasicDate;
  public today: Date = new Date();
  public events: Subject<ExtendedCalendarEvent[]> = new Subject<ExtendedCalendarEvent[]>();

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentsService: AppointmentsService,
    private functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.isLoaded = true;
    this.appointmentsService.getFocussedBasicDate()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(((prev, curr) =>
          prev?.year === curr?.year &&
          prev?.month === curr?.month &&
          prev?.day === curr?.day
      )))
      .subscribe((response: BasicDate | null): void => {
        if (!response) {
          // response = null;
          // side sheet was opened because of present auxiliary route
          this.initialUrlOpening();
        } else {
          // response = { year: ... }
          // side sheet was opened through conventional UI click
          this.conventionalUrlOpening(response);
        }
        this.loadDailyAppointments();
    })
    this.appointmentsService.getDailyAppointmentReload()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe(() => {
        console.log('TEST');
      this.loadDailyAppointments();
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  triggerIsRenewed() {
    this.isRenewed = true;
    setTimeout(() => { this.isRenewed = false; }, 500)
  }

  navigateToDate() {
    this.router.navigate(['', {
      outlets:
        {
          primary: 'calendar',
          side: ['appointments', this.functionsService.getBasicDateFromDateAsString(this.today)]
        }
    }]).then();
  }

  initialUrlOpening(): void {
    const basicDate = this.functionsService.extractBasicDateFromURL(this.route.snapshot.url)
    if (basicDate) {
      this.focussedDay = basicDate;
    } else {
      close();
    }
  }

  conventionalUrlOpening(response: BasicDate): void {
    this.focussedDay = response;
    this.triggerIsRenewed()
  }

  close() {
    this.isLoaded = false;
    setTimeout(() => {
      this.router.navigate(['', {outlets: {primary: 'calendar', side: null}}]).then();
     }, 300)
  }

  setToToday() {
    this.appointmentsService.setFocussedBasicDateByDate(this.today);
    // this.focussedDay = this.functionsService.extractBasicDateFromDate(this.today);
  }

  loadDailyAppointments() {
    this.appointmentsService.getAppointmentsByBasicDate(this.focussedDay)
      .pipe(take(1))
      .subscribe(response => {
        this.events.next(response);
    })
  }

  toggleCreating() {
    this.isCreating = !this.isCreating;
  }
}
