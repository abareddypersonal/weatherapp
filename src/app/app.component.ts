import { Component, inject } from '@angular/core';
import { TheamserviceService } from './services/theamservice.service';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weatherapp';
  themeService = inject(TheamserviceService);
  isDarkMode = false;

  bookmarks: string[] = [];

  // Paths to the icons
  firstIcon = '/images/lightmode.png';
  secondIcon = '/images/darkmode.png';

  currentIcon: string;

  constructor() {
    this.currentIcon = this.firstIcon;
  }

 

  toggleTheme() {
    this.isDarkMode = this.themeService.toggleTheme();
    this.currentIcon =
      this.currentIcon === this.firstIcon ? this.secondIcon : this.firstIcon;
  }
}
