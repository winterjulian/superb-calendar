import {Routes} from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {AppointmentsOverviewComponent} from "./appointments-overview/appointments-overview.component";

export const routeConfig: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  {
    path: 'appointments/:date',
    outlet: 'side',
    component: AppointmentsOverviewComponent,
  },
];
