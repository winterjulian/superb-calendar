import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
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
import {sideSheetTransition} from "../../../styles/animations";

@Component({
  selector: 'app-side-sheet',
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
  animations: [
    sideSheetTransition
  ],
  templateUrl: './side-sheet.component.html',
  styleUrl: './side-sheet.component.css'
})
export class SideSheetComponent implements OnInit, AfterViewChecked, OnDestroy {
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
    setTimeout(() => {
      this.isLoaded = true;
    }, 200)
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
      this.loadDailyAppointments();
    })
  }

  ngAfterViewChecked(){
    /*
     set isLoaded after view has been initialized
     else: instant appearance of component
     */
    // this.isLoaded = true;
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
