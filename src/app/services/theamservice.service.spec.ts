import { TestBed } from '@angular/core/testing';

import { TheamserviceService } from './theamservice.service';

describe('TheamserviceService', () => {
  let service: TheamserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheamserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
