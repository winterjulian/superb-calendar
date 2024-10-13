import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {FunctionsService} from "../services/functions.service";

@Component({
  selector: 'app-appointments-header',
  standalone: true,
    imports: [
        DatePipe,
        MatButton
    ],
  templateUrl: './appointments-header.component.html',
  styleUrl: './appointments-header.component.css'
})
export class AppointmentsHeaderComponent {

}
