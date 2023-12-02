import { TestBed } from '@angular/core/testing';

import { WaiterService } from './waiter.service';

describe('WaiterService', () => {
  let service: WaiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
