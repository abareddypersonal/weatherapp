import { Component, inject } from '@angular/core';
import { LocationserviceService } from '../../services/locationservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locationinsights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locationinsights.component.html',
  styleUrl: './locationinsights.component.scss',
})
export class LocationinsightsComponent {
  private locationService = inject(LocationserviceService);

  location: string = ''; // User input
  geocodingResult: any = null; // Geocoding result
  nearbyPlaces: any[] = []; // Nearby places

  searchLocation(): void {
    if (!this.location) {
      alert('Please enter a location');
      return;
    }

    //Geocode the location
    this.locationService
      .geocodeLocation(this.location)
      .subscribe((response) => {
        if (response.results && response.results.length > 0) {
          const result = response.results[0];
          this.geocodingResult = result;

          const { lat, lng } = result.geometry;

          // Fetch nearby places
          this.locationService
            .getNearbyPlaces(lat, lng)
            .subscribe((placesResponse) => {
              this.nearbyPlaces = placesResponse.results || [];
            });
        } else {
          alert('Location not found');
        }
      });
  }
}
