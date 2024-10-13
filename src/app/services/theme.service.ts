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
    this.darkMode = darkMode;
    localStorage.removeItem("darkMode");
    localStorage.setItem("darkMode", String(darkMode));
    this.setTheme();
  }

  scanPrefereces() {
    this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  scanLocalStorage() {
    const darkMode = localStorage.getItem("darkMode");
    switch (darkMode) {
      /*
       treat null not as false, else if nothing is set in the local storage,
       system-preferences will be overwritten
       */
      case null: break;
      case 'false': this.darkMode = false; break;
      case 'true': this.darkMode = true; break;
    }
  }

  private setTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

}
