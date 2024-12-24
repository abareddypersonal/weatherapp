import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherserviceService } from '../../services/weatherservice.service';
import { ErrorpopupComponent } from '../errorpopup/errorpopup.component';
import { ErrorserviceService } from '../../services/errorservice.service';
import { LocationserviceService } from '../../services/locationservice.service';
import { FivedayforecastComponent } from "../fivedayforecast/fivedayforecast.component";

@Component({
  selector: 'app-currentweather',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorpopupComponent, FivedayforecastComponent],
  templateUrl: './currentweather.component.html',
  styleUrl: './currentweather.component.scss',
})
export class CurrentweatherComponent implements OnInit {
  private http = inject(HttpClient);
  weatherService = inject(WeatherserviceService);

  erroService = inject(ErrorserviceService);
  locationService = inject(LocationserviceService);

  @ViewChild('errorPopup') errorPopup!: ErrorpopupComponent;

  weather: any;
  city: string = 'London';
  latitude: number | null = null;
  longitude: number | null = null;

  errorMessage: string | null = null;
  location: { latitude: number; longitude: number } | null = null;

  weatherData = [
    { city: 'New York', description: 'Sunny', temperature: 28 },
    { city: 'London', description: 'Cloudy', temperature: 16 },
    { city: 'Tokyo', description: 'Rainy', temperature: 22 },
  ];

  ngOnInit(): void {
  //  this.getLocation();
    this.erroService.error$.subscribe((message) => {
      this.errorPopup.showError(message);
    });
  }

  getWeather() {
    this.weatherService
      .getWeatherReport(this.city)
      .subscribe((data: any) => (this.weather = data));
  }

  getLocation(): void {
    this.locationService.getLocation().then(
      (position) => {
        this.latitude = position.latitude;
        this.longitude = position.longitude;
        this.errorMessage = null; // Clear any errors
        console.log('latitude : ' + this.latitude);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  // getFallbackLocation(): Promise<{ latitude: number; longitude: number }> {
  //   return this.http
  //     .get<any>('https://ipinfo.io/json?token=your_api_token')
  //     .toPromise()
  //     .then((response) => {
  //       const [latitude, longitude] = response.loc.split(',');
  //       return {
  //         latitude: parseFloat(latitude),
  //         longitude: parseFloat(longitude),
  //       };
  //     });
  // }

  getWeatherCurrentLocation() {
    const lat = 37.7749; // Replace with dynamic latitude
    const lon = -122.4194; // Replace with dynamic longitude

    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe({
      next: (data) => {
        this.weather = data;
      },
      error: (err) => {
        this.errorMessage = `Failed to fetch weather: ${err.message}`;
      },
    });
  }
}
