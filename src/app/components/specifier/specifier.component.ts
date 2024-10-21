import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {ThemeService} from "../../services/theme.service";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {AppointmentsService} from "../../services/appointments.service";


@Component({
  selector: 'app-specifier',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButton, MatButtonToggleGroup, MatButtonToggle, MatIcon, MatCard, MatCardContent, MatCardHeader],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './specifier.component.html',
  styleUrl: './specifier.component.css'
})
export class SpecifierComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
    public appointmentsService: AppointmentsService
  ) {
    this.today = new Date();
  }

  public today: Date;
  public darkMode: boolean = false;

  ngOnInit() {
    this.darkMode = this.themeService.getDisplayMode()
  }

  switchDisplayMode(darkMode: boolean) {
    this.darkMode = darkMode;
    this.themeService.setDisplayMode(this.darkMode)
  }

  resetDateToday() {
    this.appointmentsService.resetCalendar();
  }
}
