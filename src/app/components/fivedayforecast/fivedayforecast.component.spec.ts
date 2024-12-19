import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivedayforecastComponent } from './fivedayforecast.component';

describe('FivedayforecastComponent', () => {
  let component: FivedayforecastComponent;
  let fixture: ComponentFixture<FivedayforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FivedayforecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FivedayforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
