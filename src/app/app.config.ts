import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { routeConfig } from './app.routes';
import {provideNativeDateAdapter} from "@angular/material/core";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), provideClientHydration(), provideNativeDateAdapter()]
};
