import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routeConfig } from './app.routes';
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideNativeDateAdapter(),
    provideAnimationsAsync()
  ]
};
