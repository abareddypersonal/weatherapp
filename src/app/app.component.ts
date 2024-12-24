import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentweatherComponent } from './components/currentweather/currentweather.component';
import { TheamserviceService } from './services/theamservice.service';
import { CommonModule } from '@angular/common';
import { TestComponent } from "./components/test/test.component";
import { GridComponent } from "./components/grid/grid.component";
import { Grid1Component } from "./components/grid1/grid1.component";
import { Grid2Component } from "./components/grid2/grid2.component";

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

  toggleTheme() {
    this.isDarkMode = this.themeService.toggleTheme();
  }
}
