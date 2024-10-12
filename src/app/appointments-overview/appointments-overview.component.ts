import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {AppointmentsCreateComponent} from "../appointments-create/appointments-create.component";
import {AppointmentsService} from "../services/appointments.service";
import {distinctUntilChanged, Subscription} from "rxjs";
import {FunctionsService} from "../services/functions.service";
import {BasicDate} from "../interfaces/basicDate";

@Component({
  selector: 'app-appointments-overview',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    DatePipe,
    MatButton,
    AppointmentsCreateComponent
  ],
  templateUrl: './appointments-overview.component.html',
  styleUrl: './appointments-overview.component.css'
})
export class AppointmentsOverviewComponent implements OnInit, OnDestroy {
  public isLoaded: boolean = false;
  public isRenewed: boolean = false;
  public basicDate!: BasicDate;
  public today: Date = new Date();
  public now: number;

  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentsServce: AppointmentsService,
    private functionsService: FunctionsService
  ) {
    this.now = Date.now();
    setInterval(() => {this.now = Date.now()}, 1000);
  }

  ngOnInit() {
    this.isLoaded = true;
    this.subscription = this.appointmentsServce.getFocussedBasicDate()
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
    })
  }

  triggerIsRenewed() {
    this.isRenewed = true;
    setTimeout(() => { this.isRenewed = false; }, 500)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      this.basicDate = basicDate;
    } else {
      close();
    }
  }

  conventionalUrlOpening(response: BasicDate): void {
    this.basicDate = response;
    this.triggerIsRenewed()
  }

  close() {
    this.isLoaded = false;
    setTimeout(() => {
      this.router.navigate(['', { outlets: {primary: 'calendar', side: null } }]);
    }, 300)
  }

  setToToday() {
    this.basicDate = this.functionsService.extractBasicDateFromDate(this.today);
  }
}
