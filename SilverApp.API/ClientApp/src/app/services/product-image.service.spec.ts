/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductImageService } from './product-image.service';

describe('Service: ProductImage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductImageService]
    });
  });

  it('should ...', inject([ProductImageService], (service: ProductImageService) => {
    expect(service).toBeTruthy();
  }));
});
