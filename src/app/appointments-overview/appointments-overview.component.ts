import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {AppointmentsCreateComponent} from "../appointments-create/appointments-create.component";
import {AppointmentsService} from "../services/appointments.service";
import {distinctUntilChanged, take} from "rxjs";
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
export class AppointmentsOverviewComponent implements OnInit {
  public isLoaded: boolean = false;
  public basicDate: BasicDate | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentsServce: AppointmentsService,
    private functionsService: FunctionsService) {}

  ngOnInit() {
    this.isLoaded = true;
    this.appointmentsServce.getFocussedBasicDate()
      .pipe(distinctUntilChanged(((prev, curr) =>
          prev?.year === curr?.year &&
          prev?.month === curr?.month &&
          prev?.day === curr?.day
      )))
      .subscribe((response: BasicDate | null): void => {
        console.log(response);
        console.log('CHANGES DETECTED');
        if (!response) {
          // response = null;
          // side sheet was opened because of present auxiliary route
          const basicDate = this.functionsService.extractBasicDateFromURL(this.route.snapshot.url)
          if (basicDate) {
            this.basicDate = basicDate;
          }
        } else {
          // response = { year: ... }
          // side sheet was opened through conventional UI click
          this.basicDate = response;
        }
    })
  }

  close() {
    this.isLoaded = false;
    setTimeout(() => {
      this.router.navigate(['', { outlets: {primary: 'calendar', side: null } }]);
    }, 300)
  }

}
