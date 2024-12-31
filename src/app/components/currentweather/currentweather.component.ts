import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherserviceService } from '../../services/weatherservice.service';
import { FivedayforecastComponent } from '../fivedayforecast/fivedayforecast.component';

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

  weather: any;
  city: string = 'hyderabad';
  selectedCity: string = 'hyderabad'; // City passed to the forecast component
  showForecastComponent = false;

  bookmarks: string[] = [];

  isCityBookmarked: boolean = false;

  bookmark_img: string = '';

  bookmarknot_img = 'images/bookmark.png';
  bookmarked_img = 'images/bookmarked.png';

  @Output() data = new EventEmitter<string>();

  weatherData = [
    { city: 'New York', description: 'Sunny', temperature: 28 },
    { city: 'London', description: 'Cloudy', temperature: 16 },
    { city: 'Tokyo', description: 'Rainy', temperature: 22 },
  ];

  ngOnInit(): void {
    this.getWeather();
    this.bookmarks = this.weatherService.getBookmarks();
    if (this.bookmarks.length > 0) {
      this.city = this.bookmarks[0]; // Set the first city as default
      this.getWeather(); // Fetch weather for the default city
    }
    this.bookMarkIconChange();
  }

  getWeather() {
    this.weatherService
      .getWeatherReport(this.city)
      .subscribe((data: any) => (this.weather = data));
      this.selectedCity=this.city;
    this.showForecast();
    this.data.emit(this.selectedCity);
    this.bookMarkIconChange();

    console.log("selected city :"+this.selectedCity+ " / "+ this.city);

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

    // For debugging purposes
    console.log('Selected City:', selectedCity);
    console.log('Current Bookmarks:', this.bookmarks);
  }
}
