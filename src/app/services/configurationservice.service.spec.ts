import { TestBed } from '@angular/core/testing';

import { ConfigurationserviceService } from './configurationservice.service';

describe('ConfigurationserviceService', () => {
  let service: ConfigurationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
