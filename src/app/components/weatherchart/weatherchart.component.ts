import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { WeatherserviceService } from '../../services/weatherservice.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-weatherchart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weatherchart.component.html',
  styleUrl: './weatherchart.component.scss',
})
export class WeatherchartComponent implements OnChanges {
  private weatherService = inject(WeatherserviceService);
  @Input() city!: any;

  labelData: string[] = []; // Labels for the x-axis (day of the month)
  realData: number[] = []; // Data for the y-axis (wind speed)

  private chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && changes['city'].currentValue) {
      this.getWeatherData();
    }
  }

  getWeatherData() {
    this.weatherService.getFiveDayForecast(this.city).subscribe({
      next: (data) => {
        this.labelData = [];
        this.realData = [];

        data.list.forEach((entry: any, index: number) => {
          if (index % 8 === 0) {
            // labels.push(entry.dt_txt.split(' ')[0]); // Extract date
            const date = new Date(entry.dt_txt);
            this.labelData.push(date.getDate().toString()); // Get day as number
            this.realData.push(entry.wind.speed); // Extract temperature
          }
        });

        this.renderChart();
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      },
    });
  }

  private renderChart() {
    // Destroy the existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Create a new chart
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.labelData,
        datasets: [
          {
            data: this.realData,
            label: 'Daily Wind Speed (km/h)',
            borderColor: 'blue',
            backgroundColor: 'rgb(127, 233, 219)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Wind Speed (km/h)',
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
}
