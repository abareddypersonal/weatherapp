import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherserviceService } from '../../services/weatherservice.service';
import { FivedayforecastComponent } from '../fivedayforecast/fivedayforecast.component';
import { LocationserviceService } from '../../services/locationservice.service';
import { ErrorserviceService } from '../../services/errorservice.service';

@Component({
  selector: 'app-currentweather',
  standalone: true,
  imports: [FormsModule, CommonModule, FivedayforecastComponent],
  templateUrl: './currentweather.component.html',
  styleUrl: './currentweather.component.scss',
})
export class CurrentweatherComponent implements OnInit {
  private http = inject(HttpClient);
  weatherService = inject(WeatherserviceService);
  locationService = inject(LocationserviceService);
  erroService = inject(ErrorserviceService);

  weather: any;
  city: string = '';
  selectedCity: string = ''; // City passed to the forecast component
  showForecastComponent = false;

  bookmarks: string[] = [];
  isCityBookmarked: boolean = false;
  bookmark_img: string = '';
  bookmarknot_img = 'images/bookmark.png';
  bookmarked_img = 'images/bookmarked.png';

  @Output() data = new EventEmitter<string>();

  latitude: number = 0;
  longitude: number = 0;
  public placeName!: string;

  weatherData = [
    { city: 'New York', description: 'Sunny', temperature: 28 },
    { city: 'London', description: 'Cloudy', temperature: 16 },
    { city: 'Tokyo', description: 'Rainy', temperature: 22 },
  ];

  ngOnInit(): void {
    this.getCurrentLocation();

    this.bookmarks = this.weatherService.getBookmarks();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Latitude:', this.latitude);
          console.log('Longitude:', this.longitude);

          this.getWeatherData(this.latitude, this.longitude);
          this.getPlaceName(this.latitude, this.longitude);
        },
        (error) => {
          this.erroService.reportError(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  getPlaceName(lat: number, lon: number) {
    this.locationService.getPlaceName(lat, lon).subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.placeName = data[0].name; // Extract the place name
          this.city = this.placeName;

          this.selectedCity = this.city;
          this.showForecast();
          this.data.emit(this.selectedCity);
          this.bookMarkIconChange();
        } else {
          console.error('No place data found for these coordinates.');
        }
      },
      error: (error) => {
        console.error('Error fetching place name:', error);
      },
    });
  }
  getWeatherData(lat: number, lon: number): void {
    this.locationService.getWeatherByLocation(lat, lon).subscribe(
      (data) => {
        this.weather = data;
        console.log('Weather Data:', this.weather);
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getWeather() {
    this.weatherService
      .getWeatherReport(this.city)
      .subscribe((data: any) => (this.weather = data));
    this.selectedCity = this.city;
    this.showForecast();
    this.data.emit(this.selectedCity);
    this.bookMarkIconChange();
  }

  getBookMarks() {
    this.bookmarks = this.weatherService.getBookmarks();
  }

  toggleBookmark() {
    this.weatherService.toggleBookmark(this.city);
    this.getBookMarks();
    this.bookMarkIconChange();
  }

  bookMarkIconChange() {
    this.isCityBookmarked = this.weatherService.isBookmarked(this.city);
    if (this.isCityBookmarked) {
      this.bookmark_img = this.bookmarknot_img;
    } else {
      this.bookmark_img = this.bookmarked_img;
    }
  }

  showForecast() {
    this.selectedCity = this.city; // Update the selected city
    this.showForecastComponent = true;
  }

  selectBookmark(event: Event) {
    const selectedCity = (event.target as HTMLSelectElement).value;
    if (selectedCity) {
      this.city = selectedCity;
      this.getWeather();
    }
  }
}
