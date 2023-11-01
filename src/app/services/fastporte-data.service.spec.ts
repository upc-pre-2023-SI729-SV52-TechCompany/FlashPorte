import { TestBed } from '@angular/core/testing';

import { FastporteDataService } from './fastporte-data.service';

describe('CargaSinEstresDataService', () => {
  let service: FastporteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastporteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
