import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyplacesComponent } from './nearbyplaces.component';

describe('NearbyplacesComponent', () => {
  let component: NearbyplacesComponent;
  let fixture: ComponentFixture<NearbyplacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyplacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearbyplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
