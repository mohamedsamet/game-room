import { TestBed } from '@angular/core/testing';

import { UtiliesService } from './utilies.service';

describe('UtiliesService', () => {
  let service: UtiliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtiliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
