import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheamserviceService {
  private isDarkMode = false;

  toggleTheme(): boolean {
    this.isDarkMode = !this.isDarkMode;
    return this.isDarkMode;
  }

  getTheme(): boolean {
    return this.isDarkMode;
  }
}
