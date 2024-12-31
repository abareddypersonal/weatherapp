import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { WeatherserviceService } from '../../services/weatherservice.service';

Chart.register(...registerables); // Register necessary Chart.js components

@Component({
  selector: 'app-fivedayforecast',
  standalone: true,
  imports: [],
  templateUrl: './fivedayforecast.component.html',
  styleUrl: './fivedayforecast.component.scss',
})
export class FivedayforecastComponent implements OnInit, OnChanges {
  @Input() city!: string;

  private weatherService = inject(WeatherserviceService);
  private chart: Chart | undefined;

  ngOnInit(): void {
    // this.getFiveDaysForecast();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && changes['city'].currentValue) {
      this.getFiveDaysForecast();
    }
  }

  getFiveDaysForecast(): void {
    if (this.city) {
      this.weatherService.getFiveDayForecast(this.city).subscribe((data) => {
        const labels: string[] = [];
        const temps: number[] = [];

        // console.log('data :' + data);

        data.list.forEach((entry: any, index: number) => {
          if (index % 8 === 0) {
            // const date = new Date(entry.dt_txt);
            // labels.push(entry.dt_txt.split(' ')[0]); // Extract date
            const date = new Date(entry.dt_txt);
            labels.push(date.getDate().toString()); // Get day as number
            temps.push(entry.main.temp); // Extract temperature
          }
        });

        if (this.chart) {
          this.chart.destroy();
        }

        const config: ChartConfiguration = {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Daily Temperature (°C)',
                data: temps,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
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
                  text: 'Temperature (°C)',
                },
              },
            },
          },
        };

        const canvas = document.getElementById('forecastChart') as ChartItem;
        this.chart = new Chart(canvas, config);
      });
    }
  }
}
