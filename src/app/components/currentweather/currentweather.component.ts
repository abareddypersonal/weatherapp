import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currentweather',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './currentweather.component.html',
  styleUrl: './currentweather.component.scss'
})
export class CurrentweatherComponent {
  private http = inject(HttpClient);
  weather: any;
  city: string = 'London';
  apiKey: string = 'ef97c3ce803acdd1b78c508dab9ef561';

  getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
    this.http.get(url).subscribe(data => (this.weather = data));
    console.log(this.weather);
  }
}
