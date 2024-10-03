import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.scanPrefereces();
    this.scanLocalStorage();
    this.setTheme();
  }

  private darkMode: boolean = false;

  // GETTER

  getDisplayMode(): boolean {
    return this.darkMode;
  }

  // SETTER

  setDisplayMode(darkMode: boolean) {
    console.log(darkMode);
    this.darkMode = darkMode;
    localStorage.removeItem("darkMode");
    localStorage.setItem("darkMode", String(darkMode));
    this.setTheme();
  }

  scanPrefereces() {
    // TODO: implement
  }

  scanLocalStorage() {
    this.darkMode = localStorage.getItem("darkMode") === 'true';
    console.log(this.darkMode);
  }

  private setTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

}
