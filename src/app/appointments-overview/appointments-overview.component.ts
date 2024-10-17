import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {AppointmentsCreateComponent} from "../appointments-create/appointments-create.component";
import {AppointmentsService} from "../services/appointments.service";
import {distinctUntilChanged, Observable, Subject, Subscription, take} from "rxjs";
import {FunctionsService} from "../services/functions.service";
import {BasicDate} from "../interfaces/basicDate";
import {ExtendedCalendarEvent} from "../interfaces/extendedCalendarEvent";
import {AppointmentsHeaderComponent} from "../appointments-header/appointments-header.component";
import {AppointmentsEventComponent} from "../appointments-event/appointments-event.component";
import {supportColor} from "@angular/cli/src/utilities/color";

@Component({
  selector: 'app-appointments-overview',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    DatePipe,
    MatButton,
    AppointmentsCreateComponent,
    NgForOf,
    AsyncPipe,
    AppointmentsHeaderComponent,
    NgIf,
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

  private subscriptionArray: Array<Subscription> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentsServce: AppointmentsService,
    private functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.isLoaded = true;
    this.subscriptionArray.push(
      this.appointmentsServce.getFocussedBasicDate()
        .pipe(distinctUntilChanged(((prev, curr) =>
            prev?.year === curr?.year &&
            prev?.month === curr?.month &&
            prev?.day === curr?.day
        )))
        .subscribe((response: BasicDate | null): void => {
          if (!response) {
            // response = null;
            // side sheet was opened because of present auxiliary route
            this.initialUrlOpening(response);
          } else {
            // response = { year: ... }
            // side sheet was opened through conventional UI click
            this.conventionalUrlOpening(response);
          }
          this.loadDailyAppointments();
      })
    );
    this.subscriptionArray.push(
      this.appointmentsServce.getDailyAppointmentReload().subscribe(_ => {
        console.log('UPDATE!')
        this.loadDailyAppointments();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionArray.forEach(subscription => {subscription.unsubscribe()})
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
          side: ['appointments', this.functionsService.getBasicDateFromDateAsString(this.today) ]
        }
    }]);
  }

  initialUrlOpening(response: null): void {
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
      this.router.navigate(['', { outlets: {primary: 'calendar', side: null } }]);
    }, 300)
  }

  setToToday() {
    this.appointmentsServce.setFocussedBasicDateByDate(this.today);
    // this.focussedDay = this.functionsService.extractBasicDateFromDate(this.today);
  }

  loadDailyAppointments() {
    this.appointmentsServce.getAppointmentsByBasicDate(this.focussedDay)
      .pipe(take(1))
      .subscribe(response => {
        console.log(this.focussedDay);
        console.log('\t> updating')
        console.log(response);
        this.events.next(response);
    })
  }

  toggleCreating() {
    this.isCreating = !this.isCreating;
  }
}
