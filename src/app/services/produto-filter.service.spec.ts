import { TestBed } from '@angular/core/testing';

import { ProdutoFilterService } from './produto-filter.service';

describe('ProdutoFilterService', () => {
  let service: ProdutoFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
