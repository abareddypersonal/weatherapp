import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentweatherComponent } from './components/currentweather/currentweather.component';
import { TheamserviceService } from './services/theamservice.service';
import { CommonModule } from '@angular/common';
import { TestComponent } from "./components/testcomponents/test/test.component";
import { GridComponent } from "./components/testcomponents/grid/grid.component";
import { Grid1Component } from "./components/testcomponents/grid1/grid1.component";
import { Grid2Component } from "./components/testcomponents/grid2/grid2.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrentweatherComponent, CommonModule, TestComponent, GridComponent, Grid1Component, Grid2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weatherapp';
  themeService = inject(TheamserviceService);
  isDarkMode = false;

    // Paths to the icons
    firstIcon = '/images/lightmode.png';
    secondIcon = '/images/darkmode.png';

    currentIcon: string ;

    constructor() {
      // Set the initial icon
      this.currentIcon = this.firstIcon;
    }

  toggleTheme() {
    this.isDarkMode = this.themeService.toggleTheme();
    this.currentIcon = this.currentIcon === this.firstIcon ? this.secondIcon : this.firstIcon;
  }
}
