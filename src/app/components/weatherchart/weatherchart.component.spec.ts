import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherchartComponent } from './weatherchart.component';

describe('WeatherchartComponent', () => {
  let component: WeatherchartComponent;
  let fixture: ComponentFixture<WeatherchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
