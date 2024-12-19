import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentweatherComponent } from "./components/currentweather/currentweather.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrentweatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weatherapp';
}
