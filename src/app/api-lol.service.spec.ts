import { TestBed } from '@angular/core/testing';

import { ApiLolService } from './api-lol.service';

describe('ApiLolService', () => {
  let service: ApiLolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
