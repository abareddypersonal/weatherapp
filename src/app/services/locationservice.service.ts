import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationserviceService } from './configurationservice.service';

@Injectable({
  providedIn: 'root'
})
export class LocationserviceService {

    private http = inject(HttpClient);
    apiKey = inject(ConfigurationserviceService);

  private openCageApiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private foursquareApiUrl = 'https://api.foursquare.com/v3/places/search';

  // Geocoding API Call
  geocodeLocation(query: string): Observable<any> {
    const url = `${this.openCageApiUrl}?q=${encodeURIComponent(query)}&key=${this.apiKey.openCageApiKey}`;
    return this.http.get(url);
  }

  // Foursquare Nearby Places API Call
  getNearbyPlaces(lat: number, lng: number, radius: number = 1000): Observable<any> {
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

  getLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(this.handleError(error));
          },
          { enableHighAccuracy: true } // Optional: High accuracy
        );
      } else {
        reject('Geolocation is not supported by your browser.');
      }
    });
  }

  private handleError(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get user location timed out.';
      default:
        return 'An unknown error occurred.';
    }
  }
}
