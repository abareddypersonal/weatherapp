import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigurationserviceService } from './configurationservice.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocationserviceService {
  private http = inject(HttpClient);
  apiKey = inject(ConfigurationserviceService);

  private openCageApiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private foursquareApiUrl = 'https://api.foursquare.com/v3/places/search';
  private currentWeatherApiUrl =
    'https://api.openweathermap.org/data/2.5/weather';
  private curentPlaceApiUrl = 'https://api.openweathermap.org/geo/1.0/reverse';

  private isBrowser: boolean | undefined;

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Geocoding API Call
  geocodeLocation(query: string): Observable<any> {
    const url = `${this.openCageApiUrl}?q=${encodeURIComponent(query)}&key=${
      this.apiKey.openCageApiKey
    }`;
    return this.http.get(url);
  }

  // Foursquare Nearby Places API Call
  getNearbyPlaces(
    lat: number,
    lng: number,
    radius: number = 1000
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey.foursquareApiKey,
    });

    const params = {
      ll: `${lat},${lng}`,
      radius: radius.toString(),
      limit: '10', // Limit results to 10 places
    };

    return this.http.get(this.foursquareApiUrl, { headers, params });
  }

  // Method to get weather data based on latitude and longitude
  getWeatherByLocation(lat: number, lon: number): Observable<any> {
    const url = `${this.currentWeatherApiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey.apiKey}&units=metric`; // units=metric for Celsius
    return this.http.get<any>(url);
  }

   getPlaceName(lat: number, lon: number): Observable<any> {
    const url = `${this.curentPlaceApiUrl}?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey.apiKey}`;
    return this.http.get<any>(url);
  }
}
