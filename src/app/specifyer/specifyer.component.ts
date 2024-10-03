import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {ThemeService} from "../services/theme.service";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {StoreService} from "../services/store.service";


@Component({
  selector: 'app-specifyer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButton, MatButtonToggleGroup, MatButtonToggle, MatIcon, MatCard, MatCardContent, MatCardHeader],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './specifyer.component.html',
  styleUrl: './specifyer.component.css'
})
export class SpecifyerComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
    public storeService: StoreService
  ) {
    this.today = new Date();
    this.now = Date.now();
    setInterval(() => {this.now = Date.now()}, 1000);
  }

  public today: Date;
  public now: number;
  public darkMode: boolean = false;

  ngOnInit() {
    this.darkMode = this.themeService.getDisplayMode()
  }

  switchDisplayMode(darkMode: boolean) {
    this.darkMode = darkMode;
    this.themeService.setDisplayMode(this.darkMode)
  }

  resetDateToday() {
    this.storeService.resetCalendar();
  }

  fakeProperties: any = [
    { displayValue: 'Deutsch', value: 'de' },
    { displayValue: 'English', value: 'en' },
  ]

  fakeAgents: any = [
    { displayValue: 'Mustermann, Max', id: '01' },
    { displayValue: 'Richelieu, Jean', id: '02' },
    { displayValue: 'Teebaum, Miriam', id: '03' }
  ];
}
