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
    console.log("apikey is : "+this.apiKey.apiKey);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey.apiKey}&units=metric`;
    // this.http.get(url).subscribe(data => (this.weather = data));
    return this.http.get(url);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey.apiKey}`;
    return this.http.get(url);
  }

  getFiveDayForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
