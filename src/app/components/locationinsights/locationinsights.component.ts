import { Component, inject, Input, input, OnChanges, SimpleChanges } from '@angular/core';
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
export class LocationinsightsComponent implements OnChanges {
  private locationService = inject(LocationserviceService);

  @Input() city: any ;

  location: string = ''; // User input
  geocodingResult: any = null; // Geocoding result
  nearbyPlaces: any[] = []; // Nearby places

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['city']);
    if (changes['city'] && changes['city'].currentValue) {
     this.searchLocationNearby();
    }
  }

  searchLocationNearby(): void {
    //Geocode the location
    this.locationService.geocodeLocation(this.city).subscribe((response) => {
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

  searchLocation(): void {
    if (!this.city) {
      alert('Please enter a City');
      return;
    }

    //Geocode the location
    this.locationService
      .geocodeLocation(this.city)
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
