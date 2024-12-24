import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fivedayforecast',
  standalone: true,
  imports: [],
  templateUrl: './fivedayforecast.component.html',
  styleUrl: './fivedayforecast.component.scss'
})
export class FivedayforecastComponent implements AfterViewInit {
  ngAfterViewInit() {
    new Chart('forecastChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
          {
            label: 'Temperature (°C)',
            data: [22, 24, 21, 19, 23],
            borderColor: '#4a90e2',
            fill: false,
          },
        ],
      },
    });
  }

}
