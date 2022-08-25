import { TestBed } from '@angular/core/testing';

import { MatriculaApiService } from './matricula.api.service';

describe('MatriculaApiService', () => {
  let service: MatriculaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
