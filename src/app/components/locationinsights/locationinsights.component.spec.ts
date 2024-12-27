import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationinsightsComponent } from './locationinsights.component';

describe('LocationinsightsComponent', () => {
  let component: LocationinsightsComponent;
  let fixture: ComponentFixture<LocationinsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationinsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
