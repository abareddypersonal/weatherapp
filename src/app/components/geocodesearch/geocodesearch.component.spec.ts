import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocodesearchComponent } from './geocodesearch.component';

describe('GeocodesearchComponent', () => {
  let component: GeocodesearchComponent;
  let fixture: ComponentFixture<GeocodesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeocodesearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeocodesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
