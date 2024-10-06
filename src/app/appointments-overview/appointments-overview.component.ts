import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe, NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-appointments-overview',
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    DatePipe,
    MatButton
  ],
  templateUrl: './appointments-overview.component.html',
  styleUrl: './appointments-overview.component.css'
})
export class AppointmentsOverviewComponent implements OnInit {
  public isLoaded: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoaded = true;
  }

  close() {
    this.isLoaded = false;
    setTimeout(() => {
      this.router.navigate(['', { outlets: {primary: 'calendar', sidemenu: null } }]);
    }, 300)
  }

}
