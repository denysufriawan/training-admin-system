import { TestBed, inject } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcumbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbService]
    });
  });

  it('should be created', inject([BreadcrumbService], (service: BreadcrumbService) => {
    expect(service).toBeTruthy();
  }));
});
