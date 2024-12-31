import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ErrorserviceService } from '../../services/errorservice.service';
import { ErrorpopupComponent } from '../errorpopup/errorpopup.component';
import { CurrentweatherComponent } from '../currentweather/currentweather.component';
import { LocationinsightsComponent } from '../locationinsights/locationinsights.component';
import { WeatherchartComponent } from '../weatherchart/weatherchart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ErrorpopupComponent,
    CurrentweatherComponent,
    LocationinsightsComponent,
    WeatherchartComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  erroService = inject(ErrorserviceService);
  @ViewChild('errorPopup') errorPopup!: ErrorpopupComponent;

  selectedCity: string | undefined;

  ngOnInit(): void {
    this.erroService.error$.subscribe((message) => {
      this.errorPopup.showError(message);
    });
  }

  handleDataFromChild(data: string) {
    this.selectedCity = data;
  }
}
