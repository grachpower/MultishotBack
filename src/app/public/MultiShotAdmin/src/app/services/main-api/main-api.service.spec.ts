import { TestBed, inject } from '@angular/core/testing';

import { MainApiService } from './main-api.service';

describe('MainApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainApiService]
    });
  });

  it('should be created', inject([MainApiService], (service: MainApiService) => {
    expect(service).toBeTruthy();
  }));
});
