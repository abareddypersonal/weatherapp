import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationserviceService } from './configurationservice.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherserviceService {
  private http = inject(HttpClient);
  apiKey = inject(ConfigurationserviceService);

  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  getWeatherReport(city: string) {
    console.log('apikey is : ' + this.apiKey.apiKey);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey.apiKey}&units=metric`;
    // this.http.get(url).subscribe(data => (this.weather = data));
    return this.http.get(url);
  }

  getFiveDayForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey.apiKey}&units=metric`;
    return this.http.get(url);
  }

  toggleBookmark(city: string): void {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarks.includes(city)) {
      // Remove the city
      const updatedBookmarks = bookmarks.filter((bookmark: string) => bookmark !== city);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      // Add the city
      bookmarks.push(city);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }

  getBookmarks(): string[] {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
  }

  isBookmarked(city: string): boolean {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]'); // Get existing bookmarks
    return bookmarks.includes(city); // Check if the city exists in the bookmarks array
  }
}
