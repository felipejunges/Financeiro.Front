import { TestBed } from '@angular/core/testing';

import { ContratoApiServiceService } from './contrato-api-service.service';

describe('ContratoApiServiceService', () => {
  let service: ContratoApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
