import { TestBed } from '@angular/core/testing';

import { ProductOrderService } from './productorder.service';

describe('ProductorderService', () => {
  let service: ProductOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
